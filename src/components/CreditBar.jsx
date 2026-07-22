import React, { useState, useEffect } from "react";
import { Coins, TrendingUp } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function CreditBar() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke("get-credit-usage", {});
        if (!cancelled) setData(res.data || null);
      } catch {
        if (!cancelled) setData(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#1d1e33] text-white/80 text-xs">
      <div className="max-w-6xl mx-auto px-6 py-1.5 flex items-center justify-center gap-6">
        <span className="flex items-center gap-1.5">
          <Coins className="w-3.5 h-3.5 text-[#c5a578]" />
          Balance:{" "}
          <strong className="text-white">
            {data ? (data.balance?.toLocaleString() ?? 0) : "—"}
          </strong>
        </span>
        <span className="text-white/20">|</span>
        <span className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#c5a578]" />
          Using:{" "}
          <strong className="text-white">
            {data ? (data.using?.toLocaleString() ?? 0) : "—"}
          </strong>
        </span>
      </div>
    </div>
  );
}
