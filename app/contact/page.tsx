"use client";

import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target as HTMLFormElement);

    await fetch("/api/lead", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
        phone: form.get("phone"),
        email: form.get("email"),
        message: form.get("message"),
      }),
    });

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="section text-center" dir="rtl">
        <div className="card p-10">
          <h1 className="text-2xl font-bold text-green-600">
            پیام شما ارسال شد 🌿
          </h1>
          <p className="text-gray-500 mt-2">به زودی با شما تماس می‌گیریم</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section" dir="rtl">
      <div className="container-custom max-w-xl">
        <div className="card p-6 rounded-3xl">
          <h1 className="text-3xl font-bold mb-6">تماس با ما</h1>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input name="name" placeholder="نام" className="input" />
            <input name="phone" placeholder="شماره تماس" className="input" />
            <input name="email" placeholder="ایمیل" className="input" />
            <textarea name="message" placeholder="پیام شما" className="input" />

            <button disabled={loading} className="btn-primary">
              {loading ? "در حال ارسال..." : "ارسال پیام"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
