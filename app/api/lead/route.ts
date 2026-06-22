import { NextResponse } from "next/server";
import { checkoutSchema } from "@/lib/schema";
import { createSessionId } from "@/lib/bale/context";

const TOKEN = process.env.BALE_BOT_TOKEN!;
const CHANNEL = process.env.BALE_CHANNEL!;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      console.log(parsed.error.format());

      return NextResponse.json(
        { success: false, error: "Invalid form data" },
        { status: 400 }
      );
    }

    const {
      fullName,
      phone,
      city,
      address,
      note,
      email,
      items = [],
      total = 0,
      productTitle,
      brand,
    } = parsed.data;

    const sessionId = createSessionId();

    const itemsText = items
      .map(
        (i) =>
          `- ${i.name} x${i.quantity} = ${i.price * i.quantity}`
      )
      .join("\n");

    const caption = `
📥 سفارش جدید
🆔 ${sessionId}

👤 نام: ${fullName}
📱 موبایل: ${phone}
📧 ایمیل: ${email || "-"}
🏙 شهر: ${city}
📍 آدرس: ${address}

📦 سفارش:
${itemsText || "-"}

💰 جمع کل: ${total}

📝 توضیحات: ${note || "-"}

🏪 فروشگاه: ${brand || "-"}
📦 محصول: ${productTitle || "-"}
`;

    const res = await fetch(
      `https://tapi.bale.ai/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHANNEL,
          text: caption,
        }),
      }
    );

    const baleResult = await res.json();

    if (!res.ok || baleResult?.ok === false) {
      return NextResponse.json(
        { success: false, error: "Bale API error" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      sessionId,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}