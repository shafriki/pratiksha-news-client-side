import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm';
import { Parallax } from 'react-parallax';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
const Payment = () => {
    return (
        <div>
            <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage="https://i.ibb.co.com/SfRz7q8/loginbg.jpg"
        bgImageAlt="the dog"
        strength={-200}
      >
        <div className="hero-overlay h-[190px] md:h-[300px] bg-opacity-60 bg-cover bg-center bg-no-repeat text-[#02faee]">
          <div className="relative max-w-7xl mx-auto py-8 px-3 md:py-16 md:px-6 text-left">
            <h1 className="font-bold text-lg md:text-4xl mt-20 md:mt-20 text-center">
              Payment
            </h1>
          </div>
        </div>
      </Parallax>
            <Elements stripe={stripePromise} >
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default Payment;