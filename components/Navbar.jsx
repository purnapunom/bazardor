"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useApi, list } from "@/lib/api";
import { bnDate } from "@/lib/utils";

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { data } = useApi("/categories");
  const [date, setDate] = useState("");
  useEffect(() => setDate(bnDate()), []);
  const user = session?.user;

  const signOut = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
  };
  const link = (active) => `px-3 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${active ? "bg-primary text-white" : "hover:bg-base-200"}`;

  return (
    <header className="sticky top-0 z-40 bg-base-100 border-b border-base-300">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 leading-tight">
          <img src="/logo-icon.png" alt="" className="w-9 h-9" />
          <span>
            <span className="block font-bold text-lg">বাজার দর</span>
            <span className="block text-xs opacity-60 min-h-4">{date}</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link href="/profile" className="btn btn-sm sm:btn-md btn-ghost">{user.name?.split(" ")[0] || "প্রোফাইল"}</Link>
              <button onClick={signOut} className="btn btn-sm sm:btn-md btn-outline btn-primary">সাইন আউট</button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm sm:btn-md btn-ghost">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-sm sm:btn-md btn-primary">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>
      <nav className="max-w-6xl mx-auto px-4 pb-2 flex gap-1 overflow-x-auto">
        <Link href="/" className={link(path === "/")}>সব</Link>
        {list(data).map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}`} className={link(path === `/category/${c.slug}`)}>
            {c.icon} {c.nameBn}
          </Link>
        ))}
      </nav>
    </header>
  );
}
