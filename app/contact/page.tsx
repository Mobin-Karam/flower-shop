"use client";

import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElement = e.currentTarget;
    const form = new FormData(formElement);

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          message: form.get("message"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      formElement.reset();
      setSent(true);
    } catch (err) {
      console.error(err);
      alert("خطا در ارسال پیام");
    } finally {
      setLoading(false);
    }
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
            <input
              name="name"
              type="text"
              required
              placeholder="نام"
              className="input"
            />

            <input
              name="phone"
              type="tel"
              required
              placeholder="شماره تماس"
              className="input"
              dir="rtl"
            />

            <input
              name="email"
              type="email"
              placeholder="ایمیل"
              className="input"
            />

            <textarea
              name="message"
              required
              placeholder="پیام شما"
              className="input"
            />

            <button disabled={loading} className="btn-primary">
              {loading ? "در حال ارسال..." : "ارسال پیام"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
