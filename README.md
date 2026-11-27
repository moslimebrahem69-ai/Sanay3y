# صنايعي — Sanay3y

موقع تشخيص أعطال الأجهزة بالذكاء الاصطناعي (تكييفات، ثلاجات، غسالات، لوحات كهربائية، ماكينات...). يطلع تقرير: السلامة، الأسباب، خطوات الفحص، الأدوات، الإصلاح، التكلفة التقريبية.

**المطوّر:** مسلم إبراهيم · واتساب 01017098353

- مقالات صيانة (`/guides`) وصفحة خصوصية (`/privacy`)

## التشغيل
```bash
npm install
cp .env.example .env.local   # ضع GEMINI_API_KEY (مجاني من aistudio.google.com/apikey)
npm run dev
```

## النشر على Vercel
ارفع على GitHub، استورد المشروع في Vercel، أضف `GEMINI_API_KEY` و`NEXT_PUBLIC_SITE_URL` في Environment Variables، ثم Deploy.

## ملاحظات
- مفتاح الـ API على السيرفر فقط، مع حد 15 طلب / 10 دقائق لكل IP (في الذاكرة).
- السجل محفوظ في localStorage ولا يُرسل لأي خادم.
- لتغيير رقم واتساب أو الاسم: `lib/brand.ts`.
