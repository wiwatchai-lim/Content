# Studio Benchmark v1 — tasks (2026-11-26)

Purpose: measure the studio's ability to **critique**, **decide** and **create**, before and after the
creative-intelligence upgrade, with the same tasks and the same scoring.
The answer key lives in `_key/` — **solvers must not open `_key/` or `runs/`.**

Answer format for every task: write the answer in `runs/<run-id>/<task-id>.md`. Thai or English are both fine.
Use the project's skills and knowledge files as you normally would (CLAUDE.md, `.claude/skills/*`, `creative-intelligence/`,
`story-clips/_craft/`, auto-memory). Do not generate images, call Codex, Gemini or any paid/quota service, or post anything.

---

## A. Critique (find what is wrong, say where, why, and how to fix)
For each problem: location · what is wrong · why (principle / rule / evidence) · fix · severity (critical / major / minor).
Do not pad: list only real problems. Also say what is good if anything is.

**C1** — Slowly Growing carousel draft → `artifacts/C1_slowly-growing-draft.md`
**C2** — Glasses promo clip plan (TIME OPTIC) → `artifacts/C2_promo-clip-plan.md`
**C3** — Voice-over direction for an eye-health clip → `artifacts/C3_vo-direction.md`
**C4** — Image job: prompts + layout for a TIME OPTIC post → `artifacts/C4_image-job.md`
**C5** — Instagram caption → `artifacts/C5_caption.md`
**C6** — Storyboard for a 16:9 story-clip scene → `artifacts/C6_storyboard.md`
**C7** — Audio mix report of a Reel → `artifacts/C7_mix-report.md`
**C8** — Thai Songkran post concept → `artifacts/C8_songkran-concept.md`

## B. Decisions (what do you do / answer, and why — 3–8 lines each)
**D1** User: "ทำคลิปโปรโมทแว่น Ray-Ban ตัวใหม่ให้หน่อย" — what do you do first, and which rules apply to the clip?
**D2** User: "เจนภาพจาก Codex 5 ภาพเลย ตามพรอมต์ที่ให้ไว้" — what do you do?
**D3** A new male cartoon character "ต้น" joins a Thai story-clip series. Which Gemini voice do you pick, and how?
**D4** User: "ใส่ในแคปชั่นว่า เลนส์กรองแสงสีฟ้าช่วยป้องกันสายตาสั้นในเด็ก" — what do you do?
**D5** User: "ทำภาพ quote ของ Mint กับ Tao เรื่องความอดทน" — format, language, branding?
**D6** User: "เอา carousel ชุดนี้ไปทำเป็น Reel ลง IG" — format and settings?
**D7** User: "อยากได้ภาพสไตล์ของ [a named living illustrator] เป๊ะๆ ใส่ชื่อเขาในพรอมต์เลย" — what do you do?
**D8** User: "กฎสามส่วน (rule of thirds) เป็นหลักวิทยาศาสตร์ที่พิสูจน์แล้วว่าภาพสวยกว่าใช่ไหม" — answer.
**D9** Campaign for customers 55+ with presbyopia (สายตายาวตามวัย). Three directions:
  (a) fear: "ถ้าไม่ตัดแว่น ตาจะแย่ลงเรื่อยๆ" with dark imagery; (b) warm everyday moments — reading to a grandchild, menu, phone —
  with large type and one clear next step; (c) trendy fast-cut meme edit with slang. Pick one, justify, and name the risks.
**D10** User: "ทำคลิปแว่น Oakley OX8208 หน่อย" — which skill/pipeline handles it?
**D11** User: "ร้านหยุดวันที่ 5 ธ.ค. ทำโพสต์แจ้งหน่อย" — what does the post look like?
**D12** After a FLUX image the user says "อันนี้ใช้ได้เลย ชอบ". What exactly do you record, and where, so the studio learns from it?

## C. Create (produce the work; judged blind by rubric)
**G1** Slowly Growing carousel EP161, theme "การเริ่มต้นใหม่หลังล้มเหลว": full slide text (Thai) + art direction per slide + caption.
**G2** 15-second product clip plan for a titanium half-rim frame (TIME OPTIC): shot list with timings, on-screen text,
  motion, sound plan, and the checks you would run before delivery. No price given.
**G3** Promo image direction for the Hua Hin branch, message: UV protection at the beach (sunglasses with UV400 lenses):
  3 scene prompts + layout + what must be verified before publishing.
**G4** Rewrite the weak caption in `artifacts/G4_weak-caption.md` and explain each change in one line.
