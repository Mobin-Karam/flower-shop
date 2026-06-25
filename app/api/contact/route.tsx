import { NextResponse } from "next/server";
import { contactSchema } from "../../../lib/schema";
import { createSessionId } from "../../../lib/bale/context";

const TOKEN = process.env.BALE_BOT_TOKEN!;
const CHANNEL = process.env.BALE_SELL_CHANNEL!;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      console.error(parsed.error.format());

      return NextResponse.json(
        {
          success: false,
          error: "Invalid form data",
        },
        {
          status: 400,
        },
      );
    }

    const { name, phone, email, message } = parsed.data;

    const sessionId = createSessionId();

    const caption = `
📩 پیام جدید از فرم تماس

🆔 ${sessionId}

👤 نام: ${name}
📱 موبایل: ${phone}
📧 ایمیل: ${email || "-"}

📝 پیام:
${message}
`;

    const res = await fetch(`https://tapi.bale.ai/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHANNEL,
        text: caption,
      }),
    });

    const baleResult = await res.json();

    if (!res.ok || baleResult?.ok === false) {
      console.error(baleResult);

      return NextResponse.json(
        {
          success: false,
          error: "Bale API error",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      success: true,
      sessionId,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Server error",
      },
      {
        status: 500,
      },
    );
  }
}
