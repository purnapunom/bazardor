import ProductCard from "./ProductCard";
export const GRID = "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
export function SkeletonGrid({ n = 8 }) {
  return (<div className={GRID}>{Array.from({ length: n }).map((_, i) => <div key={i} className="skeleton h-36 rounded-xl" />)}</div>);
}
export default function ProductGrid({ items }) {
  return (<div className={GRID}>{items.map((p) => <ProductCard key={p.id ?? p.slug} p={p} />)}</div>);
}
