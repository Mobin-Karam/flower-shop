import { NextResponse } from "next/server";
import { checkoutSchema } from "../../../../lib/schema";
import { createSessionId } from "../../../../lib/bale/context";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHANNEL = process.env.TELEGRAM_SELL_CHANNEL!;

const BALE_TOKEN = process.env.BALE_BOT_TOKEN!;
const BALE_CHANNEL = process.env.BALE_SELL_CHANNEL!;

/**
 * Normalize cart items
 */
function normalizeItems(items: any[]) {
  return items.map((i: any) => {
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
}

/**
 * Build order text once
 */
function buildCaption(data: any, sessionId: string, itemsText: string) {
  const {
    fullName,
    phone,
    city,
    address,
    note,
    email,
    total,
    brand,
    productTitle,
  } = data;

  return `
ORDER RECEIVED
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
Product: ${productTitle || "-"}
`.trim();
}

/**
 * Providers
 */
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

    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid form data" },
        { status: 400 },
      );
    }

    const sessionId = createSessionId();
    const data = parsed.data;

    const safeItems = normalizeItems(data.items ?? []);

    const itemsText =
      safeItems.length > 0
        ? safeItems
            .map((i) => {
              const variant = i.variantName ? ` (${i.variantName})` : "";
              return `- ${i.name}${variant} x${i.quantity} = ${i.lineTotal}`;
            })
            .join("\n")
        : "-";

    const caption = buildCaption(data, sessionId, itemsText);

    /**
     * Broadcast to both providers
     */
    const [tg, bale] = await Promise.all([
      sendTelegram(caption),
      sendBale(caption),
    ]);

    if (!tg.ok || !bale.ok) {
      console.error({
        telegram: tg.data,
        bale: bale.data,
      });

      return NextResponse.json(
        {
          success: false,
          error: "One or more messaging providers failed",
          providers: {
            telegram: tg.ok,
            bale: bale.ok,
          },
        },
        { status: 500 },
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
      { status: 500 },
    );
  }
}
