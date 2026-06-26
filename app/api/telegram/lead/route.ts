import { NextResponse } from "next/server";
import { checkoutSchema } from "../../../../lib/schema";
import { createSessionId } from "../../../../lib/bale/context";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHANNEL = process.env.TELEGRAM_SELL_CHANNEL!;

const BALE_TOKEN = process.env.BALE_BOT_TOKEN!;
const BALE_CHANNEL = process.env.BALE_SELL_CHANNEL!;

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

function buildItemsText(items: any[]) {
  return items.length
    ? items
        .map((i) => {
          const variant = i.variantName ? ` (${i.variantName})` : "";
          return `- ${i.name}${variant} x${i.quantity} = ${i.lineTotal}`;
        })
        .join("\n")
    : "-";
}

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
 * Telegram
 */
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
    return { success: res.ok && data?.ok, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

/**
 * Bale
 */
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
    return { success: res.ok && data?.ok, data };
  } catch (err) {
    return { success: false, error: err };
  }
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

    const safeItems = normalizeItems(parsed.data.items ?? []);
    const itemsText = buildItemsText(safeItems);

    const caption = buildCaption(parsed.data, sessionId, itemsText);

    /**
     * Run both independently (NO FAIL FAST)
     */
    const results = await Promise.allSettled([
      sendTelegram(caption),
      sendBale(caption),
    ]);

    const telegramResult =
      results[0].status === "fulfilled"
        ? results[0].value
        : { success: false, error: results[0].reason };

    const baleResult =
      results[1].status === "fulfilled"
        ? results[1].value
        : { success: false, error: results[1].reason };

    const telegramOk = telegramResult.success;
    const baleOk = baleResult.success;

    /**
     * At least one must succeed
     */
    if (!telegramOk && !baleOk) {
      console.error({
        telegram: telegramResult,
        bale: baleResult,
      });

      return NextResponse.json(
        {
          success: false,
          error: "All messaging providers failed",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      sessionId,
      delivered: {
        telegram: telegramOk,
        bale: baleOk,
      },
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
