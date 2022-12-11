import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import db from '../../utils/db';
import { Store } from '../../utils/Store';
// https://headlessui.com/react/combobox

export default function ProductScreen({ product }) {
  const router = useRouter();
  const { state, dispatch } = React.useContext(Store);

  if (!product) {
    return (
      <Layout title="Not found product">
        <div>Product Not Found</div>
      </Layout>
    );
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);

    const { data } = await axios.get('/api/products/' + product.slug);

    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (existItem && existItem.quantity >= data.countInStock) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        ...product,
        quantity: quantity,
      },
    });

    router.push('/cart');
  };
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href={'/'}>back to product</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>

        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>

            <li>Brand: {product.brand}</li>

            <li>
              {product.rating} of {product.numReviews}
            </li>
            <li>{product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>₺{product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
