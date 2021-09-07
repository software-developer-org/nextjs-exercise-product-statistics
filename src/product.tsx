import * as React from 'react';
import { ProductType } from '../lib/products';
import styles from './product.module.scss';

type Props = {
  product: ProductType;
};

const Product: React.FC<Props> = ({ product }) => {
  return <div className={styles.card}>{product.description}</div>;
};
export default Product;
