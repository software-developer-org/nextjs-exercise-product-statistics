import { Typography } from '@material-ui/core';
import { GetStaticProps } from 'next';
import React from 'react';
import { getProducts, ProductType } from '../lib/products';
import Layout from '../src/layout';
import {getLargestSelectionBySize, getLowestAveragePriceForSize, getMostProductsByBrandsLessThan40} from '../lib/statistics'

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
  const mostProductsByBrandsLessThan40 = getMostProductsByBrandsLessThan40(allProducts);
  const largestSelectionBySize = getLargestSelectionBySize(allProducts);
  const lowestAveragePriceForSize = getLowestAveragePriceForSize(allProducts, '32');
  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Statistics
      </Typography>
      <Typography variant="h4" component="h1" gutterBottom>
        Brand with most products that cost less than 40 EUR:
      </Typography>
      <ul>
        {mostProductsByBrandsLessThan40.map((producsByBrand) => {
          return (
            <li key={producsByBrand.brand}>
              {producsByBrand.brand}: {producsByBrand.products.length} Products
              <br />
              <ul>
                {producsByBrand.products.map((p) => (
                  <li key={p.id}>{p.description}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <Typography variant="h4" component="h1" gutterBottom>
        Brand with largest size selection:
        <ul>
          {largestSelectionBySize.map((sizesByBrand) => {
            return (
              <li key={sizesByBrand.brand}>
                {sizesByBrand.brand}: {sizesByBrand.sizes.length} sizes
                <br />
                {sizesByBrand.sizes.reduce((total, current) => total + ', ' + current)}
              </li>
            );
          })}
        </ul>
      </Typography>
      <Typography variant="h4" component="h1" gutterBottom>
        Brand with lowest average price for customers wearing size “32”:
        <ul>
          {lowestAveragePriceForSize.map((p) => {
            return (
              <li key={p.brand}>
                {p.brand}: {p.averagePrice} €
              </li>
            );
          })}
        </ul>
      </Typography>
    </Layout>
  );
};
export default Statistics;
