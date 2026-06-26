"use client";

import { useGlobalLoading } from "@/app/store/loading-store";

export function GlobalLoadingOverlay() {
  const isLoading = useGlobalLoading((s) => s.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/40">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />
    </div>
  );
}
