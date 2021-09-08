import { Box, FormControlLabel, Switch } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { getProducts, ProductType } from '../lib/products';
import Layout from '../src/layout';
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
  const [priceAsc, setPriceAsc] = useState(true);
  const sort = (p: ProductType[]) => {
    return p.sort((a, b) => {
      const priceA = a.priceR ? a.priceR : a.priceO;
      const priceB = b.priceR ? b.priceR : b.priceO;
      const sorted = priceAsc ? priceA - priceB : priceB - priceA;
      return sorted;
    });
  };

  const [sizeFilter, setSizeFilter] = useState('');
  const initialProducts: ProductType[] = sizeFilter ? allProducts.filter((p) => p.sizes.filter((productSize) => productSize === sizeFilter).length > 0) : allProducts;
  const [products, setProducts] = useState(initialProducts);

  const listItems = sort(products).map((p) => <Product product={p} key={p.id} />);

  const handleFilterBySize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSizeFilterValue = e.target.value.toUpperCase();
    setSizeFilter(newSizeFilterValue);
    const productsBySize: ProductType[] = newSizeFilterValue ? allProducts.filter((p) => p.sizes.filter((productSize) => productSize === newSizeFilterValue).length > 0) : allProducts;
    setProducts(sort(productsBySize));
  };

  const handleSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.checked;
    setPriceAsc(newVal);
  };

  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>

      <TextField label="Size" helperText="Filter by Size" type="text" value={sizeFilter} onChange={handleFilterBySize}></TextField>
      <FormControlLabel control={<Switch checked={priceAsc} onChange={handleSort}></Switch>} label={priceAsc ? 'Price ascending' : 'Price descending'}></FormControlLabel>

      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {listItems}
      </Box>
    </Layout>
  );
};
export default ProductLists;
