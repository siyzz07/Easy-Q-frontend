
import {loadStripe} from '@stripe/stripe-js'




export const PaymentStripe = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);