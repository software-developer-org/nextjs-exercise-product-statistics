import { Box, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { GetStaticProps } from 'next';
import * as React from 'react';
import { getProducts, ProductType } from '../lib/products';
import Product from '../src/product';
('../lib/products');

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
    <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
      <Box display="flex" flexDirection="row" flexWrap="wrap">{listItems}</Box>)
    </Container>
  );
};
export default ProductLists;
