"use client";
import { useEffect, useState } from "react";
const BASE = process.env.NEXT_PUBLIC_API_URL || "https://openapi.programming-hero.com/api/bazardor";

export const list = (d) => {
  if (!d) return [];
  if (Array.isArray(d)) return d;
  const x = d.data ?? d.products ?? d.categories ?? d.items;
  if (Array.isArray(x)) return x;
  if (x && typeof x === "object") return [x];
  return d.slug ? [d] : [];
};

export function useApi(path) {
  const [state, setState] = useState({ data: null, error: false });
  useEffect(() => {
    let live = true;
    setState({ data: null, error: false });
    fetch(BASE + path)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => live && setState({ data, error: false }))
      .catch(() => live && setState({ data: null, error: true }));
    return () => { live = false; };
  }, [path]);
  return { ...state, loading: !state.data && !state.error };
}
