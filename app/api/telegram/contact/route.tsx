import { NextResponse } from "next/server";
import { contactSchema } from "../../../../lib/schema";
import { createSessionId } from "../../../../lib/bale/context";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHANNEL = process.env.TELEGRAM_CONTACT_CHANNEL!;

const BALE_TOKEN = process.env.BALE_BOT_TOKEN!;
const BALE_CHANNEL = process.env.BALE_CONTACT_CHANNEL!;

function buildCaption(data: any, sessionId: string) {
  const { name, phone, email, message } = data;

  return `
📩 پیام جدید از فرم تماس

🆔 ${sessionId}

👤 نام: ${name}
📱 موبایل: ${phone}
📧 ایمیل: ${email || "-"}

📝 پیام:
${message}
`.trim();
}

async function sendTelegram(text: string) {
  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHANNEL,
        text,
      }),
    },
  );

  const data = await res.json();
  return { ok: res.ok && data?.ok, data };
}

async function sendBale(text: string) {
  const res = await fetch(`https://tapi.bale.ai/bot${BALE_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: BALE_CHANNEL,
      text,
    }),
  });

  const data = await res.json();
  return { ok: res.ok && data?.ok, data };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid form data" },
        { status: 400 },
      );
    }

    const sessionId = createSessionId();
    const caption = buildCaption(parsed.data, sessionId);

    // run both in parallel
    const [telegramRes, baleRes] = await Promise.all([
      sendTelegram(caption),
      sendBale(caption),
    ]);

    // optional strict mode: fail if any fails
    const allOk = telegramRes.ok && baleRes.ok;

    if (!allOk) {
      console.error({
        telegram: telegramRes.data,
        bale: baleRes.data,
      });

      return NextResponse.json(
        {
          success: false,
          error: "One or more messaging providers failed",
          details: {
            telegram: telegramRes.ok,
            bale: baleRes.ok,
          },
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      sessionId,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
