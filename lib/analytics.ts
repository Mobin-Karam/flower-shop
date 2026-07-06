type AnalyticsEvent =
  | { type: "product_view"; slug: string }
  | { type: "product_click"; slug: string; source: string }
  | { type: "add_to_cart"; slug: string; quantity: number }
  | { type: "filter_usage"; filter: string; value: string }
  | { type: "search"; term: string; resultCount: number }
  | { type: "sort"; method: string }
  | { type: "page_view"; page: string };

function track(event: AnalyticsEvent) {
  try {
    const queue: AnalyticsEvent[] = JSON.parse(
      localStorage.getItem("gulify-analytics") || "[]"
    );
    queue.push({ ...event, ...(event as any), timestamp: Date.now() } as any);
    // Keep last 100 events
    localStorage.setItem(
      "gulify-analytics",
      JSON.stringify(queue.slice(-100))
    );
  } catch {}

  // Future: send to API
  // fetch("/api/analytics", { method: "POST", body: JSON.stringify(event) });
}

export const analytics = {
  productView: (slug: string) => track({ type: "product_view", slug }),
  productClick: (slug: string, source: string) =>
    track({ type: "product_click", slug, source }),
  addToCart: (slug: string, quantity: number) =>
    track({ type: "add_to_cart", slug, quantity }),
  filter: (filter: string, value: string) =>
    track({ type: "filter_usage", filter, value }),
  search: (term: string, resultCount: number) =>
    track({ type: "search", term, resultCount }),
  sort: (method: string) => track({ type: "sort", method }),
  pageView: (page: string) => track({ type: "page_view", page }),
};
