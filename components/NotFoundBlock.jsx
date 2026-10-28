import Link from "next/link";
export default function NotFoundBlock({ title = "পাতাটি খুঁজে পাওয়া যায়নি", text = "আপনি যে ঠিকানাটি খুঁজছেন তা নেই বা সরানো হয়েছে।" }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl font-bold text-primary">৪০৪</p>
      <h1 className="text-2xl font-bold mt-3">{title}</h1>
      <p className="opacity-70 mt-2">{text}</p>
      <Link href="/" className="btn btn-primary mt-6">হোম পেজে ফিরে যান</Link>
    </div>
  );
}
