# Setup on a new machine — do this yourself

Also read the "For Claude: setup on a new machine" section of `README.md`: it lists the extra things beat clips need (librosa, HyperFrames CLI, files to copy) and a ready check.

This folder was copied from another computer. On the first session, before anything else, check whether the project is ready and install whatever is missing **yourself** — the user is not technical. Talk to the user in Thai, keep it short, and ask for permission only when an installer needs it (admin prompt, password).

Ready means: `npm run render -- posts/_example` succeeds and writes `posts/_example/export/post.png`, `codex login status` says logged in, and `python -c "import cv2, numpy, onnxruntime, librosa"` works. If all of that already works, check step 8 (Wan) and then go to the `frame-kit` skill.

## 1. Node.js 20+
Check `node -v`. If missing or older than 20, install the LTS:
- Windows: `winget install --id OpenJS.NodeJS.LTS -e --accept-source-agreements --accept-package-agreements`
- macOS: `brew install node` (no Homebrew: install it from https://brew.sh first, or download the installer from https://nodejs.org)
- Linux: use the distro package manager or NodeSource

A freshly installed Node is often not on PATH in the current shell. On Windows, call it by full path (`"C:/Program Files/nodejs/node.exe"`, `"C:/Program Files/nodejs/npm.cmd"`) or refresh PATH from the registry; if still not found, ask the user to restart Claude Code and continue afterwards.

## 2. Chrome or Edge
The scripts in `tools/` launch a local browser and look for it in the default install paths for Windows, macOS and Linux (Edge ships with Windows, so Windows is usually fine). If none is present:
- Windows: `winget install --id Google.Chrome -e --accept-source-agreements --accept-package-agreements`
- macOS: `brew install --cask google-chrome`
- Installed somewhere else: set the `CHROME_PATH` environment variable for the command, e.g. `CHROME_PATH="/path/to/chrome" npm run render -- ...`

## 3. Dependencies
Delete `node_modules/` if it was copied from another machine (the bundled ffmpeg binary is platform-specific), then run `npm install`.

## 4. Smoke test
Run `npm run render -- posts/_example`, then open `posts/_example/export/post.png` with Read and check it shows the post with the logo and text in the right fonts (needs internet for Google Fonts). If a step fails, read the error, fix it, and retry — don't hand the error to the user.

## 5. Codex (for AI model images)
The user has a ChatGPT plan and wants Codex available, so set it up too. The user runs the prompts from `kits/*/kit.md` in it to make images (backgrounds, models, and scenes with the real frame photo attached via `-i`) — see the `frame-kit` skill and `data/models/README.md` for the command, rules and gotchas.
1. Check `codex --version`. If missing, run `npm install -g @openai/codex` (Node from step 1 is enough).
2. Check login with `codex login status`. If not logged in, login opens a browser and must be done by the user: ask them (in Thai) to type `! codex login` in this Claude Code prompt and sign in with their ChatGPT account. Never ask for or use an `OPENAI_API_KEY`.
3. Verify with `codex login status` only — don't run a test image, since every generation uses the user's ChatGPT quota.

Every `codex exec` image generation costs the user's quota: always ask the user before running one.

## 6. Python 3.10+ (depth map for 2.5D clips, soundtrack)
`tools/depth.py` and `tools/soundtrack.py` need Python with OpenCV, NumPy and ONNX Runtime.
1. Check `python --version`. If missing: Windows `winget install --id Python.Python.3.12 -e --accept-source-agreements --accept-package-agreements`, macOS `brew install python`. Refresh PATH the same way as for Node.
2. `python -m pip install opencv-contrib-python numpy onnxruntime librosa soundfile`
3. The depth model `tools/models/depth-anything-v2-small.onnx` ships in the folder. If it is missing: `curl -L -o tools/models/depth-anything-v2-small.onnx https://huggingface.co/onnx-community/depth-anything-v2-small/resolve/main/onnx/model.onnx`
4. Test: `python tools/depth.py posts/_example/export/post.png tmp/depth-test.png` writes a grey depth image.

## 7. HyperFrames plugin (clips + sound effects)
HyperFrames renders need system FFmpeg/ffprobe on PATH: `winget install --id Gyan.FFmpeg -e --accept-source-agreements --accept-package-agreements` (macOS `brew install ffmpeg`).

`tools/soundtrack.py` takes its SFX from the HyperFrames plugin (`~/.claude/plugins/cache/claude-plugins-official/hyperframes/*/skills/media-use/audio/assets/sfx`). If that folder does not exist, ask the user (in Thai) to type `/plugin install hyperframes@claude-plugins-official` in the Claude Code prompt and restart Claude Code.

## 8. Wan 2.2 image-to-video (optional, needs an NVIDIA GPU with 6 GB+ VRAM)
`tools/wan.py` turns one image into a 5 s video with Wan 2.2 TI2V 5B (GGUF) through a local ComfyUI in `~/ComfyUI` (the script starts the server itself). It is free and uses no quota, but it only runs on NVIDIA cards. Check `nvidia-smi` first: no NVIDIA GPU → skip this step and tell the user clips use 2.5D or Codex/Kling video instead.
1. `git clone https://github.com/comfyanonymous/ComfyUI ~/ComfyUI` (install Git with `winget install --id Git.Git -e` if missing)
2. Create a venv in `~/ComfyUI/venv`, install PyTorch with CUDA (`pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128`), then `pip install -r requirements.txt`
3. `git clone https://github.com/city96/ComfyUI-GGUF ~/ComfyUI/custom_nodes/ComfyUI-GGUF` and `pip install -r` its `requirements.txt` in the same venv
4. Download the models (~9.4 GB, tell the user it takes a while) to exactly these names:
   - `models/unet/Wan2.2-TI2V-5B-Q5_K_M.gguf` (Hugging Face `QuantStack/Wan2.2-TI2V-5B-GGUF`)
   - `models/text_encoders/umt5-xxl-encoder-Q5_K_M.gguf` (`city96/umt5-xxl-encoder-gguf`)
   - `models/vae/wan2.2_vae.safetensors` (`Comfy-Org/Wan_2.2_ComfyUI_Repackaged`, `split_files/vae/`)
   Verify each repo and file name on Hugging Face before downloading; if a name changed, keep the file names above or update the node inputs in `tools/wan.py`.
5. Test: `python tools/wan.py posts/_example/export/post.png "slow camera push in" tmp/wan-test.mp4 --seconds 2 --steps 8`. On a card with 6 GB keep `--size 480x848`; with more VRAM a bigger size is fine.

6. Free local text-to-image (same ComfyUI): `tools/flux.py` uses FLUX.1 schnell GGUF — download the 4 files listed at the top of that script into `~/ComfyUI/models` (~10.7 GB). Test: `python tools/flux.py "a pencil sketch of a cat" tmp/flux-test.png`.

When steps 1–7 are done (and 8, or it was skipped with a reason), tell the user in Thai that setup is done and they can say "สุ่มแว่น".

## Notes
- Default job (policy since 2026-09-18): `.claude/skills/frame-kit/SKILL.md` — random frame + photos, cutout layers, style profile and Codex prompts in `kits/`. The user no longer wants finished posts; `.claude/skills/daily-post/SKILL.md` is kept only for when they explicitly ask for one.
- Clips: glasses beat clips = `.claude/skills/beat-clip/SKILL.md`; 15-second eye-break / close-your-eyes clips (person or nature look) = `.claude/skills/eye-break-clip/SKILL.md`.
- Directing any clip (camera, lens, light, colour, edit, sound, shot lists, storyboards, AI-video prompts, video QC) = `.claude/skills/film-director/SKILL.md` — fill its 20-step `DECISION_ENGINE.md` per scene; `.claude/skills/film-director/tools/video_qc.py` before delivery.
- Free FLUX redraw of a ChatGPT/Codex picture ("เอาให้เหมือน ChatGPT") = `.claude/skills/flux-like-chatgpt/SKILL.md`.
- Story clips with characters (any series in `story-clips/`): read `story-clips/_craft/GUIDE.md` first (shot grammar, camera, acting, lip-sync, editing), `STYLES.md` (looks) and `FX.md` (effects + sound); build with `rig.js` (puppets + camera), `fx.js` (visual effects), `sound.py` + `sfxlib/` (real CC0 SFX library, 83 sounds); demos in `_craft/demo/` and `_craft/demo-fx/`. After each clip add lessons to `_craft/LEARNING-LOG.md`. Deep 12-lesson curriculum (photo, lens, composition, lighting, movement, 2D/3D, storyboard, AI image/video prompts, edit/grade, production QC) in `_craft/curriculum/`.
- Carousels (multi-slide posts) live in `carousel/` — line-art styles in `carousel/styles/`, one kit per carousel in `carousel/kits/` (copy `_template`); see `carousel/README.md`.
- Studio loop (2026-11-26) for every creative job: before → `python creative-intelligence/tools/memory.py brief --job "<job>" --tags <tags>` (Creative Memory: past approvals/rejections, characters, known errors); before delivery → skill `creative-critic` (independent critic sub-agent); after the user reacts → `memory.py add --type approval|rejection` with their words. Deep knowledge: 15 domain guides in `creative-intelligence/domains/README.md` (load only the § a job needs).
- Creative knowledge base (45 modules, sources, evidence, progress) = `creative-intelligence/MASTER_INDEX.md`; cross-discipline creative planning and "เรียนรู้ต่อ" = `.claude/skills/master-creative-director/SKILL.md` (resume point: `creative-intelligence/RESUME.md`).
- `tmp/` is scratch space (Codex writes its text replies there); it can be empty.
- House rules from the original machine: every post and clip is English-only; posts carry `brand/store-lineart.png` faint at the top right, clips do not (user, 2026-09-25) but carry the moving TIMEOPTIC wordmark, the frame brand's logo at the top left (`brand/partner-logos/`) and the glasses from several angles with detail punch-ins, on backgrounds calm enough that the glasses stand out; cutout glasses in clips get a lens layer so they don't look empty. Ask for the price/promo each time a promo clip is made (there is no price file). Images for clips are generated text-free; text lives in the HTML layer. Music is added later by the user.
