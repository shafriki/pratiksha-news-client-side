import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiousSecure';
import useAuth from '../../Hooks/useAuth';

const CheckoutForm = () => {
    const stripe = useStripe();
    const {user} = useAuth();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();

    const { subscriptionCost, subscriptionPeriod } = location.state || {};
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState('');

    const authToken = localStorage.getItem('authToken'); // Retrieve authToken from localStorage

    useEffect(() => {
        if (subscriptionCost) {
            // Create payment intent when subscriptionCost is available
            axiosSecure
                .post(
                    '/create-payment-intent',
                    { price: subscriptionCost },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                )
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(error => {
                    console.error('Error creating payment intent:', error);
                });
        }
    }, [axiosSecure, subscriptionCost, authToken]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            return;
        }

        setProcessing(true);

        const card = elements.getElement(CardElement);
        if (!card) {
            setProcessing(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'Subscription User',
                    email: user?.email || 'subscription user'
                },
            },
        });

        if (error) {
            setError(error.message);
            setProcessing(false);
        } else if (paymentIntent.status === 'succeeded') {
            setSuccess('Payment succeeded!');
            setError('');
            setProcessing(false);

            // Save subscription details in the database
            axiosSecure
                .post(
                    '/subscriptions',
                    {
                        subscriptionPeriod,
                        subscriptionCost,
                        paymentIntentId: paymentIntent.id,
                        name: user.displayName,
                        date: new Date(),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                )
                .then(() => {
                    // Navigate to success or subscription confirmation page
                    navigate('/');
                })
                .catch(saveError => {
                    console.error('Error saving subscription:', saveError);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                className="btn btn-primary"
                type="submit"
                disabled={!stripe || processing || !clientSecret}
            >
                {processing ? 'Processing...' : 'Pay'}
            </button>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}
        </form>
    );
};

export default CheckoutForm;
