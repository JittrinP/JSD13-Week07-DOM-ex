# Evolution Clicker — Theme, Layout & Click Action Plan

ขอบเขตรอบแรก (MVP): 2-3 ยุคแรก + pixel art style + layout responsive ไม่มี scroll ทั้งหน้า + click action พร้อม particle effect

## Step 1 — โครง Layout (ตัดสินใจแล้ว)

**โครงสร้างหลัก 4 ส่วน:**
1. Navbar (fixed เล็ก ด้านบนสุด)
2. My World — click area + EP + auto point/sec + slot ถาวรแสดง icon/count ของ creature ที่มีอยู่
3. Tab switcher — สลับดู Shop / Upgrade / Status ทีละอัน (ไม่โชว์พร้อมกัน)
4. Panel เนื้อหาของ tab ที่เลือกอยู่ ขยายเต็มพื้นที่ที่เหลือ

**หลักการ CSS:**
- ใช้ `100dvh` แทน `100vh` กับ container หลัก กัน mobile address bar ดันเนื้อหาล้น
- ใช้ Flexbox `flex-direction: column` กับ main container, ให้แต่ละ section ใช้ `flex: 1` หรือ `flex-shrink: 0` ตามความเหมาะสม แทนการ fix เป็น `vh` ตายตัว — จะ responsive ดีกว่าตอนเนื้อหาเปลี่ยนขนาด
- Panel เนื้อหาภายใน (list shop item, upgrade item, status list) ใช้ `overflow-y: auto` ของตัวเอง เพื่อให้หน้าเว็บโดยรวมไม่ scroll แต่ list ข้างในเลื่อนได้ถ้าเนื้อหาเยอะ
- Desktop/tablet (จอกว้าง): พิจารณาใช้ CSS Grid แบ่ง 2 คอลัมน์ — World อยู่ซ้าย, tab panel อยู่ขวา — ใช้ `@media` breakpoint เปลี่ยนจาก column (มือถือ) เป็น grid 2 คอลัมน์ (จอกว้าง)

**Tab switcher ทำงานยังไง (แนวทาง JS):**
- ปุ่ม 3 ปุ่ม (Shop / Upgrade / Status) toggle class `active` แล้วโชว์/ซ่อน panel ที่ตรงกันด้วย `classList.add/remove('hidden')` หรือสลับ `display: none/flex`
- เก็บ state ปัจจุบันไว้ในตัวแปร JS ธรรมดา ไม่ต้องใช้ library

## Step 2 — Shop: ปุ่มซื้อ x1 / x10 / x100

- แทนที่ปุ่ม "Add" เดี่ยว ด้วย 3 ปุ่ม: Buy x1, Buy x10, Buy x100
- **จุดสำคัญด้าน logic**: ราคาต่อตัวเพิ่มขึ้นแบบ geometric ทุกครั้งที่ซื้อ (เช่น cost ต่อไป = cost ปัจจุบัน x 1.15) ดังนั้นตอนกด x10/x100 ต้อง**คำนวณราคารวมของทั้ง batch** ไม่ใช่แค่ราคาปัจจุบัน x จำนวน
  - สูตรราคารวม (geometric series): ใช้ลูปบวกราคาทีละตัว หรือใช้สูตรผลรวม geometric series ตรงๆ ก็ได้
  - เช็คก่อนซื้อว่า point ปัจจุบันพอจ่ายราคารวมทั้ง batch หรือไม่ ถ้าไม่พอ ปุ่มควร disable หรือกดแล้วไม่มีอะไรเกิดขึ้น (แจ้งเตือนเล็กน้อยก็ได้)

## Step 3 — Upgrade แยกไป section ของตัวเอง

- เอาปุ่ม Upgrade ออกจาก shopItem ทั้งหมด
- Upgrade panel (ใน tab) แสดงเฉพาะ creature ที่ owned > 0 แล้วเท่านั้น (ค่อยๆ ปลดล็อกทีละตัวตามที่คุณตั้งใจไว้)
- แต่ละ upgrade เพิ่ม point/sec เฉพาะของ creature ตัวนั้น (ไม่กระทบตัวอื่น)

## Step 4 — Status panel

- แสดงรายชื่อ creature ทุกตัวที่ owned ≥ 1 พร้อม: จำนวนที่ owned, upgrade level ปัจจุบัน, point/sec ที่ตัวนั้นผลิตอยู่
- ข้อมูลนี้ดึงจาก data structure เดียวกับที่ shop/upgrade ใช้ (array/object ของ creature state) ไม่ต้องแยก source

## Step 5 — Creature slot ถาวรใน My World

- เมื่อซื้อ creature ครั้งแรก (owned จาก 0 เป็น 1) ให้สร้าง slot ใหม่ในพื้นที่ World แสดง icon + ตัวเลข count
- ทุกครั้งที่ซื้อเพิ่ม (owned เพิ่มขึ้น) แค่ update ตัวเลข count ใน slot เดิม ไม่ต้องสร้าง element ใหม่ซ้ำ
- แยกโซนนี้ออกจาก `clickedArea` ชัดเจน (คนละ div) กัน event การคลิกไปโดนกัน

## Step 6 — กำหนด Art Direction ให้ตายตัว (สำหรับสั่ง ChatGPT)
- Style: **16-bit pixel art, retro game sprite**
- Prompt suffix มาตรฐาน ใช้ต่อท้ายทุกรูป (ทั้ง creature และ background):
  ```
  16-bit pixel art, retro game sprite, limited color palette, transparent background, centered, no anti-aliasing
  ```
- Creature: เจนเป็นสี่เหลี่ยมจัตุรัส (เช่น 512x512)

## Step 7 — เจนรูป Creature 2-3 ยุคแรก

1. Primordial — Paramecium
2. Cambrian seas — Trilobite
3. Age of fish — Fish

Prompt ตัวอย่าง (ต่อ suffix จาก Step 6):
- `a cute paramecium single-celled organism with big googly eyes, ...`
- `a friendly trilobite with small legs and antennae, ...`
- `a cheerful cartoon fish with fins, slightly evolved features, ...`

**เช็คก่อนไปต่อ:** เจนออกมาแล้ว 2-3 ตัวต้องดู "เป็นชุดเดียวกัน" ถ้าไม่เหมือนกันปรับ prompt แล้วเจนใหม่ก่อนขยายยุคถัดไป

## Step 8 — เจนรูป Background ต่อยุค

ต่างจาก creature prompt ตรงที่ต้องระบุว่าเป็น **background scene** และห้ามมี character ปนมา (creature วางแยกเป็น element อยู่แล้ว):

- Primordial: `underwater microscopic environment, cell-like organic shapes floating, murky teal water background, ..., no characters, seamless scene, horizontal composition`
- Cambrian seas: `shallow ancient ocean floor, coral-like rock formations, sandy seabed, ..., no characters, seamless scene, horizontal composition`
- Age of fish: `deeper ocean scene with rays of sunlight filtering through water, seaweed, rocky terrain, ..., no characters, seamless scene, horizontal composition`

**จุดต้องระวัง:**
- สั่ง aspect ratio ให้ตรงกับพื้นที่ My World จริง (แนวนอน/กว้าง) อย่าเจนสี่เหลี่ยมจัตุรัสแล้วมา crop
- เทียบสี background กับ creature ยุคเดียวกันว่า contrast พอมองเห็นตัวสัตว์ชัดไหม
- ใช้งานจริงด้วย `background-image` + `background-size: cover` + `background-position: center` กับ World container

## Step 9 — เจนรูป Particle Effect (สำหรับตอนคลิก)
- ทำ 1 sprite ใช้ซ้ำได้ทุกยุค
- แนวคิด: DNA strand เล็กๆ หรือจุดแสงกระจาย
- Prompt: `small glowing dna strand particle, simple icon, ..., no anti-aliasing`

## Step 10 — เตรียมไฟล์รูปใน Project
- โฟลเดอร์: `assets/creatures/`, `assets/backgrounds/`, `assets/particles/`
- ตั้งชื่อไฟล์สื่อความหมาย เช่น `paramecium.png`, `era1-bg.png`, `dna-particle.png`
- เก็บ path ไว้ใน array/object เดียวที่ใช้ร่วมกันทั้ง Shop, Upgrade, Status, World slot

## Step 11 — Click Action ด้วย CSS
1. Bounce effect ตอนคลิก (scale เล็กน้อยแล้วหดกลับ)
2. Number popup (`+1`) ลอยขึ้นจากจุดคลิกแล้วจางหาย
3. ใช้ CSS `@keyframes` + `transition` ทั้งสองอย่าง

## Step 12 — ผูก Particle Effect เข้ากับ Click Event
- สร้าง `<img>` particle ด้วย DOM ที่ตำแหน่งใกล้จุดคลิก (สุ่มตำแหน่งเล็กน้อย)
- ใส่ animation ลอยขึ้น + จางหาย แล้วลบ element ออกจาก DOM หลัง animation จบ (กัน DOM บวม)

## Step 13 — ทดสอบรวมทุกอย่าง
- คลิกแล้วต้องเห็นพร้อมกัน: bounce + เลข popup + particle ลอย
- ทดสอบ layout บนมือถือจริง ว่าไม่มี scroll ทั้งหน้า, tab switcher ทำงานลื่น
- เช็ค performance ตอนคลิกรัวๆ (ถ้าหน่วง จำกัดจำนวน particle พร้อมกัน)

## Step 14 — ประเมินผล แล้วค่อยขยายยุคที่เหลือ
- ถ้า 2-3 ยุคแรกดูดี และ workflow ลื่นไหลดีแล้ว ค่อยเจนยุคที่ 4-5 ต่อด้วย pattern เดียวกัน

---

## จุดที่ยังต้องตัดสินใจเพิ่มทีหลัง (ไม่ใช่ blocker ตอนนี้)
- Evolution transition effect (ตอนเปลี่ยนยุค พื้นหลัง flash/fade) — รอทำหลัง MVP นี้เสร็จ
- จำนวน particle สูงสุดที่ยอมให้แสดงพร้อมกันตอนคลิกรัว — ขึ้นอยู่กับผล performance test ใน Step 13
- Teaser แบบเงาๆ ก่อนปลดล็อก shop/upgrade ตัวถัดไป — ยังไม่ได้ลงรายละเอียดว่าจะทำเป็น silhouette CSS filter หรือรูปแยก
