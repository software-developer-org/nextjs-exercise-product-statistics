import { getProducts, ProductType } from '../lib/products';
('../lib/products');
import { GetStaticProps } from 'next';
import * as React from 'react';
import Product from '../src/product';

type Props = {
  products: ProductType[];
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  return {
    props: {
      products,
    },
  };
};

const ProductLists: React.FC<Props> = ({ products }) => {
  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }
  const listItems = products.map((p) => <Product product={p} key={p.id} />);
  return (
    <main>
      <h1>Produkte</h1>
      <div className="flex-row-wrap">{listItems}</div>)
    </main>
  );
};
export default ProductLists;
