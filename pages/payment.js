import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('PayPal');
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const { shippingAddress, paymentMethod } = cart;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Please select a payment method');
    }

    dispatch({
      type: 'SAVE_PAYMENT_METHOD',
      payload: selectedPaymentMethod,
    });

    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }

    setSelectedPaymentMethod(paymentMethod || 'PayPal');
  }, [paymentMethod, router, shippingAddress?.address]);

  return (
    <div>
      <Layout title="Payment Method">
        <CheckoutWizard activeStep={2} />
        <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
          <h1 className="mb-4 text-xl">Payment Method</h1>
          {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
            <div className="mb-4" key={payment}>
              <input
                name="paymentMethod"
                id={payment}
                className="p-2 outline-none focus:righ-0"
                checked={selectedPaymentMethod === payment}
                type={'radio'}
                onChange={() => setSelectedPaymentMethod(payment)}
              />

              <label className="p-2" htmlFor={payment}>
                {payment}
              </label>
            </div>
          ))}

          <div className="mb-4 flex justify-between">
            <button
              onClick={() => router.push('/shipping')}
              type="button"
              className="default-button"
            >
              Back
            </button>

            <button className="primary-button">Next</button>
          </div>
        </form>
      </Layout>
    </div>
  );
}

PaymentScreen.auth = true;
