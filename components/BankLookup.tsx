"use client";

import { useState } from "react";
import { BANKS, searchBanks } from "@/lib/banks";

// Top 5 by US consumer deposit share. The rest reveal on demand or via search.
const TOP_IDS = new Set(["chase", "bofa", "wells-fargo", "citi", "capital-one"]);

export function BankLookup() {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const hasQuery = query.trim().length > 0;
  const matches = hasQuery
    ? searchBanks(query)
    : showAll
    ? BANKS
    : BANKS.filter((b) => TOP_IDS.has(b.id));

  return (
    <div className="card" style={{ background: "var(--paper)" }}>
      <h3 className="serif" style={{ margin: 0 }}>
        Find your bank's official fraud page
      </h3>
      <p className="prose mt-2 text-sm" style={{ color: "var(--muted)" }}>
        Each link goes to the bank's main domain. The current fraud phone
        number lives on that page — call the number listed there, or the one
        printed on the back of your card. Don't trust phone numbers found in
        a search result.
      </p>

      <div className="mt-3">
        <input
          type="text"
          placeholder="Type your bank name (Chase, USAA, etc.)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <ul className="mt-3 flex flex-col gap-1" style={{ listStyle: "none", paddingLeft: 0 }}>
        {hasQuery && matches.length === 0 ? (
          <li className="text-sm" style={{ color: "var(--muted)" }}>
            Not in the top list. See the note below.
          </li>
        ) : (
          matches.map((b) => (
            <li key={b.id} className="flex justify-between items-center gap-3 py-1">
              <a
                href={b.fraudPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-link"
              >
                {b.name}
              </a>
              <span className="mono text-xs" style={{ color: "var(--muted)" }}>
                {new URL(b.fraudPageUrl).hostname}
              </span>
            </li>
          ))
        )}
      </ul>

      {!hasQuery && !showAll && (
        <button className="btn-ghost mt-3" onClick={() => setShowAll(true)}>
          Show all {BANKS.length} supported banks
        </button>
      )}

      <p className="prose text-xs mt-3" style={{ color: "var(--muted)", marginBottom: 0 }}>
        Don't see your bank? Type its name into a search engine with the words
        "report fraud" and only follow a link whose domain matches the bank's
        main website. Scammers buy ads on bank-name searches; the top result
        is not always real.
      </p>
    </div>
  );
}
