import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiousSecure';
import useAuth from '../../Hooks/useAuth';
import { BeatLoader } from 'react-spinners';

const CheckoutForm = () => {
    const stripe = useStripe();
    const { user } = useAuth();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();

    const { subscriptionCost, subscriptionPeriod } = location.state || {};
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState('');
    const [subscriptionExpired, setSubscriptionExpired] = useState(false);

    const authToken = localStorage.getItem('authToken'); 

    useEffect(() => {
        if (subscriptionCost) {
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

        // Check if the subscription has expired on page load
        if (user && user.subscriptionExpiry) {
            const expiryDate = new Date(user.subscriptionExpiry);
            if (expiryDate <= new Date()) {
                setSubscriptionExpired(true);
                // Optionally, update role to normal here if needed
                // Make an API call to change the user role
            }
        }
    }, [axiosSecure, subscriptionCost, authToken, user]);

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
                        paymentIntentId: paymentIntent.id, // Pass the payment intent ID
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                )
                .then((response) => {
                    // Handle successful subscription creation
                    console.log(response.data);
                    navigate('/'); // Navigate to home or a confirmation page
                })
                .catch(saveError => {
                    console.error('Error saving subscription:', saveError);
                    setError('Failed to save subscription. Please try again.');
                    setProcessing(false);
                });
        }
    };

    return (
        <div className="max-w-2xl my-10 p-10 mx-auto border rounded-md bg-teal-100">
            {subscriptionExpired && (
                <div className="text-red-600 mb-4">
                    Your subscription has expired. Please renew to continue.
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <CardElement
                    className="border p-3 bg-white"
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
                <p className="text-red-600">{error}</p>
                {success && <p className="text-green-600">{success}</p>}
                <div className="flex items-center justify-center pt-10">
                    <button
                        className="btn md:px-10 bg-teal-600 hover:bg-teal-700 text-white"
                        type="submit"
                        disabled={!stripe || processing || !clientSecret}
                    >
                        {processing ? <BeatLoader size={10} color="#ffffff" /> : 'Pay Now'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
