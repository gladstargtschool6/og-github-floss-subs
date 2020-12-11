import { useRouter } from 'next/router';
import { useState } from 'react';
import { postData } from '../utils/helpers';
import { getStripe } from '../utils/initStripejs';
import { useUser } from '../components/UserContext';
import ProductCard from './ProductCard';

export default function Pricing({ products }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { session, userLoaded } = useUser();
  const handleCheckout = async (price, quantity) => {
    setLoading(true);
    if (!session) {
      router.push('/signin');
      return;
    }

    const { sessionId, error: apiError } = await postData({
      url: '/api/createCheckoutSession',
      data: { price, quantity },
      token: session.access_token
    });
    if (apiError) return alert(apiError.message);
    const stripe = await getStripe();
    const { error: stripeError } = stripe.redirectToCheckout({ sessionId });
    if (stripeError) alert(error.message);
    setLoading(false);
  };
  return (
    <section>
      <div className="max-w-6xl mx-auto py-6 sm:py-18 px-2 lg:px-8 lg:pl-1">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Product Page
          </h1>
          <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto">
            We partnered with Stripe for simplified billing.
            <br />
            Start building for free
          </p>
          <div className="relative self-center mt-6 bg-primary-2 rounded-lg p-0.5 flex sm:mt-8 border border-accents-0"></div>
        </div>
        <div className="mt-12 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
          {products.map((product) => {
            const price = product.prices[0];
            let quantity = 0;
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency,
              minimumFractionDigits: 0
            }).format(price.unit_amount / 100);
            return (
              < ProductCard key={product.id} product={product} price={price} priceString={priceString} quantity={quantity} userLoaded={userLoaded} loading={loading} session={session} handleCheckout={handleCheckout} />
            );
          })}
        </div>
        <div>
          <p className="mt-24 text-xs uppercase text-accents-3 text-center font-bold tracking-widest">
            Brought to you by
          </p>
          <div className="flex flex-col items-center my-12 space-y-4 sm:mt-8 sm:space-y-0 md:mx-auto md:max-w-2xl sm:grid sm:gap-6 sm:grid-cols-5">
            <div className="flex items-center justify-start">
              <a href="https://nextjs.org" aria-label="Next.js Link">
                <img
                  src="/nextjs.svg"
                  alt="Next.js Logo"
                  className="h-12 text-primary"
                />
              </a>
            </div>
            <div className="flex items-center justify-start">
              <a href="https://vercel.com" aria-label="Vercel.com Link">
                <img
                  src="/vercel.svg"
                  alt="Vercel.com Logo"
                  className="h-6 text-primary"
                />
              </a>
            </div>
            <div className="flex items-center justify-start">
              <a href="https://stripe.com" aria-label="stripe.com Link">
                <img
                  src="/stripe.svg"
                  alt="stripe.com Logo"
                  className="h-12 text-primary"
                />
              </a>
            </div>
            <div className="flex items-center justify-start">
              <a href="https://supabase.io" aria-label="supabase.io Link">
                <img
                  src="/supabase.svg"
                  alt="supabase.io Logo"
                  className="h-10 text-primary"
                />
              </a>
            </div>
            <div className="flex items-center justify-start">
              <a href="https://github.com" aria-label="github.com Link">
                <img
                  src="/github.svg"
                  alt="github.com Logo"
                  className="h-8 text-primary"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
