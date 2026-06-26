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
      ok: res.ok && data?.ok,
      data,
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
}

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
      ok: res.ok && data?.ok,
      data,
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
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

    /**
     * IMPORTANT: non-blocking multi-provider execution
     */
    const results = await Promise.allSettled([
      sendTelegram(caption),
      sendBale(caption),
    ]);

    const telegram =
      results[0].status === "fulfilled"
        ? results[0].value
        : { ok: false, error: results[0].reason };

    const bale =
      results[1].status === "fulfilled"
        ? results[1].value
        : { ok: false, error: results[1].reason };

    /**
     * At least one must succeed
     */
    if (!telegram.ok && !bale.ok) {
      console.error({ telegram, bale });

      return NextResponse.json(
        {
          success: false,
          error: "Both messaging providers failed",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      sessionId,
      delivered: {
        telegram: telegram.ok,
        bale: bale.ok,
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
