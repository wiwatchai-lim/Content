# remove-spots: ลบจุดเกินในวิดีโอ ใช้ได้กับทุกคลิป

ลบจุดหรือของเล็กๆ ที่ไม่ควรมี เช่น หมุด น็อต โลโก้ จุดฝุ่น หรือรายละเอียดที่ AI ใส่เกินมาบนสินค้า ส่วนอื่นของภาพและเสียงไม่เปลี่ยน
ใช้ได้ทั้งตอนวัตถุขยับ หมุน และกับคลิปที่มีหลายฉาก ไม่ได้ใช้ AI ทุกอย่างรันในเครื่อง:
ตามจุดทุกเฟรมด้วย template matching แล้วเติมผิวรอบๆ ทับ (cv2.inpaint คล้าย healing ใน Photoshop)

## ติดตั้ง

- Python 3 แล้วรัน `pip install opencv-python numpy`
- ffmpeg (ต้องเรียกคำสั่ง `ffmpeg` ได้)
- ถ้าใช้กับ Claude Code: ก๊อปโฟลเดอร์นี้ไปไว้ที่ `C:\Users\<ชื่อ>\.claude\skills\remove-spots\`
  แล้วสั่งเป็นภาษาไทยได้เลย เช่น "ลบหมุดสีทองที่มุมกรอบแว่นในคลิปนี้ [path] ทุกฉากทั้งสองข้าง" Claude จะทำตาม SKILL.md เอง

## ใช้เอง 3 ขั้น

1. **ดูคลิป**
   ```
   python inspect_video.py in.mp4 work --every 0.25
   python inspect_video.py in.mp4 work --at 0.0,2.0 --crop 0,800,1080,300
   ```
   ได้รายการฉาก, `work/sheet.jpg` ภาพย่อทุก 0.25 วิ, และ `work/at_<วินาที>.png` ภาพเต็มที่มีเส้นตารางบอกพิกัด เอาไว้อ่านตำแหน่งจุด

2. **เขียน tracks.json** จุดละหนึ่งรายการต่อหนึ่งฉาก ใช้หน่วยวินาที:
   ```json
   [{"from": 0.0, "to": 1.875, "seed": 0.0, "x": 698, "y": 962, "w": 46, "h": 24, "note": "ฉาก 1 หมุดขวา"}]
   ```
   `seed` คือเวลาที่วัดตำแหน่ง x, y สคริปต์จะตามจุดไปจนถึง `to` และย้อนกลับไปถึง `from` อย่าให้ข้ามฉาก

3. **เช็กแล้ว render**
   ```
   python remove_spots.py in.mp4 out.mp4 tracks.json work/debug.jpg   # ได้ภาพเช็ก จุดถูกทาแดง
   python remove_spots.py in.mp4 out.mp4 tracks.json                  # render จริง
   ```

ตัวอย่างที่ใช้จริงอยู่ใน `examples/glasses-honeycomb.json` (ลบหมุดบนกรอบแว่น 4 จุด 3 ฉาก)
