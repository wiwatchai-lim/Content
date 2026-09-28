# Image-to-video with Wan 2.2 TI2V 5B (GGUF) through a local ComfyUI server.
#   python tools/wan.py <image> "<prompt>" [out.mp4] [--seconds 5] [--size 480x848] [--steps 20] [--seed 1]
# ComfyUI lives outside the project in C:\Users\USER\ComfyUI (models ~9.4 GB). The script starts the
# server if it is not running, uploads the image, queues the workflow and copies the MP4 back.
# RTX 3050 6 GB: keep the size around 480x848 (multiples of 32); 5 s takes several minutes.
import argparse, json, random, shutil, subprocess, sys, time, urllib.request, uuid
from pathlib import Path

COMFY = Path.home() / 'ComfyUI'
URL = 'http://127.0.0.1:8188'
NEGATIVE = ('text, letters, watermark, logo change, deformed glasses, warped frame, melting, extra temples, '
            'blurry, low quality, jitter, flicker, cuts, people')


def call(path, data=None, raw=False):
    req = urllib.request.Request(URL + path, data=data, headers={} if raw else {'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read() or b'{}')


def ensure_server():
    try:
        call('/system_stats'); return
    except OSError:
        pass
    py = COMFY / 'venv' / 'Scripts' / 'python.exe'
    log = open(COMFY / 'server.log', 'a')
    subprocess.Popen([str(py), 'main.py', '--listen', '127.0.0.1', '--port', '8188', '--lowvram'],
                     cwd=COMFY, stdout=log, stderr=log, creationflags=getattr(subprocess, 'CREATE_NO_WINDOW', 0))
    for _ in range(180):
        time.sleep(2)
        try:
            call('/system_stats'); return
        except OSError:
            pass
    sys.exit('ComfyUI did not start, see ' + str(COMFY / 'server.log'))


def upload(image):
    boundary = uuid.uuid4().hex
    body = (f'--{boundary}\r\nContent-Disposition: form-data; name="image"; filename="{image.name}"\r\n'
            'Content-Type: application/octet-stream\r\n\r\n').encode() + image.read_bytes() + \
           f'\r\n--{boundary}\r\nContent-Disposition: form-data; name="overwrite"\r\n\r\ntrue\r\n--{boundary}--\r\n'.encode()
    req = urllib.request.Request(URL + '/upload/image', data=body,
                                 headers={'Content-Type': f'multipart/form-data; boundary={boundary}'})
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())['name']


def workflow(image_name, prompt, w, h, frames, steps, seed, prefix, negative=NEGATIVE):
    return {
        '1': {'class_type': 'UnetLoaderGGUF', 'inputs': {'unet_name': 'Wan2.2-TI2V-5B-Q5_K_M.gguf'}},
        '2': {'class_type': 'CLIPLoaderGGUF', 'inputs': {'clip_name': 'umt5-xxl-encoder-Q5_K_M.gguf', 'type': 'wan'}},
        '3': {'class_type': 'VAELoader', 'inputs': {'vae_name': 'wan2.2_vae.safetensors'}},
        '4': {'class_type': 'CLIPTextEncode', 'inputs': {'clip': ['2', 0], 'text': prompt}},
        '5': {'class_type': 'CLIPTextEncode', 'inputs': {'clip': ['2', 0], 'text': negative}},
        '6': {'class_type': 'LoadImage', 'inputs': {'image': image_name}},
        '7': {'class_type': 'Wan22ImageToVideoLatent', 'inputs': {'vae': ['3', 0], 'start_image': ['6', 0],
              'width': w, 'height': h, 'length': frames, 'batch_size': 1}},
        '8': {'class_type': 'ModelSamplingSD3', 'inputs': {'model': ['1', 0], 'shift': 8.0}},
        '9': {'class_type': 'KSampler', 'inputs': {'model': ['8', 0], 'positive': ['4', 0], 'negative': ['5', 0],
              'latent_image': ['7', 0], 'seed': seed, 'steps': steps, 'cfg': 5.0,
              'sampler_name': 'uni_pc', 'scheduler': 'simple', 'denoise': 1.0}},
        '10': {'class_type': 'VAEDecode', 'inputs': {'samples': ['9', 0], 'vae': ['3', 0]}},
        '11': {'class_type': 'SaveImage', 'inputs': {'images': ['10', 0], 'filename_prefix': prefix}},
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('image'); ap.add_argument('prompt'); ap.add_argument('out', nargs='?')
    ap.add_argument('--seconds', type=float, default=5); ap.add_argument('--size', default='480x848')
    ap.add_argument('--steps', type=int, default=20); ap.add_argument('--seed', type=int, default=None)
    ap.add_argument('--negative', default=NEGATIVE, help='negative prompt (the default is for glasses shots and bans people)')
    a = ap.parse_args()
    image = Path(a.image)
    out = Path(a.out) if a.out else image.with_suffix('.mp4')
    w, h = map(int, a.size.split('x'))
    frames = int(a.seconds * 24) // 4 * 4 + 1  # Wan wants 4n+1 frames
    ensure_server()
    prefix = f'wan/{uuid.uuid4().hex[:8]}'
    wf = workflow(upload(image), a.prompt, w, h, frames, a.steps, a.seed if a.seed is not None else random.randint(1, 2**31), prefix, a.negative)
    pid = call('/prompt', json.dumps({'prompt': wf}).encode())['prompt_id']
    t0 = time.time()
    while True:
        time.sleep(5)
        hist = call(f'/history/{pid}').get(pid)
        if hist and hist.get('status', {}).get('completed'):
            break
        if hist and hist.get('status', {}).get('status_str') == 'error':
            sys.exit('ComfyUI error: ' + json.dumps(hist['status'].get('messages', [])[-1:]))
        print(f'  {int(time.time() - t0)}s ...', flush=True)
    # Frames come back as PNGs; encode them with the project's ffmpeg-static at Wan's 24 fps.
    pngs = [COMFY / 'output' / i.get('subfolder', '') / i['filename']
            for node in hist['outputs'].values() for i in node.get('images', [])]
    if not pngs:
        sys.exit('no frames in ComfyUI output: ' + json.dumps(hist['outputs']))
    ffmpeg = Path(__file__).parent.parent / 'node_modules' / 'ffmpeg-static' / 'ffmpeg.exe'
    listing = pngs[0].parent / 'frames.txt'
    listing.write_text(''.join(f"file '{p.as_posix()}'\nduration {1 / 24}\n" for p in sorted(pngs)))
    subprocess.run([str(ffmpeg), '-nostdin', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', str(listing),
                    '-r', '24', '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', str(out)], check=True)
    shutil.rmtree(pngs[0].parent, ignore_errors=True)
    print(f'{out} ({int(time.time() - t0)}s, {len(pngs)} frames, {w}x{h})')


if __name__ == '__main__':
    main()
