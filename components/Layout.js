import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Store } from '../utils/Store';

function Layout({ children, title }) {
  const { state, action } = React.useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex justify-between h-12 shadow-md items-center px-4">
            <Link className="text-lg font-bold" href={'/'}>
              Amazona
            </Link>

            <div className="relation">
              <Link className="p-2" href={'/cart'}>
                Cart
                {cartItems.length > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 py-1 px-2 text-xs text-white ">
                    {cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </Link>
              <Link className="p-2" href={'/login'}>
                Login
              </Link>
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-4 px-4 ">{children}</main>

        <footer className="flex h-10 justify-center items-center shadow-inner ">
          CopyRight &copy; 2022 Amazona
        </footer>
      </div>
    </>
  );
}

export default Layout;
