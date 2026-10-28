"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!isPending && !session) { toast.error("সাইন ইন করুন"); router.replace("/signin"); }
  }, [isPending, session, router]);
  if (isPending || !session) return <div className="max-w-md mx-auto px-4 py-12"><div className="skeleton h-40" /></div>;

  const submit = async (e) => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("name").trim();
    if (!name) return toast.error("নাম খালি রাখা যাবে না");
    setBusy(true);
    const { error } = await authClient.updateUser({ name });
    setBusy(false);
    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
  };
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">তথ্য আপডেট করুন</h1>
      <form onSubmit={submit} className="space-y-4">
        <input name="name" defaultValue={session.user.name} placeholder="নাম" className="input input-bordered w-full" />
        <button disabled={busy} className="btn btn-primary w-full">{busy ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}</button>
      </form>
    </div>
  );
}
