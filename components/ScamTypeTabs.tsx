"use client";

import { useState } from "react";

type TabId = "calls" | "channels";

export function ScamTypeTabs({
  calls,
  channels,
}: {
  calls: React.ReactNode;
  channels: React.ReactNode;
}) {
  const [tab, setTab] = useState<TabId>("calls");

  const tabBtn = (id: TabId, label: string) => {
    const active = tab === id;
    return (
      <button
        role="tab"
        aria-selected={active}
        onClick={() => setTab(id)}
        style={{
          background: "transparent",
          border: "none",
          borderBottom: `2px solid ${active ? "var(--accent)" : "transparent"}`,
          cursor: "pointer",
          fontFamily: "var(--font-serif)",
          fontSize: "1.1rem",
          fontWeight: 500,
          color: active ? "var(--accent)" : "var(--muted)",
          padding: "0.6rem 0.2rem",
          marginBottom: "-1px",
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div>
      <div
        role="tablist"
        className="flex gap-6"
        style={{ borderBottom: "1px solid var(--rule)" }}
      >
        {tabBtn("calls", "Calls to make first")}
        {tabBtn("channels", "Channels in priority order")}
      </div>
      <div className="mt-5">{tab === "calls" ? calls : channels}</div>
    </div>
  );
}
