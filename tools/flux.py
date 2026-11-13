# Free local text-to-image with FLUX.1 schnell (GGUF Q4) through the same ComfyUI as tools/wan.py.
#   python tools/flux.py "<prompt>" out.png [--size 1024x1024] [--steps 4] [--seed 1] [--count 1]
# Models in ~/ComfyUI/models (~10.7 GB, Apache-2.0, fine for shop posts):
#   unet/flux1-schnell-Q4_K_S.gguf            (city96/FLUX.1-schnell-gguf)
#   text_encoders/t5-v1_1-xxl-encoder-Q5_K_M.gguf  (city96/t5-v1_1-xxl-encoder-gguf)
#   text_encoders/clip_l.safetensors           (comfyanonymous/flux_text_encoders)
#   vae/flux_ae.safetensors                    (Comfy-Org/Lumina_Image_2.0_Repackaged split_files/vae/ae.safetensors = FLUX VAE)
#   --init ref.png --denoise 0.6 = img2img from a reference picture (same layout/look, redrawn)
# No quota, no cost. RTX 3050 6 GB: about 1-2 min per 1024x1024 image. --count N makes N seeds -> out-1.png ...
# Images are text-free like the Codex ones; Thai text goes in the HTML layer.
import argparse, json, random, shutil, sys, time, uuid
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from wan import COMFY, call, ensure_server, upload  # noqa: E402


def workflow(prompt, w, h, steps, seed, prefix, init=None, denoise=1.0):
    wf = {
        '1': {'class_type': 'UnetLoaderGGUF', 'inputs': {'unet_name': 'flux1-schnell-Q4_K_S.gguf'}},
        '2': {'class_type': 'DualCLIPLoaderGGUF', 'inputs': {'clip_name1': 't5-v1_1-xxl-encoder-Q5_K_M.gguf',
              'clip_name2': 'clip_l.safetensors', 'type': 'flux'}},
        '3': {'class_type': 'VAELoader', 'inputs': {'vae_name': 'flux_ae.safetensors'}},
        '4': {'class_type': 'CLIPTextEncode', 'inputs': {'clip': ['2', 0], 'text': prompt}},
        '5': {'class_type': 'ConditioningZeroOut', 'inputs': {'conditioning': ['4', 0]}},
        '6': {'class_type': 'EmptySD3LatentImage', 'inputs': {'width': w, 'height': h, 'batch_size': 1}},
        '7': {'class_type': 'KSampler', 'inputs': {'model': ['1', 0], 'positive': ['4', 0], 'negative': ['5', 0],
              'latent_image': ['6', 0], 'seed': seed, 'steps': steps, 'cfg': 1.0,
              'sampler_name': 'euler', 'scheduler': 'simple', 'denoise': 1.0}},
        '8': {'class_type': 'VAEDecode', 'inputs': {'samples': ['7', 0], 'vae': ['3', 0]}},
        '9': {'class_type': 'SaveImage', 'inputs': {'images': ['8', 0], 'filename_prefix': prefix}},
    }
    if init:  # img2img: start from a reference image (e.g. a Codex/ChatGPT picture) instead of noise
        wf['10'] = {'class_type': 'LoadImage', 'inputs': {'image': init}}
        wf['11'] = {'class_type': 'ImageScale', 'inputs': {'image': ['10', 0], 'upscale_method': 'lanczos',
                    'width': w, 'height': h, 'crop': 'center'}}
        wf['12'] = {'class_type': 'VAEEncode', 'inputs': {'pixels': ['11', 0], 'vae': ['3', 0]}}
        wf['7']['inputs']['latent_image'] = ['12', 0]
        wf['7']['inputs']['denoise'] = denoise
    return wf


def run(prompt, out, w, h, steps, seed, init=None, denoise=1.0):
    prefix = f'flux/{uuid.uuid4().hex[:8]}'
    pid = call('/prompt', json.dumps({'prompt': workflow(prompt, w, h, steps, seed, prefix, init, denoise)}).encode())['prompt_id']
    t0 = time.time()
    while True:
        time.sleep(3)
        hist = call(f'/history/{pid}').get(pid)
        if hist and hist.get('status', {}).get('completed'):
            break
        if hist and hist.get('status', {}).get('status_str') == 'error':
            sys.exit('ComfyUI error: ' + json.dumps(hist['status'].get('messages', [])[-1:]))
    img = next(i for node in hist['outputs'].values() for i in node.get('images', []))
    src = COMFY / 'output' / img.get('subfolder', '') / img['filename']
    out.parent.mkdir(parents=True, exist_ok=True)
    shutil.move(str(src), out)
    print(f'{out} ({int(time.time() - t0)}s, seed {seed})', flush=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('prompt'); ap.add_argument('out')
    ap.add_argument('--size', default='1024x1024'); ap.add_argument('--steps', type=int, default=4)
    ap.add_argument('--seed', type=int, default=None); ap.add_argument('--count', type=int, default=1)
    ap.add_argument('--init', help='reference image for img2img (keeps its layout and look)')
    ap.add_argument('--denoise', type=float, default=0.6, help='with --init: 0.3 = almost a copy, 0.8 = loose')
    a = ap.parse_args()
    w, h = map(int, a.size.split('x'))
    out = Path(a.out)
    seed = a.seed if a.seed is not None else random.randint(1, 2**31)
    ensure_server()
    init = upload(Path(a.init)) if a.init else None
    for k in range(a.count):
        target = out if a.count == 1 else out.with_name(f'{out.stem}-{k + 1}{out.suffix}')
        run(a.prompt, target, w, h, a.steps, seed + k, init, a.denoise if init else 1.0)


if __name__ == '__main__':
    main()
