import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home({ products }) {
  const router = useRouter();
  const { state, dispatch } = React.useContext(Store);

  const addToCartHandler = async (product) => {
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
    <Layout title={'Home'}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            key={product.image}
            product={product}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
