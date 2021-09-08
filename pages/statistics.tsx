import { Typography } from '@material-ui/core';
import { GetStaticProps } from 'next';
import React from 'react';
import { getProducts, ProductType } from '../lib/products';
import Layout from '../src/layout';

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

const Statistics: React.FC<Props> = ({ allProducts }) => {
  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Statistics
      </Typography>
    </Layout>
  );
};
export default Statistics;
