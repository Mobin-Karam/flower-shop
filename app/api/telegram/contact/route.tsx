import { NextResponse } from "next/server";
import { contactSchema } from "../../../../lib/schema";
import { createSessionId } from "../../../../lib/bale/context";



const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHANNEL = process.env.TELEGRAM_CONTACT_CHANNEL!;

const BALE_TOKEN = process.env.BALE_BOT_TOKEN!;
const BALE_CHANNEL = process.env.BALE_CONTACT_CHANNEL!;

/* ================= BUILD MESSAGE ================= */
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

/* ================= TELEGRAM ================= */
async function sendTelegram(text: string) {
  try {
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

    return {
      success: res.ok && data?.ok,
      data,
    };
  } catch (error) {
    return { success: false, error };
  }
}

/* ================= BALE ================= */
async function sendBale(text: string) {
  try {
    const res = await fetch(
      `https://tapi.bale.ai/bot${BALE_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: BALE_CHANNEL,
          text,
        }),
      },
    );

    const data = await res.json();

    return {
      success: res.ok && data?.ok,
      data,
    };
  } catch (error) {
    return { success: false, error };
  }
}

/* ================= API ================= */
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

    const results = await Promise.allSettled([
      sendTelegram(caption),
      sendBale(caption),
    ]);

    const telegram =
      results[0].status === "fulfilled" ? results[0].value : { success: false };

    const bale =
      results[1].status === "fulfilled" ? results[1].value : { success: false };

    if (!telegram.success && !bale.success) {
      console.error({ telegram, bale });

      return NextResponse.json(
        {
          success: false,
          error: "All providers failed",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      sessionId,
      delivered: {
        telegram: telegram.success,
        bale: bale.success,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
