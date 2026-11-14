"use client";

// Eng chekka holat: asosiy layout'ning o'zi yiqilsa. O'z html/body'si bor.
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="uz">
      <body style={{ fontFamily: "system-ui, sans-serif", textAlign: "center", padding: "15vh 16px" }}>
        <h1>Xatolik yuz berdi / Произошла ошибка</h1>
        <p>Sahifani qayta yuklang. / Перезагрузите страницу.</p>
        <button type="button" onClick={reset} style={{ marginTop: 16, padding: "10px 24px" }}>
          Qayta urinish
        </button>
      </body>
    </html>
  );
}
