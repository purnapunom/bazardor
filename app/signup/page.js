"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUp() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = f.get("name").trim(), email = f.get("email").trim(), password = f.get("password");
    if (!name || !email) return toast.error("নাম ও ইমেইল দিন");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    setBusy(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setBusy(false);
    if (error) return toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    await authClient.signOut();
    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন");
    router.push("/signin");
  };
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">নতুন অ্যাকাউন্ট খুলুন</h1>
      <form onSubmit={submit} className="space-y-4">
        <input name="name" placeholder="নাম" className="input input-bordered w-full" />
        <input name="email" type="email" placeholder="ইমেইল" className="input input-bordered w-full" />
        <input name="password" type="password" placeholder="পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)" className="input input-bordered w-full" />
        <button disabled={busy} className="btn btn-primary w-full">{busy ? "অপেক্ষা করুন..." : "রেজিস্টার"}</button>
      </form>
      <div className="divider">অথবা</div>
      <SocialButtons />
      <p className="mt-6 text-center text-sm">আগেই অ্যাকাউন্ট আছে? <Link href="/signin" className="link link-primary">সাইন ইন করুন</Link></p>
    </div>
  );
}
