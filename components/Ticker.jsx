"use client";
import { useApi, list } from "@/lib/api";
import { price, toBn, unitBn } from "@/lib/utils";

export default function Ticker() {
  const { data } = useApi("/products");
  const items = list(data);
  if (!items.length) return <div className="h-9 bg-neutral" />;
  const row = [...items, ...items];
  return (
    <div className="bg-neutral text-white overflow-hidden h-9 flex items-center" aria-label="আজকের দামের তালিকা">
      <div className="marquee flex gap-8 whitespace-nowrap w-max text-sm">
        {row.map((p, i) => {
          const up = p.change?.dir === "up", down = p.change?.dir === "down";
          return (
            <span key={i}>
              {p.image} {p.nameBn} {price(p.today)} টাকা/{unitBn(p.unit).replace("প্রতি ", "")}{" "}
              <span className={up ? "text-green-400" : down ? "text-red-400" : "text-gray-400"}>
                {up ? "▲" : down ? "▼" : "—"} {toBn((p.change?.pct ?? 0).toFixed(1))}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
