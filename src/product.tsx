import * as React from 'react';
import { ProductType } from '../lib/products';
import styles from './product.module.scss';

type Props = {
  product: ProductType;
};

const Product: React.FC<Props> = ({ product }) => {
  const price = product.priceR ? (
    <div>
      {product.priceR} € (<del>{product.priceO} €</del>)
    </div>
  ) : (
    <div>{product.priceO} € </div>
  );
  const sizes = product.sizes.reduce((total, current) => total + ',' + current);
  return (
    <article className={styles.card}>
      <header className="title">
        <a href={product.url} target="_blank" rel="noopener noreferrer">
          {product.description}
        </a>
      </header>
      <section>
        <div className="subtitle">{product.brand}</div>
        {price}
        <div>Größe(n): {sizes}</div>
      </section>
    </article>
  );
};
export default Product;
