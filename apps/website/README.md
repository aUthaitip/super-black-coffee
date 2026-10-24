This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

### Website metadata

Public pages use `generateMetadata` for titles, descriptions, Thai/English keywords,
canonical URLs, Open Graph, and Twitter cards. Blog detail metadata uses the resolved
article title, excerpt, category, and cover image. Metadata is Thai because the current
language switch runs in the browser; there are no separate `/th` and `/en` URLs.

The primary canonical origin is `https://superblackcoffee.com`. Set
`NEXT_PUBLIC_SITE_URL=https://superblackcoffee.com` as a **Config** environment
variable to make it explicit; when unset, the code uses this same domain.
Rebuild after changing the domain. Configure `www.superblackcoffee.com` to redirect
to `superblackcoffee.com` in the Vercel project's Domains settings.
The website and franchise remain separate projects with separate Sanity settings.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sanity development / production

เว็บหลักใช้ project `043s7ari` ส่วน `apps/franchise` เป็นอีก project และไม่ถูกเปลี่ยน
ทั้งตัวอ่านข้อมูลหน้าเว็บและ Studio `/studio` ใช้ configuration ชุดเดียวกัน
ชื่อ Studio แสดง dataset ปัจจุบันให้ผู้แก้เนื้อหาตรวจได้ก่อน Publish

| ค่า | Local / Development | Preview (`dev`) | Production (`main`) |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `043s7ari` | `043s7ari` | `043s7ari` |
| `NEXT_PUBLIC_SANITY_DATASET` | `development` | `development` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` | `2024-01-01` | `2024-01-01` |

### สร้าง dataset และตั้ง hosting

1. ล็อกอินบัญชี Sanity ที่มีสิทธิ์จัดการ project แล้วตรวจ datasets:

   ```sh
   pnpm --filter website exec sanity login
   pnpm --filter website exec sanity datasets list --project-id 043s7ari
   ```

2. ถ้ายังไม่มี `development` ให้สร้างจาก Sanity Manage หรือ CLI:

   ```sh
   pnpm --filter website exec sanity datasets create development --project-id 043s7ari --visibility public
   ```

   เว็บนี้อ่านเนื้อหา marketing แบบ public โดยไม่มี API token จึงใช้ public dataset
   ห้ามใส่ข้อมูลส่วนตัว/ข้อความลูกค้าใน Sanity dataset นี้ หากต้องการ private dataset
   ต้องเพิ่ม server-side read token และจัดการ preview แยกก่อน
   Dataset ที่สร้างใหม่ว่างเปล่า จะไม่คัดลอก/ซิงก์เนื้อหาจาก production อัตโนมัติ
   หากต้องการเนื้อหาสำหรับทดสอบ ให้คัดลอก production ไป development หลังตรวจว่า
   ปลายทางว่าง อย่า import ทับ dataset ที่มีงานอยู่โดยไม่ตรวจข้อมูลก่อน

3. Local ใช้ `.env.local` ตามค่าคอลัมน์ Local ด้านบน แล้ว restart dev server
4. ถ้าใช้ Vercel: ตั้งตัวแปรใน Project → Settings → Environment Variables
   โดยแยกค่า Production กับ Preview/Development ตามตาราง และตั้ง Production Branch
   เป็น `main` อย่าตั้งค่า dataset เดียวให้ทุก environment จากนั้น redeploy
5. Hosting อื่น: ตั้ง `SANITY_DEPLOYMENT_ENV=preview` หรือ `production`
   ให้ตรงกับ deployment เพื่อเปิดการตรวจว่าชี้ dataset ถูกชุด
6. ใน Sanity Manage → API → CORS Origins เพิ่ม origin ของ local, Preview และ
   Production ที่จะเปิด `/studio` พร้อม credentials สำหรับ Studio login
   ใช้ origin ที่จำเป็นจริง โดยไม่เพิ่ม wildcard ครอบทุกโดเมน

โค้ดจะหยุดพร้อมข้อความที่ชัดเจนหาก project/dataset ขาดหาย หรือ environment ชี้ผิดชุด
ตรวจ Vercel ด้วย `VERCEL_ENV` ไม่ใช้ `NODE_ENV` แยก Preview เพราะทั้ง Preview และ
Production build ใช้ `NODE_ENV=production` เหมือนกัน การ build บนเครื่องยังใช้
`development` ได้ หากไม่ได้ระบุว่าเป็น live production deployment

ตัวแปร `NEXT_PUBLIC_*` ถูกฝังใน browser bundle ตอน build เปลี่ยนค่าแล้วต้อง build
และ deploy ใหม่ ห้ามนำ build ที่ทำด้วย development dataset ไป promote เป็น
production โดยไม่ build ด้วย environment ของ production ใหม่

### ตรวจสอบการแยกข้อมูล

- รัน `pnpm --filter website test:sanity` เพื่อทดสอบการตั้งค่าผิด/ถูกชุด
- เปิด local/Preview `/studio` ตรวจชื่อ `(development)` แล้วสร้างบทความทดสอบ
- ตรวจว่าเนื้อหาทดสอบอยู่ใน development และไม่ปรากฏใน production
- เปิด production `/studio` ตรวจชื่อ `(production)` ก่อนแก้ข้อมูลจริง
- เมื่อ merge `dev → main` จะย้ายเฉพาะ code/schema; เนื้อหาใน dataset ไม่ถูก merge
  หรือ Publish ข้าม dataset อัตโนมัติ

## Contact form — Google Apps Script + Google Sheets

ฟอร์มที่ `/` และ `/contact` ส่งเข้า `POST /api/contact` แล้ว server ส่งต่อไป
Apps Script โดยเก็บ URL/secret ไว้ฝั่ง server เท่านั้น แสดงสำเร็จเมื่อ Apps Script
ยืนยันว่าบันทึกในชีตแล้ว และเก็บข้อมูลในฟอร์มไว้เมื่อส่งล้มเหลว

### สคริปต์ addUser ที่ใช้งานอยู่

ตั้ง `CONTACT_APPS_SCRIPT_CONTRACT=addUser` (ค่าเริ่มต้น) สำหรับสคริปต์ที่ผู้ใช้ให้มา
เว็บจะ POST ไป `/exec?action=addUser` และส่ง `name`, `phone`, `email`,
`venuename`, `detail` โดย `venuename` เป็นหัวข้อภาษาไทยลงคอลัมน์ D
“เรื่องที่ต้องการติดต่อ” ส่วน `detail` เป็นข้อความอย่างเดียวลงคอลัมน์ E
“ข้อความของคุณ” รับผล `{ success: true }` ได้โดยไม่ต้องมี `id`
โหมดนี้ไม่ต้องตั้ง secret เพราะสคริปต์ addUser ไม่ได้ตรวจ secret

ฟอร์มยังตรวจข้อมูล เก็บข้อมูลไว้เมื่อส่งล้มเหลว และป้องกันกดส่งขณะกำลังส่ง
แต่สคริปต์ addUser เดิมไม่มีการจำกัดความถี่ การกันแถวซ้ำ การตรวจสิทธิ์ หรือแจ้งอีเมล
การลองใหม่หลัง response หายอาจสร้างแถวซ้ำได้ และหาก Web app เปิดเป็น Anyone
ฟังก์ชัน `getUsers` จะเปิดเผยข้อมูลลูกค้าทั้งชีต ควรปิดหรือเพิ่มการตรวจสิทธิ์ก่อนใช้จริง
เว็บไม่ได้เรียก `getUsers` และไม่ย้ายข้อมูลหรือเปลี่ยนหัวตารางเดิม

### สคริปต์ signed ที่ให้มาใน repo

ขั้นตอนต่อไปนี้สำหรับ `CONTACT_APPS_SCRIPT_CONTRACT=signed` เท่านั้น
ใช้กับ `apps-script/Code.gs` ซึ่งมีหัวตาราง 10 คอลัมน์และการป้องกันเพิ่มเติม
อย่ารัน setup ทับชีตห้าคอลัมน์เดิม ให้ใช้แท็บ/ชีตแยกหากจะย้ายมาใช้รูปแบบนี้

### ตั้งค่า Google Apps Script

1. เปิด [Google Sheets ปลายทาง](https://docs.google.com/spreadsheets/d/1cgDslMpl450o-x7D-dNd_HttQ4gN0Qc36Q99b7vX41c/edit)
   และตรวจว่ามีแท็บชื่อ **ชีต1** จากนั้นเข้า **Extensions → Apps Script**
2. วางโค้ดจาก `apps-script/Code.gs` หากมีโค้ดเดิม ให้ตรวจและรวมกับโค้ดเดิมก่อน
   โดยเฉพาะฟังก์ชัน `doPost` อย่าวางทับสคริปต์อื่นที่ใช้งานอยู่
3. เปิด **Project Settings → Script Properties** เพิ่ม `CONTACT_FORM_SECRET`
   เป็นค่าสุ่มอย่างน้อย 32 ตัวอักษร เช่น สร้างด้วย
   `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`
   เก็บค่านี้เป็นความลับ ไม่ใส่ใน source code หรือแชต
4. รัน `setupContactForm` และอนุญาตสิทธิ์ Google ด้วยบัญชีที่แก้ชีตได้
   สคริปต์สร้างหัวตารางเมื่อแท็บว่างเท่านั้น ถ้ามีข้อมูล/หัวตารางอื่นอยู่จะหยุด
   โดยไม่เขียนทับ ต้องจัดรูปแบบหัวตารางให้ตรงก่อน หรือใช้แท็บว่างที่ตั้งชื่อไว้
5. เลือก **Deploy → New deployment → Web app** ตั้ง **Execute as: Me**
   และ **Who has access: Anyone** แล้วคัดลอก URL ที่ลงท้าย `/exec`
   การเปิด endpoint ไม่ได้เปิดสิทธิ์อ่านชีต: สคริปต์รับเฉพาะ POST ที่มี secret
   และไม่มี GET endpoint สำหรับอ่านข้อมูล หากนโยบาย Workspace ไม่อนุญาต Anyone
   ต้องให้ผู้ดูแลตั้งค่าที่รองรับก่อน
6. คัดลอก `.env.example` เป็น `.env.local` ใน `apps/website` แล้วตั้ง
   `CONTACT_APPS_SCRIPT_URL` เป็น URL `/exec` และ `CONTACT_APPS_SCRIPT_SECRET`
   เป็นค่าเดียวกับ `CONTACT_FORM_SECRET` ใน Apps Script จากนั้น restart เว็บ
   ตั้งสองค่านี้ใน hosting ด้วยก่อน deploy
7. ถ้าแก้สคริปต์ภายหลัง ให้ **Deploy → Manage deployments → Edit → New version**
   เพื่อให้ `/exec` ใช้โค้ดใหม่ การกด Save อย่างเดียวไม่อัปเดต deployment เดิม

ไฟล์ `apps-script/appsscript.json` เป็น manifest ตัวอย่างสำหรับ V8 และ timezone
Asia/Bangkok หากมี manifest เดิม ให้รวมเฉพาะค่าที่จำเป็น อย่าทับการตั้งค่าอื่น

### แจ้งเตือนอีเมล (ตั้งเพิ่มได้)

เพิ่ม Script Property `NOTIFICATION_EMAIL` เป็นอีเมลทีม แล้วรัน
`installNotificationTrigger` หนึ่งครั้งและอนุญาตสิทธิ์ส่งอีเมล สคริปต์จะตรวจ
ข้อความรอส่งทุก 5 นาที ครั้งละไม่เกิน 5 ข้อความ โดยใช้ MailApp ของบัญชีเจ้าของ
ไม่ต้องสมัคร Resend และไม่ต้องมี PostgreSQL

สถานะในชีต:

- `not_configured`: บันทึกแล้ว แต่ยังไม่ได้ตั้งอีเมลผู้รับ
- `pending`: รอ trigger ส่งแจ้งเตือน
- `sent`: MailApp รับคำขอส่งแล้ว ให้ตรวจ inbox/จดหมายขยะด้วย
- `needs_review`: การส่งล้มเหลวหรือสถานะไม่แน่นอน ให้ทีมอ่านข้อมูลในชีต
  และตรวจอีเมลก่อนแก้สถานะกลับเป็น `pending` เพื่อไม่ส่งซ้ำ

หากโควตาอีเมลหมด ข้อความยังคงอยู่ในชีตและรอรอบถัดไป หากยังไม่เปิดอีเมลแจ้งเตือน
ทีมต้องเปิดชีตตรวจข้อความเอง การส่งฟอร์มสำเร็จหมายถึง **บันทึกลงชีตสำเร็จ**
ไม่ใช่การรับประกันว่าอีเมลถึง inbox แล้ว

### การป้องกันและข้อจำกัด

- ตรวจข้อมูลทั้ง Next.js API และ Apps Script พร้อม honeypot และจำกัดขนาดคำขอ
- ใช้ Script Lock ครอบการตรวจ/เพิ่มแถว ป้องกัน concurrent writes และข้อมูลซ้ำ
- Request ID เดิมกับข้อมูลเดิมไม่เพิ่มแถวใหม่ ถ้าข้อมูลต่างกันจะปฏิเสธ
  หน้าเว็บเก็บ ID ระหว่างลองส่งซ้ำ แต่การ reload เริ่มคำขอใหม่
- จำกัด 3 ข้อความต่ออีเมล และรวม 100 ข้อความต่อ 15 นาที จากข้อมูลในชีต
  เป็นการป้องกันสแปมพื้นฐาน ไม่ใช่ CAPTCHA
- เบอร์โทรเก็บเป็นข้อความ และ escape ค่าที่อาจถูกตีความเป็นสูตรในชีต
- อย่าแก้คอลัมน์ Request ID, Payload hash, Received at ระหว่างใช้งาน เพราะใช้
  ตรวจข้อมูลซ้ำและความถี่ ห้ามเปิดชีตเป็นสาธารณะเนื่องจากมีข้อมูลลูกค้า
- สคริปต์นี้เหมาะกับฟอร์มปริมาณไม่สูง เพราะอ่านแถวเดิมเพื่อตรวจการส่งซ้ำ
  Google Apps Script/Sheets/MailApp มีโควตาและเวลาเริ่มทำงานที่ผันแปร
- ทดสอบบนชีตสำเนาและ deployment แยกสำหรับ Preview โดยแก้ Spreadsheet ID
  ในสคริปต์สำเนา อย่าใช้ข้อมูลลูกค้าจริงในการทดสอบ

### ตรวจสอบก่อนเปิดจริง

ตั้งค่าแล้วลองส่งจากเว็บ ตรวจว่าชีตมีแถวครบ เบอร์โทรไม่หายเลขศูนย์นำหน้า
ลองส่งซ้ำแล้วไม่มีแถวซ้ำ และตรวจอีเมลหากเปิด notification ไว้

รัน `pnpm --filter website test:contact` เพื่อตรวจ API, adapter และ Apps Script
โดยจำลอง Google services ไม่เขียนชีตหรือส่งอีเมลจริง การทดสอบนี้ไม่แทนการตรวจ
deployment `/exec`, สิทธิ์บัญชี Google และการส่งลงชีตจริงหลังตั้งค่า
