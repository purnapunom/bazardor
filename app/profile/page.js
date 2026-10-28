"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function Profile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  useEffect(() => {
    if (!isPending && !session) { toast.error("প্রোফাইল দেখতে সাইন ইন করুন"); router.replace("/signin"); }
  }, [isPending, session, router]);
  if (isPending || !session) return <div className="max-w-md mx-auto px-4 py-12"><div className="skeleton h-48" /></div>;
  const u = session.user;
  return (
    <div className="max-w-md mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-6">আমার প্রোফাইল</h1>
      <div className="rounded-xl border border-base-300 p-6">
        {u.image ? <img src={u.image} alt="" className="w-20 h-20 rounded-full mx-auto" /> : <div className="w-20 h-20 rounded-full bg-primary text-white text-3xl grid place-items-center mx-auto">{u.name?.[0]}</div>}
        <p className="text-xl font-semibold mt-3">{u.name}</p>
        <p className="opacity-70">{u.email}</p>
        <Link href="/profile/update" className="btn btn-primary mt-5">তথ্য আপডেট করুন</Link>
      </div>
    </div>
  );
}
