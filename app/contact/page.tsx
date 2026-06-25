"use client";

import { useMemo, useState } from "react";

type Errors = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

function validate(
  name: string,
  phone: string,
  email: string,
  message: string,
): Errors {
  const errors: Errors = {};

  if (!name || name.trim().length < 3) {
    errors.name = "نام باید حداقل ۳ کاراکتر باشد";
  }

  if (!phone || phone.trim().length < 8) {
    errors.phone = "شماره تماس معتبر نیست";
  }

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "ایمیل معتبر نیست";
  }

  if (!message || message.trim().length < 10) {
    errors.message = "پیام باید حداقل ۱۰ کاراکتر باشد";
  }

  return errors;
}

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const isValid = useMemo(() => {
    return (
      Object.keys(
        validate(values.name, values.phone, values.email, values.message),
      ).length === 0
    );
  }, [values]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const clientErrors = validate(
      values.name,
      values.phone,
      values.email,
      values.message,
    );

    setErrors(clientErrors);

    if (Object.keys(clientErrors).length > 0) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Request failed");

      setValues({ name: "", phone: "", email: "", message: "" });
      setSent(true);
    } catch (err: any) {
      setError(err.message || "خطا در ارسال پیام");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="text-xl font-semibold">پیام ارسال شد</h1>
          <p className="text-sm text-muted-foreground mt-2">
            به زودی پاسخ داده می‌شود
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="rounded-2xl border border-border bg-card p-6">
          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">تماس با ما</h1>
            <p className="text-sm text-muted-foreground mt-1">
              قبل از ارسال، فرم را کامل کنید
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NAME */}
            <div>
              <input
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                placeholder="نام"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              {errors.name && (
                <p className="text-xs text-destructive mt-1">{errors.name}</p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <input
                value={values.phone}
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
                placeholder="شماره تماس"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              {errors.phone && (
                <p className="text-xs text-destructive mt-1">{errors.phone}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <input
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                placeholder="ایمیل (اختیاری)"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            {/* MESSAGE */}
            <div>
              <textarea
                value={values.message}
                onChange={(e) =>
                  setValues({ ...values, message: e.target.value })
                }
                placeholder="پیام شما"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm min-h-[140px] outline-none focus:ring-2 focus:ring-primary/30"
              />
              {errors.message && (
                <p className="text-xs text-destructive mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* SUBMIT */}
            <button
              disabled={loading || !isValid}
              className="w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-medium transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "در حال ارسال..." : "ارسال پیام"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
