<div align="center">

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে**

নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর, দামের ওঠানামা এবং বাজারভিত্তিক তুলনা — সব এক জায়গায়।

[🌐 Live Demo](https://bazardor-l1uu.vercel.app) · [💻 GitHub Repo](https://github.com/purnapunom/bazardor)

</div>

---

## 📖 About

**BazarDor** is a daily market price tracker for Bangladesh. It shows today's prices for rice, lentils, oil, vegetables, fish, meat, dairy and spices, highlights which items went up or down, and lets signed-in users compare prices across different markets and divisions.

চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম, কোন পণ্যের দাম বাড়ল বা কমল, এবং বিভিন্ন বাজারের দামের তুলনা দেখা যায় এই অ্যাপে।

## ✨ Key Features

| # | Feature | Details |
|---|---------|---------|
| 1 | 📈 **Live price ticker** | Infinite scrolling strip with emoji, name, price per unit and ▲/▼ change % |
| 2 | 🔺🔻 **Risers & fallers** | Top 6 products whose prices went up and down today |
| 3 | 🗂️ **Category pages with sorting** | Sort by default / price low→high / high→low. Prices are sorted by numeric value, and shown in Bengali digits |
| 4 | 🔐 **Authentication** | Email/password and GitHub login with BetterAuth, plus toast notifications |
| 5 | 🛡️ **Protected product details** | Min / max / average price and a market-wise price table, visible only after login |
| 6 | 👤 **Profile & update info** | View profile and update your name |
| 7 | 📱 **Fully responsive** | Works on mobile, tablet and desktop, with skeleton loaders and a custom 404 page |

## 🧰 Tech Stack

| Purpose | Technology |
|---------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | JavaScript |
| UI | React 19, Tailwind CSS, DaisyUI |
| Authentication | BetterAuth |
| Database | MongoDB Atlas |
| Notifications | react-hot-toast |
| Fonts | Hind Siliguri (Bengali) |
| Deployment | Vercel |

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/purnapunom/bazardor.git
cd bazardor

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string (include database name) |
| `BETTER_AUTH_SECRET` | Random secret, e.g. `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | `http://localhost:3000` locally, your live URL in production |
| `NEXT_PUBLIC_APP_URL` | Same as `BETTER_AUTH_URL` |
| `GITHUB_CLIENT_ID`  | Ov23lih34xscrFBncLD8 |
| `GOOGLE_CLIENT_SECRET` | 1cec498cdfd713ad151ec1022a48b63c80c0a86b |

GitHub OAuth callback URL: `{BETTER_AUTH_URL}/api/auth/callback/github`

## 📁 Project Structure

```
├── app/
│   ├── page.js                  # Home (hero, risers, fallers, all products)
│   ├── category/[slug]/         # Category page with sorting
│   ├── product/[slug]/          # Protected product details
│   ├── signin/  signup/         # Auth pages
│   ├── profile/  profile/update/
│   ├── api/auth/[...all]/       # BetterAuth route handler
│   └── not-found.js             # Custom 404
├── components/                  # Navbar, Ticker, ProductCard, Footer ...
├── lib/                         # API hook, auth, Bengali number helpers, sort
└── public/                      # Logo and hero image
```

## 🌐 Data Source

Prices are fetched live from the official project API:

- `https://openapi.programming-hero.com/api/bazardor`

Endpoints used: `/categories`, `/products`, `/products?category=chal`, `/products?slug=...`

## 👩‍💻 Author

**Purna Chakraborty** — [GitHub](https://github.com/purnapunom)

---

<div align="center">

সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।

</div>