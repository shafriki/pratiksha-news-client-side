import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
const Payment = () => {
    return (
        <div>
            <h2 className='text-3xl font-bold text-center mt-5'>Payment</h2>
            <Elements stripe={stripePromise} >
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default Payment;