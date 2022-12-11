import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { getError } from '../utils/error';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  React.useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [session, redirect, router]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });
      toast.success('Kayıt başarılı');

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error);
      }

      router.push(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Register">
      <ToastContainer position="top-center" draggable draggablePercent={60} />

      <form
        className="mx-auto max-w-screen"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Register</h1>

        <div className="mb-4">
          <label htmlFor="email">Name</label>
          <input
            type={'text'}
            className="w-full"
            name="name"
            id="name"
            autoFocus
            {...register('name', {
              required: 'İsim alanının doldurulması gereklidir',
            })}
          />
          <div className="mt-1">
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type={'email'}
            className="w-full"
            name="email"
            id="email"
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
          <label htmlFor="c_password">Confirm Password</label>
          <input
            type={'password'}
            className="w-full"
            name="c_password"
            id="c_password"
            autoFocus
            {...register('c_password', {
              required: 'Şifre alanının doldurulması zorunludur',
              validate: (value) => {
                return value === watch('password') || 'Şifreler uyuşmuyor';
              },
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

            {errors.c_password && (
              <span className="text-red-500 text-sm">
                {errors.c_password.message}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <button type="submit" className="primary-button">
            Register
          </button>
        </div>

        <div className="mb-4">
          Already have an account <Link href={'/login'}>Login</Link>
        </div>
      </form>
    </Layout>
  );
}
