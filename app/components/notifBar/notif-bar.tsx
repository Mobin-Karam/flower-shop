"use client";

import { X } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

type Props = {
  text?: string;
  background?: string; // CSS color or gradient
  textColor?: string;
  closable?: boolean;
  children?: ReactNode;
};

export default function AnnouncementBanner({
  text,
  background = "#111827",
  textColor = "#fff",
  closable = true,
  children,
}: Props) {
  const [visible, setVisible] = useState<boolean>(true);

  if (!visible) return null;

  return (
    <div
      className="w-full px-4 py-2 text-sm flex items-center justify-center relative"
      style={{ background, color: textColor }}
    >
      <span className="text-center">{text}</span>

      {children}

      {closable && (
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
          aria-label="Close banner"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
