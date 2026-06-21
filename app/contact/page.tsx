"use client";

import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target as HTMLFormElement);

    const payload = {
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      message: form.get("message"),
      productTitle: "Contact Form",
      brand: "Gol Mohammadi Shop",
    };

    const res = await fetch("/api/lead", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (res.ok) setSent(true);

    setLoading(false);
  }

  if (sent) {
    return (
      <div className="section text-center">
        <h1 className="text-3xl font-bold text-green-600">Message Sent 🌸</h1>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container-custom max-w-xl">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input name="name" placeholder="Name" className="input" />
          <input name="phone" placeholder="Phone" className="input" />
          <input name="email" placeholder="Email" className="input" />

          <textarea name="message" placeholder="Message" className="input" />

          <button className="btn-primary" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
