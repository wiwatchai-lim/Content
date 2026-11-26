#!/usr/bin/env python3
"""One-off seed of the Creative Memory store from records that already existed on 2026-11-26.
Every record points to its source (auto-memory file, LEARNING-LOG, ANTI_PATTERNS, kit). Nothing here is new opinion.
Re-running is safe: records whose id already exists are skipped."""
import json, os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
M = "auto-memory:"  # ~/.claude/projects/C--timeoptic-content/memory/

R = []
def add(t, id, date, summary, source, evidence, tags, **kw):
    R.append(dict(type=t, id=id, date=date, summary=summary, source=source, evidence=evidence, tags=tags, **kw))

# ---------- taste (user's stable preferences, with their words where recorded) ----------
add("taste", "tas-20260918-001", "2026-09-18", "Default job is a frame kit (random frame + photos + cutouts + Codex prompts), not finished posts",
    "CLAUDE.md Notes", "user", ["frame-kit", "default-job"], applies_to="any unspecified request about frames")
add("taste", "tas-20260925-001", "2026-09-25", "Clips: no store line art; moving TIMEOPTIC wordmark; partner logo top-left; glasses from several angles with detail punch-ins; calm backgrounds; lens layer on cutouts",
    "CLAUDE.md house rules", "user", ["clip", "beat-clip", "brand", "time-optic"])
add("taste", "tas-20260925-002", "2026-09-25", "Posts and product clips are English-only; Thai only for the named series (story clips, Hua Hin Thai promos, brand battle, Slowly Growing, dialogue quotes, closure notices TH+EN)",
    "CLAUDE.md + auto-memory story-clips-thai, dialogue-quote-images, closure-notice-style", "user", ["language", "thai", "english", "post", "clip", "carousel"])
add("taste", "tas-20260925-003", "2026-09-25", "Ask for price/promo every time a promo clip is made; never invent a price", "CLAUDE.md house rules", "user",
    ["price", "promo", "clip"])
add("taste", "tas-20260925-004", "2026-09-25", "Music is added later by the user (beat clips deliver SFX-only + a preview with the song); eye-break clips are the exception with voice baked in",
    "CLAUDE.md + .claude/skills/eye-break-clip/SKILL.md", "user", ["music", "audio", "clip"])
add("taste", "tas-20260925-005", "2026-09-25", "Generated images are text-free; all text lives in the HTML layer", "CLAUDE.md house rules", "user",
    ["image", "text", "prompt", "codex", "flux"])
add("taste", "tas-20261113-001", "2026-11-13", "Quote/dialogue images: IG 1:1 1080×1080, no logo or TIME OPTIC mark unless asked",
    M + "quote-images-square-no-logo.md", "user", ["quote", "carousel", "slowly-growing", "mint-tao", "logo", "format"],
    user_words="ภาพที่อยากได้เป็นขนาด IG คือ 1:1 ... ไม่ต้องใส่ logo ถ้ายังไม่ได้บอก")
add("taste", "tas-20261113-002", "2026-11-13", "Every Codex image costs the user's ChatGPT quota: ask before each run; offer free local FLUX first for drafts/bulk",
    M + "local-flux.md + CLAUDE.md", "user", ["codex", "flux", "quota", "image"])
add("taste", "tas-20261118-001", "2026-11-18", "Reels from story carousels stay 9:16 with music, AI label ON, text out of the caption area and right-side buttons",
    M + "ig-reels-1x1-ai-label.md", "user", ["reel", "instagram", "ai-label", "carousel", "format"])
add("taste", "tas-20261121-001", "2026-11-21", "The user wants the studio to keep learning: log lessons after every clip",
    "story-clips/_craft/LEARNING-LOG.md", "user", ["learning", "clip", "story-clip"], user_words="เรียนรู้อีกเรื่อยๆ")
add("taste", "tas-20261125-001", "2026-11-25", "Knowledge is general-purpose, not only eyewear", M + "knowledge-general-purpose.md", "user",
    ["knowledge", "research"], user_words="เรียนรู้หมดเราจะเอาไปใช้กับทุกด้าน ไม่ใช่แค่แว่นตา")
add("taste", "tas-20261028-001", "2026-10-28", "Zombie series: no glasses or eye content at all; do the episodes one at a time without sub-agents",
    M + "zombie-series.md", "user", ["zombie", "story-clip", "series"])
add("taste", "tas-20261109-001", "2026-11-09", "Keep earlier versions when redoing a job", M + "promo-image-feed-style.md", "user",
    ["revision", "files"], user_words="อย่าลบ")

# ---------- brand styles ----------
add("brand_style", "bra-20260925-001", "2026-09-25", "TIME OPTIC: name written 'Time Optic' (two words) / spaced TIMEOPTIC wordmark; colours #123A29 green and #212121; Peach never as text",
    ".claude/skills/beat-clip/SKILL.md + daily-post/SKILL.md + brand/", "user", ["time-optic", "brand", "logo", "colour"],
    brand="TIME OPTIC", tokens={"green": "#123A29", "ink": "#212121"},
    do=["spaced white wordmark brand/logo/timeoptic-white-spaced.svg on dark scenes", "72 px post margin", "store line art faint top-right on posts"],
    dont=["Peach text (contrast ~1.4:1 on Snow)", "line art in clips", "'TimeOptic' as one word"])
add("brand_style", "bra-20261109-001", "2026-11-09", "'ทำภาพโปรโมท' = 3 square cinematic dark themed Codex scenes with the real cutout attached, partner logos centred top, one uppercase spec line, white TIME OPTIC bottom",
    M + "promo-image-feed-style.md", "user", ["promo", "image", "time-optic", "codex"], brand="TIME OPTIC",
    dont=["white 3-detail split layout (rejected 2026-11-09)", "store line art on promo images", "floating temples — keep glasses touching the surface"])
add("brand_style", "bra-20261123-001", "2026-11-23", "Closure notice copies the shop's real FB holiday notice: silver waves, megaphone + black pill, red sub-headline, green calendar with red date, TH+EN, black bottom bar, font Prompt",
    M + "closure-notice-style.md", "user", ["closure", "holiday", "notice", "post", "time-optic"], brand="TIME OPTIC",
    do=["make the closed day the most prominent element", "template posts/2026-11-23_saturday-closed/notice-sq.html"],
    dont=["brand-kit green card (rejected as too small)", "announcing Sunday (always closed)"])
add("brand_style", "bra-20261114-001", "2026-11-14", "Slowly Growing (@justslowlygrowing): separate non-shop channel, Thai text, graphite pencil on old cream paper, beige/warm grey/charcoal/muted brown, no text in art, top third empty for text, no shop logo",
    "slowly-growing/README.md + " + M + "slowly-growing-channel.md", "user", ["slowly-growing", "mint-tao", "carousel", "style"],
    brand="Slowly Growing", dont=["sales or shop promos", "night/dark-sky scenes (turn into grey boxes after charcoal tone)", "drawn faces"])

# ---------- characters ----------
add("character", "cha-20261114-001", "2026-11-14", "Mint — the worrier: voices worry, fear, tiredness", "slowly-growing/README.md", "user",
    ["mint-tao", "slowly-growing", "character", "carousel"], series="Slowly Growing", name="Mint",
    look="smooth round faceless head; oversized oatmeal knit sweater; dark trousers", personality="speaks the worry", never=["a drawn face", "Tao's coat/scarf"])
add("character", "cha-20261114-002", "2026-11-14", "Tao — the answerer: short, warm, deep replies", "slowly-growing/README.md", "user",
    ["mint-tao", "slowly-growing", "character", "carousel"], series="Slowly Growing", name="Tao",
    look="smooth round faceless head, slightly taller; long charcoal coat; muted brown scarf", personality="short, warm, deep", never=["a drawn face", "preachy lectures"])
add("character", "cha-20261103-001", "2026-11-03", "Hua Hin blue-shirt man (user's AI clips): voiced by Gemini 'Puck' — Puck is the shop's male Thai promo voice",
    M + "huahin-promo-th.md", "user", ["huahin", "voice", "puck", "character"], series="Hua Hin Thai promos", name="blue-shirt man",
    voice="Gemini 3.1 flash TTS 'Puck'", never=["reuse Puck for unrelated cartoon characters without asking"])
add("character", "cha-20261121-001", "2026-11-21", "ยายจันทร์ (ร้านแว่นตีสอง EP01) — gold frames; voice Charon narration in EP01",
    M + "night-optic-series.md + story-clips/night-optic/SERIES.md", "user", ["night-optic", "story-clip", "character"],
    series="ร้านแว่นตีสอง", name="ยายจันทร์")

# ---------- approvals / rejections (user verdicts) ----------
add("approval", "app-20261113-001", "2026-11-13", "FLUX img2img from the Codex picture at denoise 0.35 matched what the user wanted",
    M + "local-flux.md", "user", ["flux", "img2img", "carousel", "dialogue"], artifact="carousel/kits/2026-11-13_dialogue-quotes/",
    what_worked="use the Codex image as init, denoise 0.35", prompt_ref="")
add("rejection", "rej-20261113-001", "2026-11-13", "FLUX text-to-image alone did not look like the Codex/ChatGPT picture",
    "creative-intelligence/memory/FEEDBACK_HISTORY.json + " + M + "local-flux.md", "user", ["flux", "codex", "style-match"],
    artifact="carousel/kits/2026-11-13_dialogue-quotes/", what_failed="text-to-image drifts from the reference look", user_words="ยังไม่เหมือน",
    fixed_by="app-20261113-001")
add("rejection", "rej-20261109-001", "2026-11-09", "White 3-detail split post rejected: not beautiful, not fitting the page",
    M + "promo-image-feed-style.md", "user", ["promo", "post", "layout", "time-optic"], artifact="posts/2026-11-09_prada-linea-rossa/",
    what_failed="bright split layout unlike the feed's dark cinematic sets; store line art", fixed_by="bra-20261109-001")
add("rejection", "rej-20261123-001", "2026-11-23", "Closure notice in brand-kit green card style rejected as too small / unlike the page",
    M + "closure-notice-style.md", "user", ["closure", "notice", "post"], artifact="posts/2026-11-23_saturday-closed/",
    what_failed="small text, not the page's own notice look", fixed_by="bra-20261123-001")
add("rejection", "rej-20261118-001", "2026-11-18", "Reels scheduled with the AI label off — user wants it on", M + "ig-reels-1x1-ai-label.md", "user",
    ["reel", "ai-label", "instagram"], artifact="carousel/kits/2026-11-16_*/export/reel.mp4", what_failed="copied old carousel settings",
    fixed_by="tas-20261118-001")
add("rejection", "rej-20261109-002", "2026-11-09", "Floating temple: glasses must touch the surface", M + "promo-image-feed-style.md", "user",
    ["glasses", "product", "image", "physics"], artifact="posts/2026-11-09_prada-linea-rossa/", what_failed="glasses not in contact with the surface")

# ---------- errors + fixes (observed in real jobs) ----------
add("error", "err-20261121-001", "2026-11-21", "FLUX draws whatever a 'no …' phrase names", "creative-intelligence/ANTI_PATTERNS.md", "observed",
    ["flux", "prompt", "negative"], what="'no lamp', 'moonlight' summoned the object", cause="text encoder attends to the noun",
    detect_by="look for negated nouns in the prompt", fix_ref="fix-20261121-001")
add("fix", "fix-20261121-001", "2026-11-21", "Describe what is there (the effect), never what is not", "creative-intelligence/ANTI_PATTERNS.md", "test",
    ["flux", "prompt", "negative"], problem="negated objects appear", solution="positive description of light/effect; inpaint leftovers",
    error_ref="err-20261121-001")
add("error", "err-20261123-001", "2026-11-23", "FLUX draws real human faces on faceless characters when prompts say 'wearing glasses', mention a third person, or show people in car windows",
    M + "story-carousels-2026-11-16.md", "observed", ["flux", "faceless", "mint-tao", "carousel"],
    what="drawn faces break the faceless design", cause="'wearing glasses' / people cues pull a face prior", fix_ref="fix-20261123-001")
add("fix", "fix-20261123-001", "2026-11-23", "For glasses on faceless characters write 'a smooth blank white egg-like sphere head with round eyeglasses resting on it … neither person has a face'; reject seeds with faces",
    M + "story-carousels-2026-11-16.md (set 76 slide 4 = raw/04s-2)", "test", ["flux", "faceless", "mint-tao", "glasses"],
    problem="faces appear", solution="egg-like sphere head wording + seed rejection", proof="carousel set 76 slide 4", error_ref="err-20261123-001")
add("error", "err-20261117-001", "2026-11-17", "Dark night skies and orange/peach or very white paper turn into grey/dark rectangles after charcoal tone",
    M + "story-carousels-2026-11-16.md", "observed", ["charcoal", "carousel", "slowly-growing", "tone"],
    what="hard grey box in the slide", cause="charcoal_tone maps those values to flat grey", fix_ref="fix-20261117-001")
add("fix", "fix-20261117-001", "2026-11-17", "Ask for pale cream paper, avoid night skies, swap the seed; finish.py takes paper colour from the brightest top pixels",
    M + "story-carousels-2026-11-16.md", "test", ["charcoal", "carousel", "tone"], problem="grey boxes",
    solution="cream-paper STY + seed swap + finish.py paper sampling", proof="sets 52, 53, 73, 81", error_ref="err-20261117-001")
add("error", "err-20261124-001", "2026-11-24", "Speech-bubble lines longer than ~12 Thai characters auto-shrink too small", M + "story-carousels-2026-11-16.md",
    "observed", ["carousel", "thai", "typography", "bubble"], what="tiny text in bubbles", cause="auto-fit shrink", fix_ref="fix-20261124-001")
add("fix", "fix-20261124-001", "2026-11-24", "Keep bubble lines ≤ ~12 Thai chars; set Thai line breaks by hand with <br> (nowrap)",
    M + "story-carousels-2026-11-16.md + dialogue-quote-images.md", "test", ["carousel", "thai", "typography", "bubble"],
    problem="tiny text", solution="short lines + manual breaks", proof="sets 87/4, 99/2", error_ref="err-20261124-001")
add("error", "err-20261124-002", "2026-11-24", "Rope drawn over a head read as a noose (set 104 slide 3)", M + "story-carousels-2026-11-16.md", "observed",
    ["flux", "symbol", "carousel", "sensitive"], what="unintended dark symbol", cause="object placement near the neck", detect_by="look for ropes/lines near necks")
add("error", "err-20260929-001", "2026-09-29", "Probing or retrying Gemini TTS on a daily 429 burns the 10-request quota",
    M + "gemini-tts-sulafat.md", "observed", ["gemini", "tts", "quota", "voice"], what="quota gone early", cause="retry loop and probe calls count",
    fix_ref="fix-20261002-001")
add("fix", "fix-20261002-001", "2026-10-02", "One request with all lines ('pause two seconds between lines') then split by silence; ≤ 8 lines per request; no probes",
    M + "gemini-tts-sulafat.md + huahin-uv-th.md", "test", ["gemini", "tts", "quota", "voice"], problem="quota and SAFETY refusals",
    solution="batch lines, ≤8 per request, split.py", proof="kits/2026-10-02_eye-break-palm/audio/v3/, kits/2026-11-05_huahin-uv-th", error_ref="err-20260929-001")
add("error", "err-20261105-001", "2026-11-05", "Gemini TTS refused a 32-line script (finishReason SAFETY, then 'copyrighted works')",
    M + "huahin-uv-th.md", "observed", ["gemini", "tts", "safety"], what="whole script refused", cause="long request", fix_ref="fix-20261002-001")
add("error", "err-20261121-002", "2026-11-21", "A scene div left at opacity 0 renders black with no error", "story-clips/_craft/LEARNING-LOG.md", "observed",
    ["hyperframes", "story-clip", "render"], what="black scene", cause="no explicit show/cut-in", detect_by="contact sheet of every scene")
add("error", "err-20261111-001", "2026-11-11", "Parallel Codex runs race and copy the same newest image", M + "promo-image-feed-style.md", "observed",
    ["codex", "parallel", "image"], what="several scenes identical", cause="each run copies the newest file in ~/.codex/generated_images",
    detect_by="md5sum the scenes after a parallel run")
add("error", "err-20261124-003", "2026-11-24", "FLUX light-phrase test changed the camera and the product, not only the light (VA-001)",
    "creative-intelligence/knowledge/visual-arts/VISUAL_EXPERIMENTS.json", "test", ["flux", "lighting", "experiment"],
    what="uncontrolled variable", cause="model re-samples the whole scene", detect_by="compare geometry across takes")

# ---------- prompts actually run ----------
add("prompt", "pro-20261124-001", "2026-11-24", "Golden glasses FLUX series v1–v5 (9 takes, 4 prompt iterations); v5 passes the inspect_views indicator check",
    "creative-intelligence/memory/PROMPT_EXPERIMENTS.json + .claude/skills/ai-visual-artist/tests/real/", "test",
    ["flux", "glasses", "product", "prompt"], model="flux-schnell-local", text="see .claude/skills/ai-visual-artist/tests/real/golden_* prompts",
    outcome="v1 fail, v5 pass (automated); AI score 77/100 provisional; no human rating", output=".claude/skills/ai-visual-artist/tests/real/")
add("prompt", "pro-20261113-001", "2026-11-13", "FLUX img2img from a Codex picture, --denoise 0.35 (0.2 start, tune)", ".claude/skills/flux-like-chatgpt/SKILL.md",
    "user", ["flux", "img2img", "style-match"], model="flux-schnell-local", text="python tools/flux.py \"<prompt>\" out.png --init ref.png --denoise 0.35",
    outcome="user accepted the look", use_when="make it like the ChatGPT/Codex picture for free")

# ---------- ratings (only what exists; AI ratings labelled) ----------
add("rating", "rat-20261124-001", "2026-11-24", "Golden glasses v5 — provisional AI score", ".claude/skills/ai-visual-artist/tests/real/", "ai-judgement",
    ["flux", "glasses", "score"], rater="claude (ai-visual-artist score.py)", score=77, scale="0-100", artifact=".claude/skills/ai-visual-artist/tests/real/")

if __name__ == "__main__":
    sys.path.insert(0, HERE)
    import memory
    have = {r["id"] for r in memory.load()}
    n = 0
    for r in R:
        if r["id"] in have:
            continue
        r = {k: v for k, v in r.items() if v not in ("", None)}
        memory.add(r)
        n += 1
    print("seeded", n, "of", len(R))
