import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

function Layout({ children, title }) {
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

            <div>
              <Link className="p-2" href={'/cart'}>
                Cart
              </Link>
              <Link className="p-2" href={'/login'}>
                Login
              </Link>
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-4 px-4 ">{children}</main>

        <footer className="flex h-10 justify-center items-center shadow-inner ">
          footer
        </footer>
      </div>
    </>
  );
}

export default Layout;
