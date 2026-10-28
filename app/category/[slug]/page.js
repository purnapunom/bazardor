"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useApi, list } from "@/lib/api";
import { sortProducts } from "@/lib/utils";
import ProductGrid, { SkeletonGrid } from "@/components/ProductGrid";
import NotFoundBlock from "@/components/NotFoundBlock";

export default function CategoryPage() {
  const { slug } = useParams();
  const [sort, setSort] = useState("default");
  const cats = useApi("/categories");
  const prods = useApi(`/products?category=${encodeURIComponent(slug)}`);
  const cat = list(cats.data).find((c) => c.slug === slug);
  const items = sortProducts(list(prods.data), sort);

  if (!prods.loading && !cats.loading && (!cat || items.length === 0))
    return <NotFoundBlock title="এই ক্যাটাগরিতে কোনো পণ্য নেই" text="ক্যাটাগরিটি ঠিক নেই, অথবা এখানে এখনও কোনো পণ্য যোগ হয়নি।" />;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-3xl font-bold">{cat ? `${cat.icon} ${cat.nameBn}` : <span className="skeleton h-9 w-40 inline-block" />}</h1>
        <label className="flex items-center gap-2 text-sm">
          সাজান:
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="select select-bordered select-sm sm:select-md">
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      {prods.loading ? <SkeletonGrid /> : <ProductGrid items={items} />}
    </div>
  );
}
