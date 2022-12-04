/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

function ProductItem({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <div>
          <img
            className="rounded shadow"
            src={product.image}
            alt={product.name}
          />
        </div>
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}></Link>

        <p className="mb-2">{product.brand}</p>
        <p className="">{product.price}</p>

        <button className="primary-button" type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
