"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useApi, list } from "@/lib/api";
import { price, unitBn } from "@/lib/utils";
import NotFoundBlock from "@/components/NotFoundBlock";

export default function ProductPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { data, loading } = useApi(`/products?slug=${encodeURIComponent(slug)}`);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন");
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session || loading)
    return <div className="max-w-6xl mx-auto px-4 pt-10 space-y-4"><div className="skeleton h-24" /><div className="skeleton h-40" /><div className="skeleton h-64" /></div>;

  const p = list(data)[0];
  if (!p) return <NotFoundBlock title="পণ্যটি খুঁজে পাওয়া যায়নি" />;

  const m = p.markets || [];
  const min = m.length ? Math.min(...m.map((x) => x.min)) : p.today;
  const max = m.length ? Math.max(...m.map((x) => x.max)) : p.today;
  const avg = m.length ? Math.round(m.reduce((s, x) => s + (x.min + x.max) / 2, 0) / m.length) : p.today;
  const dir = p.change?.dir;
  const stats = [["সর্বনিম্ন দাম", min], ["সর্বোচ্চ দাম", max], ["গড় দাম", avg], ["আজকের দাম", p.today]];

  return (
    <div className="max-w-6xl mx-auto px-4 pt-10">
      <div className="flex items-start gap-4">
        <div className="text-6xl">{p.image}</div>
        <div>
          <h1 className="text-3xl font-bold">{p.nameBn}</h1>
          <p className="opacity-70 mt-1">
            {p.nameBn}-এর আজকের দাম {price(p.today)} টাকা, {dir === "up" ? "গতকালের চেয়ে বেশি" : dir === "down" ? "গতকালের চেয়ে কম" : "গতকালের মতোই"}।
          </p>
          <div className="flex flex-wrap gap-2 mt-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-base-200">{p.categoryIcon} {p.categoryNameBn}</span>
            <span className="px-3 py-1 rounded-full bg-base-200">{unitBn(p.unit)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {stats.map(([l, v]) => (
          <div key={l} className="rounded-xl border border-base-300 p-4">
            <p className="text-sm opacity-60">{l}</p>
            <p className="text-2xl font-bold">{price(v)} টাকা</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 text-center text-sm">
        {[["গতকাল", p.yesterday], ["গত সপ্তাহ", p.lastWeek], ["গত মাস", p.lastMonth]].map(([l, v]) => (
          <div key={l} className="rounded-xl bg-base-200 p-3"><p className="opacity-60">{l}</p><p className="font-semibold">{price(v)} টাকা</p></div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-10 mb-3">বাজারভিত্তিক আজকের দাম</h2>
      <div className="overflow-x-auto rounded-xl border border-base-300">
        <table className="table">
          <thead><tr><th>বাজার</th><th>বিভাগ</th><th>সর্বনিম্ন</th><th>সর্বোচ্চ</th></tr></thead>
          <tbody>
            {m.map((x, i) => (
              <tr key={i}><td>{x.market}</td><td>{x.division}</td><td>{price(x.min)} টাকা</td><td>{price(x.max)} টাকা</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
