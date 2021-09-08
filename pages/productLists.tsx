import { Box, Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { getProducts, ProductType } from '../lib/products';
import Product from '../src/product';

type Props = {
  allProducts: ProductType[];
};

export const getStaticProps: GetStaticProps = async () => {
  const allProducts = await getProducts();
  return {
    props: {
      allProducts,
    },
  };
};

const ProductLists: React.FC<Props> = ({ allProducts }) => {
  const [sizeFilter, setSizeFilter] = useState('');
  const initialProducts: ProductType[] = sizeFilter ? allProducts.filter((p) => p.sizes.filter((productSize) => productSize === sizeFilter).length > 0) : allProducts;
  const [products, setProducts] = useState(initialProducts);

  const listItems = products.map((p) => <Product product={p} key={p.id} />);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSizeFilterValue = e.target.value.toUpperCase();
    setSizeFilter(newSizeFilterValue);
    const productsBySize: ProductType[] = newSizeFilterValue ? allProducts.filter((p) => p.sizes.filter((productSize) => productSize === newSizeFilterValue).length > 0) : allProducts;
    setProducts(productsBySize);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Next.js example
      </Typography>
      <TextField label="Größe" helperText="Nach Größe Filtern" type="text" value={sizeFilter} onChange={handleChange}></TextField>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {listItems}
      </Box>
    </Container>
  );
};
export default ProductLists;
