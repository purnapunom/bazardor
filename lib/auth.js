import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null;
const url = process.env.BETTER_AUTH_URL || prod || "http://localhost:3000";

const globalForMongo = globalThis;
const client = globalForMongo._mongoClient || new MongoClient(process.env.MONGODB_URI);
if (process.env.NODE_ENV !== "production") globalForMongo._mongoClient = client;

const socialProviders = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
  socialProviders.google = { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET };
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)
  socialProviders.github = { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET };

export const auth = betterAuth({
  baseURL: url,
  trustedOrigins: [url, prod, process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null, "http://localhost:3000"].filter(Boolean),
  database: mongodbAdapter(client.db("bazardor"), { client }),
  emailAndPassword: { enabled: true },
  socialProviders,
});