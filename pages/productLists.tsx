import { getProducts, ProductType } from '../lib/products';
('../lib/products');
import { GetStaticProps } from 'next';
import * as React from 'react';

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
  return <div>{JSON.stringify(products)}</div>;
};
export default ProductLists;
