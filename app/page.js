"use client";
import { useApi, list } from "@/lib/api";
import ProductGrid, { SkeletonGrid } from "@/components/ProductGrid";

function Section({ id, title, sub, loading, items }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 pt-12">
      <h2 className="text-2xl font-bold">{title}</h2>
      {sub ? <p className="opacity-70 mb-5">{sub}</p> : <div className="mb-5" />}
      {loading ? <SkeletonGrid n={6} /> : <ProductGrid items={items} />}
    </section>
  );
}

export default function Home() {
  const { data, loading, error } = useApi("/products");
  const all = list(data);
  const risers = all.filter((p) => p.change?.dir === "up").sort((a, b) => b.change.pct - a.change.pct).slice(0, 6);
  const fallers = all.filter((p) => p.change?.dir === "down").sort((a, b) => b.change.pct - a.change.pct).slice(0, 6);

  return (
    <>
      <section className="bg-base-200">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-secondary font-semibold">আজকের বাজার, এক নজরে</p>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight mt-2">নিত্যপ্রয়োজনীয় পণ্যের সঠিক দাম জেনে বাজারে যান</h1>
            <p className="mt-4 opacity-75 max-w-md">চাল, ডাল, সবজি, মাছ ও মাংসের আজকের দাম এবং গতকালের তুলনায় কতটা বদলেছে, সব এক জায়গায়।</p>
            <a href="#সব-পণ্য" className="btn btn-primary mt-6">সব পণ্যের দাম দেখুন</a>
          </div>
          <img src="/bazar-hero.png" alt="সবজির ঝুড়ি" className="w-full max-w-sm mx-auto" />
        </div>
      </section>

      {error && <p className="max-w-6xl mx-auto px-4 pt-10 text-error">ডেটা লোড করা যায়নি। পেজ রিফ্রেশ করে আবার চেষ্টা করুন।</p>}
      <Section title="আজ দাম বেড়েছে ▲" loading={loading} items={risers} />
      <Section title="আজ দাম কমেছে ▼" loading={loading} items={fallers} />
      <Section id="সব-পণ্য" title="সব পণ্য" sub="বাজারে পাওয়া সব নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম" loading={loading} items={all} />
    </>
  );
}
