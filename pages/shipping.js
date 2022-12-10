import Cookies from 'js-cookie';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
const { useRouter } = require('next/router');

export default function ShippingPage() {
  const { state, dispatch } = useContext(Store);
  const { shippingAddress } = state.cart;

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  React.useEffect(() => {
    setValue('fullName', shippingAddress?.fullName);
    setValue('address', shippingAddress?.address);
    setValue('city', shippingAddress?.city);
    setValue('postalCode', shippingAddress?.postalCode);
    setValue('country', shippingAddress?.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });

    Cookies.set(
      'cart',
      JSON.stringify({
        ...state.cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    router.push('/payment');
  };
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />

      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="w-full mt-2"
            id="fullName"
            autoFocus
            {...register('fullName', { required: 'Please enter full name' })}
          />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            className="w-full mt-2"
            id="address"
            autoFocus
            {...register('address', {
              required: 'Please enter address',
              minLength: {
                value: 3,
                message: 'Address must be at least 2 characters',
              },
            })}
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            className="w-full mt-2"
            id="city"
            autoFocus
            {...register('city', {
              required: 'Please enter city',
            })}
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            className="w-full mt-2"
            id="postalCode"
            autoFocus
            {...register('postalCode', {
              required: 'Please enter postal code',
            })}
          />
          {errors.postalCode && (
            <p className="text-red-500">{errors.postalCode.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            className="w-full mt-2"
            id="country"
            autoFocus
            {...register('country', {
              required: 'Please enter country',
            })}
          />
          {errors.country && (
            <p className="text-red-500">{errors.country.message}</p>
          )}
        </div>

        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

ShippingPage.auth = true;
