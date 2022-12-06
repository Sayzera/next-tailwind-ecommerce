import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Store } from '../utils/Store';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

function Layout({ children, title }) {
  const { state, dispatch } = React.useContext(Store);
  const [cartItemsCount, setCartItemsCount] = React.useState(0);

  const { status, data: session } = useSession();

  const loginClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({
      callbackUrl: '/login',
    });
  };

  const {
    cart: { cartItems },
  } = state;

  React.useEffect(() => {
    setCartItemsCount(cartItems.reduce((a, c) => a + c.quantity, 0));
  }, []);

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
                <span className="ml-1 rounded-full bg-red-600 py-1 px-2 text-xs text-white ">
                  {cartItemsCount}
                </span>
              </Link>
              {status === 'login' ? (
                'loading..'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block ">
                  <Menu.Button className={'text-blue-600'}>
                    {session.user.name}
                  </Menu.Button>

                  <Menu.Items className="absolute right-0 w-52 origin-top-right mt-1  bg-white shadow-lg">
                    <Menu.Item>
                      <>
                        <DropdownLink className="dropdown-link" href="/profile">
                          Profile
                        </DropdownLink>
                      </>
                    </Menu.Item>

                    <Menu.Item>
                      <>
                        <DropdownLink
                          className="dropdown-link"
                          href="#"
                          onClick={loginClickHandler}
                        >
                          Logout
                        </DropdownLink>
                      </>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link className="p-2" href={'/login'}>
                  Login
                </Link>
              )}
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
