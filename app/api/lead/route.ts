import { NextResponse } from "next/server";
import { checkoutSchema } from "../../../lib/schema";
import { createSessionId } from "../../../lib/bale/context";

const TOKEN = process.env.BALE_BOT_TOKEN!;
const CHANNEL = process.env.BALE_CHANNEL!;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid form data" },
        { status: 400 },
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

    /**
     * Normalize items safely for BOTH:
     * - simple products
     * - variant products
     */
    const safeItems = items.map((i: any) => {
      const unitPrice = i.unitPrice ?? i.price ?? 0;

      const quantity = i.quantity ?? 1;

      return {
        name: i.name ?? "Unknown",
        variantName: i.variantName ?? "",
        unitPrice,
        quantity,
        lineTotal: unitPrice * quantity,
      };
    });

    const itemsText =
      safeItems.length > 0
        ? safeItems
            .map((i) => {
              const variant = i.variantName ? ` (${i.variantName})` : "";

              return `- ${i.name}${variant} x${i.quantity} = ${i.lineTotal}`;
            })
            .join("\n")
        : "-";

    const caption = `ORDER RECEIVED
ID: ${sessionId}

Name: ${fullName}
Phone: ${phone}
Email: ${email || "-"}
City: ${city}
Address: ${address}

Items:
${itemsText}

Total: ${total}

Note: ${note || "-"}

Brand: ${brand || "-"}
Product: ${productTitle || "-"}`;

    const res = await fetch(`https://tapi.bale.ai/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHANNEL,
        text: caption,
      }),
    });

    const data = await res.json();

    if (!res.ok || data?.ok === false) {
      return NextResponse.json(
        { success: false, error: "Messaging API failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      sessionId,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
