import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';

export default function LoginScreen() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ email, password }) => {};

  return (
    <Layout>
      <form
        className="mx-auto max-w-screen"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type={'email'}
            className="w-full"
            name="email"
            id="email"
            autoFocus
            {...register('email', {
              required: 'E posta alanının doldurulması gereklidir',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Geçerli bir e posta adresi giriniz',
              },
            })}
          />
          <div className="mt-1">
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type={'password'}
            className="w-full"
            name="password"
            id="password"
            autoFocus
            {...register('password', {
              required: 'Şifre alanının doldurulması zorunludur',
              minLength: {
                value: 6,
                message: `Şifre için en az 6 karakter girmelisiniz`,
              },
            })}
          />

          <div className="mt-1">
            {/* {errors.email?.type == 'required' && (
              <span className="text-red-500 text-sm">Email is required</span>
            )} */}

            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <button type="submit" className="primary-button">
            Login
          </button>
        </div>

        <div className="mb-4">
          Dont have an account? <Link href={'/register'}>Register</Link>
        </div>
      </form>
    </Layout>
  );
}
