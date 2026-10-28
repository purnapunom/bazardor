import Link from "next/link";
import { price, toBn, unitBn } from "@/lib/utils";

export default function ProductCard({ p }) {
  const dir = p.change?.dir, pct = p.change?.pct ?? 0;
  const badge = dir === "up" ? "bg-green-100 text-green-700" : dir === "down" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600";
  const sign = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  return (
    <Link href={`/product/${p.slug}`} className="block rounded-xl border border-base-300 p-4 hover:border-primary hover:shadow-md transition">
      <div className="text-4xl">{p.image}</div>
      <h3 className="font-semibold text-lg mt-2">{p.nameBn}</h3>
      <p className="text-sm opacity-60">{unitBn(p.unit)}</p>
      <div className="flex items-end justify-between mt-3">
        <div>
          <p className="text-xs opacity-60">আজকের দাম</p>
          <p className="font-bold text-xl">{price(p.today)} টাকা</p>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-sm font-medium ${badge}`}>{sign} {toBn(pct.toFixed(1))}%</span>
      </div>
    </Link>
  );
}
