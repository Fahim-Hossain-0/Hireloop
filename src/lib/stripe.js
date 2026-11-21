import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  seeker_Pro: "price_1UbLRmRr7oQNU3DweDpK2jUJ",
  seeker_Premium: "price_1UbLxoRr7oQNU3DwkaeOubk9",
  recruiter_Growth: "price_1UbLyBRr7oQNU3DwjNpEiUoR",
  recruiter_Enterprise: "price_1UbLyWRr7oQNU3DwoxqaNL2F",
};
