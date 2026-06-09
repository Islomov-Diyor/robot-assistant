# PoseAI Robot-assistant

AI yordamchi robot-assistant uchun inson holatini aniqlash web tizimi. Ilova Node.js, Express, MongoDB, Mongoose, EJS, Tailwind CSS CDN va MediaPipe Pose CDN asosida ishlaydi.

## Imkoniyatlar

- Bosh sahifa: futuristik hero, CTA va imkoniyat kartalari
- Demo: kamera orqali real vaqt holat aniqlash va skelet overlay
- Robot-assistent: holat, tavsiya va davomiylik ko'rsatkichi
- Natijalar: MongoDB ga saqlash, jadval, statistika va Chart.js diagramma
- Tizim haqida: ishlash bosqichlari, texnologiyalar va blok diagramma

## Lokal ishga tushirish

```bash
npm install
cp .env.example .env
npm start
```

Brauzerda oching:

```text
http://localhost:3000
```

Namunaviy natijalar kiritish:

```bash
npm run seed
```

## Muhit o'zgaruvchilari

```env
MONGODB_URI=mongodb+srv://foydalanuvchi:parol@cluster.mongodb.net/poseai_robot
PORT=3000
```

## Bepul hostingga chiqarish

Render bepul tarifida ishga tushirish uchun:

1. GitHub repositoryni Render bilan ulang.
2. `New Web Service` tanlang.
3. Build command: `npm install`
4. Start command: `npm start`
5. Environment Variables bo'limiga `MONGODB_URI` qiymatini kiriting.

MongoDB uchun MongoDB Atlas bepul clusteridan foydalanish tavsiya etiladi.
