import { ImageList, ImageListItem, Paper, Typography } from '@material-ui/core';
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
    <a href={product.url}>
      <Paper className={styles.card} elevation={6}>
        <Typography component="h1" gutterBottom>
          {product.description}
        </Typography>
        <ImageList>
          {product.images.map((url, index) => (
            <ImageListItem key={index}>
              <img src={url} alt={url} />
            </ImageListItem>
          ))}
        </ImageList>
        <Typography component="h2" color="textSecondary">
          {product.brand}
        </Typography>
        <Typography component="label">{price}</Typography>
        <Typography component="label">
          <small>
            <b>Größe(n):</b> {sizes}
          </small>
        </Typography>
      </Paper>
    </a>
  );
};
export default Product;
