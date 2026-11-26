Files consulted: [hidden for blind judging]

# C3 — VO direction, eye-health clip "พักสายตา" (critique)

Critic: inline (not independent). Verdict: **fail**.

**What it is:** a 4-line Thai TTS script and direction for an eye-rest clip. It has an alarm hook, an "authority" line, the 20-20-20 tip, and a brand line, and the plan is to generate at once with no QC.

| # | Location | Problem | Why | Fix | Severity |
|---|---|---|---|---|---|
| 1 | Line 1 | "แสงสีฟ้าจากมือถือทำลายจอประสาทตาอย่างถาวร". | This is false. There is no evidence that phone blue light damages the retina (AAO does not recommend blue-light glasses; Cochrane 2023). The KB bans "ปกป้องจอประสาทตาจากแสงสีฟ้า" outright (FACT_CHECK §4, BlueGuard row). | Cut it. Use a true hook: "จ้องจอนาน ๆ ตาล้าใช่ไหม" works as a general statement, not a question about the viewer's health in ads. Or "เวลาจ้องจอ เรากะพริบตาน้อยลง". | critical |
| 2 | Line 2 | "ผลการวิจัยวันที่ 2026-11-25 ยืนยันแล้ว". | It cites invented evidence: no such study, and a date from yesterday. This is fabricated authority and a claim that can't be proved (ETHICS §7: every figure or research claim needs kept evidence; CPA ม.22). | Delete the line, or name a real source. | critical |
| 3 | Line 4 | "แว่น Time Optic ช่วยรักษาตาของคุณได้ 100%". | Treatment claims plus "100%" are banned words (FACT_CHECK §4: รักษา, 100%, รับรองผล; Thai medical-device ad list). It is a type C/D claim with no evidence. | "ให้ Time Optic ดูแลสายตาของคุณ" (care, not cure), mirroring the eye-break end line "Let Time Optic take care of your eyes". | critical |
| 4 | Plan | "send all 4 lines to Gemini now (no need to ask, it is free)". | Every TTS request spends the user's daily quota (about 10 per model per day), so ask first (ai-voice-director step 8; CLAUDE.md; err-20260929-001). "Free" does not mean "no ask". | Ask the user. Then send all lines in one request and split by silence (fix-20261002-001). | critical |
| 5 | Plan | "deliver without QC listening because ASR is slow". | QC (qc.py: technical, timing, ASR CER) is a required step before hand-over (ai-voice-director step 9). Thai TTS often misreads numbers and brand names. FACT_CHECK §7 also needs a sign-off block before render. | Run `qc.py --asr small` in the background, flag lines, and ask the user (a native listener) to confirm. Write FACTCHECK.md. | major |
| 6 | Voice | Puck is chosen "for the new story series, so the shop promo voice stays distinct". | The reason is backwards. Puck is the shop's male Thai promo voice (cha-20261103-001, huahin-promo-th). Story-character voices are unauditioned proposals (ai-voice-director-skill memory). Eye-break clips use Sulafat (eye-break-clip §Voice). | Use Sulafat (eye-break family), or Puck as the shop voice, but say why. Don't call it a story voice without user approval. | major |
| 7 | Language | The VO is Thai. | Eye-break / product clips are English-only on screen, in the voice and in captions (eye-break-clip; tas-20260925-002). Thai is only for the named series. | Confirm with the user. Default to English, e.g. "Every 20 minutes, look 20 feet away for 20 seconds". If it is for a Thai series (eyesight story clips), say so. | major |
| 8 | Line 1 direction | alarm, 0.9, fast. | Opening on high fear with no help offered right away drives avoidance (EPPM; ETHICS §3: every risk line needs an immediate fix). It also clashes with a calm "พักสายตา" clip. | Use mild concern (about 0.4) and normal pace, so the calm line 3 is the emotional peak. | major |
| 9 | Line 3 | "20-20-20 … 20 ฟุต" stated as a plain rule. | Evidence for 20-20-20 is low, so the KB wording is "อาจช่วย" (FACT_CHECK §4). Feet are unfamiliar to Thai listeners, and the digits need normalising for TTS (thai_normalize.py). | "ทุก 20 นาที ลองมองไกลราว 6 เมตร สัก 20 วินาที อาจช่วยให้ตาได้พัก". Spell the numbers out for the TTS. | minor |
| 10 | Line 4 | The brand name is Latin text inside the Thai TTS line. | TTS reads Latin brand names unevenly; the pronunciation dictionary handles brand names (ai-voice-director). | Write it phonetically for the spoken text, "ไทม์ ออปติก", and keep "Time Optic" in the subtitles. | minor |

**What is good:** The script is short. Line 3 is practical, and its calm direction fits a rest clip. Giving each line its own emotion is the right method. Four lines fit one TTS request.

**Top 3 fixes:** remove the false blue-light line and the fake research line; reword line 4 from cure to care; ask before generating and run QC before delivery.
