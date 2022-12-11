import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { BsXCircle } from 'react-icons/bs';
import { useRouter } from 'next/router';
// https://react-icons.github.io/react-icons

import dynamic from 'next/dynamic';
import axios from 'axios';

function CartScreen() {
  const { state, dispatch } = React.useContext(Store);
  const router = useRouter();

  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item.slug}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href={'/'}>Go Shopping</Link>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="px-5 text-right">Quantity</th>
                    <th className="px-5 text-right">Price </th>
                    <th className="px-5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr className="borde-b" key={item.name}>
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <div className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />{' '}
                            &nbsp; {item.name}
                          </div>
                        </Link>
                      </td>
                      <td className="p-5 text-right">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 text-right">₺{item.price}</td>
                      <td className="p-5 text-center">
                        <button onClick={() => removeItemHandler(item)}>
                          <BsXCircle size={20} color={'red'} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <div className="card p-5">
                <ul>
                  <li>
                    <div className="pb-3 text-xl">
                      Subtotal (
                      {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}{' '}
                      ₺)
                    </div>
                  </li>
                  <li>
                    <button
                      className="primary-button w-full"
                      onClick={() => router.push('login?redirect=/shipping')}
                    >
                      Check Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
