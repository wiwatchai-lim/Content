Files consulted: [hidden for blind judging]

**Confirm the cost once.** The user asked explicitly, so I may run Codex. Each image spends their ChatGPT quota, so I confirm once in Thai before the batch: "5 ภาพ = ใช้โควต้า ChatGPT 5 ครั้ง เริ่มเลยไหมคะ". I also mention that FLUX local is free if any of the five are simple backgrounds or drafts. After that: one `image_gen` call per prompt, no variants, no silent retries.

**Before running:** I check that each prompt in `kit.md` is the intended one, that product prompts (S1/S2/L3/C*) attach the real cutout or photo with `-i` placed **after** the prompt, and that the guard lines are present (no text or logos, an original face).

**Running:** `codex exec … "<verbatim prompt>" -i <file> < /dev/null`, **one at a time**. Parallel runs race and copy the same newest file. I copy each result from `%USERPROFILE%\.codex\generated_images\<session>\` into `kits/<folder>/gen/` and md5sum the five files to make sure they differ.

**After:** I open each image with Read and reject any where the glasses changed shape, bridge, temples or colour compared with `photos/`, float off the surface, or picked up baked-in text. I report in Thai which images passed and which failed and why, and ask before regenerating any (more quota). On a model or quota error I follow the fallback in `data/models/README.md` and tell the user. I don't loop.
