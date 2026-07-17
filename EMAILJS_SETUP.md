# UZ GROW EmailJS To'liq Sozlamlari

## EmailJS hisobini yarating (Muhim!)

1. [EmailJS.com](https://www.emailjs.com/) saytiga kirib ro'yxatdan o'ting
2. Email Service yarating (masalan: Gmail, Outlook, va h.k.)
3. Email template yarating

## QADAMMA-QADAM SOZLASH

### 1. Email Service yarating

- EmailJS dashboard → Email Services → Add New Service
- **Gmail** tanlang (eng oson)
- O'z Gmail emailingiz ulang
- Service ID ni oling (masalan: `service_abc123`)

### 2. Email Template yarating

- EmailJS dashboard → Email Templates → Create New Template
- **Template Name**: "UZ GROW Contact Form"
- **Subject**: "Yangi xabar - UZ GROW dan"
- **Content** quyidagicha bo'lishi kerak:

```
{{from_name}} dan yangi xabar

📧 Email: {{from_email}}
📞 Telefon: {{from_phone}}
🏢 Xizmat turi: {{service}}
📝 Xabar:
{{message}}

---
UZ GROW Contact Form
```

### 3. Public Key olish

- EmailJS dashboard → Account → API Keys
- Public key ni oling (masalan: `abc123def456ghi789`)

## KODNI YANILANG

`components/contact.tsx` faylida quyidagi qatorlarni HAQIQIY credentials bilan yangilang:

```typescript
// QATOR 141-144 ni yangilang
await emailjs.send(
  "service_abc123", // BU YERGA O'Z Service ID INIZNI KIRITING
  "template_abc123", // BU YERGA O'Z Template ID INIZNI KIRITING
  templateParams,
  "abc123def456ghi789", // BU YERGA O'Z Public Key INIZNI KIRITING
);
```

## TEST QILISH

### 1. EmailJS ishlashini tekshiring

```javascript
// Browser console da tekshiring
console.log("EmailJS loaded:", typeof emailjs !== "undefined");
```

### 2. Formni to'ldiring

1. Ism: "Test User"
2. Email: o'z emailingiz
3. Telefon: "+998901234567"
4. Xizmat: "Turnkey issiqxona qurish"
5. Xabar: "Bu test xabar"

### 3. Emailni tekshiring

- **Spam** qutisini ham tekshiring
- **Promotions** qutisini tekshiring
- Email kelmasa, console da xatolik borligini tekshiring

## MUAMMOLAR VA YO'LLAR

### Agar xabar kelmadi:

1. **EmailJS credentials** to'g'ri ekanligini tekshiring
2. **Gmail ulanishi** to'g'ri ekanligini tekshiring
3. **Template variable lar** to'g'ri ekanligini tekshiring
4. **Browser console** da xatoliklarni tekshiring

### Console xatoliklari:

```javascript
// Agar quyidagi xatolik bo'lsa:
// "EmailJS is not defined"
// Package ni to'g'ri o'rnatganingizni tekshiring:
npm install @emailjs/browser
```

### Gmail muammolari:

- Gmail xavfsizlik sozlamalarini tekshiring
- "Less secure app access" ni yoqing (agar kerak bo'lsa)
- EmailJS dan Gmail ulanishni qayta sozlang

## MUVOFFAQIYATLI SOZLASH

Agar hamma narsa to'g'ri bo'lsa:

- ✅ Formdan yuborilgan xabarlar **uzgrrow@gmail.com** ga keladi
- ✅ Success message ko'rsatiladi
- ✅ Form ma'lumotlari tozalab tashlanadi
- ✅ Barcha ma'lumotlar to'g'ri formatda keladi

## QO'SHIMCHA MASLAHATLAR

- **Test qiling**: O'zingizga xabar yuboring
- **Spamni tekshiring**: Ba'zida spam qutisiga tushishi mumkin
- **Backup**: Ikkinchi email service qo'shing
- **Monitoring**: EmailJS dashboard dan statistikani kuzating

## Ijtimoiy tarmoqlar (Haqiqiy UZ GROW linklari)

UZ GROW Taplink dan olingan haqiqiy ijtimoiy tarmoqlari:

- **YouTube**: https://youtube.com/@rustamjonrakhmonov?si=9-OxlFiY0B875tD9
- **Instagram**: https://www.instagram.com/uz.grow?igsh=MXMwN3lzaW95NTN1YQ==
- **Facebook**: https://www.facebook.com/share/1DePjLwX79/
- **TikTok**: https://www.tiktok.com/@uz.grow
- **Telegram**: http://t.me/Uz_Grow
- **Website**: http://uzgrow.uz

## Kontakt ma'lumotlari (Haqiqiy)

- **Telefon**: +998 55 515 22 23
- **WhatsApp**: +998 99 435 23 13
- **Email**: uzgrrow@gmail.com
- **Location**: Toshkent, O'zbekiston (Yandex xarita)
