import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: any;

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default getStripe;