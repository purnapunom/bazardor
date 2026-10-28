"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignIn() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = f.get("email").trim(), password = f.get("password");
    if (!email || !password) return toast.error("ইমেইল ও পাসওয়ার্ড দিন");
    setBusy(true);
    const { error } = await authClient.signIn.email({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push("/");
  };
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">সাইন ইন করুন</h1>
      <form onSubmit={submit} className="space-y-4">
        <input name="email" type="email" placeholder="ইমেইল" className="input input-bordered w-full" />
        <input name="password" type="password" placeholder="পাসওয়ার্ড" className="input input-bordered w-full" />
        <button disabled={busy} className="btn btn-primary w-full">{busy ? "অপেক্ষা করুন..." : "সাইন ইন"}</button>
      </form>
      <div className="divider">অথবা</div>
      <SocialButtons />
      <p className="mt-6 text-center text-sm">অ্যাকাউন্ট নেই? <Link href="/signup" className="link link-primary">সাইন আপ করুন</Link></p>
    </div>
  );
}
