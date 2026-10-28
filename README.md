# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, দামের ওঠানামা এবং বিভিন্ন বাজারের তুলনা এক জায়গায় দেখার ওয়েব অ্যাপ।

**Live:** _(deploy করার পর লিংক বসান)_

## Technologies
Next.js (App Router) · React · Tailwind CSS · DaisyUI · BetterAuth · MongoDB · react-hot-toast

## Features
1. লাইভ প্রাইস টিকার (অসীম মার্কি) ও আজকের বাংলা তারিখ
2. দাম বাড়া ও কমার টপ ৬ পণ্যের আলাদা সেকশন
3. ক্যাটাগরি পেজে সংখ্যাগত মান অনুযায়ী সাজানো ও স্কেলিটন লোডার
4. BetterAuth দিয়ে ইমেইল/পাসওয়ার্ড, Google ও GitHub লগইন, প্রোটেক্টেড ডিটেইলস পেজ
5. বাজারভিত্তিক সর্বনিম্ন, সর্বোচ্চ ও গড় দামের বিস্তারিত পেজ
6. প্রোফাইল ও নাম আপডেট, সব ডিভাইসে রেসপন্সিভ ডিজাইন, ৪০৪ পেজ

## Run locally
```bash
cp .env.example .env.local   # fill in values
npm install
npm run dev
```
OAuth callback: `{BETTER_AUTH_URL}/api/auth/callback/google` ও `/github`.
