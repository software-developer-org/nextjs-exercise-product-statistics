import * as React from 'react';
import { ProductType } from '../lib/products';
('../lib/products');

type Props = {
  product: ProductType;
};

const Product: React.FC<Props> = ({ product }) => {
  return <div>{product.description}</div>;
};
export default Product;
