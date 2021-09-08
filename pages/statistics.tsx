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

function getMostProductsByBrandsLessThan40(products: ProductType[]) {
  const lessThan40Eur = products.filter((p) => {
    const price = p.priceR ? p.priceR : p.priceO;
    return price <= 40;
  });
  const brands = lessThan40Eur.map((p) => p.brand).filter((brand, index, self) => self.indexOf(brand) === index);
  const productsByBrandsLessThan40 = brands.map((brand) => {
    return {
      brand,
      products: lessThan40Eur.filter((p) => p.brand === brand),
    };
  });
  const productsByBrandsLessThan40MaxCount = productsByBrandsLessThan40.map((producsByBrand) => producsByBrand.products.length).reduce((total, current) => (total > current ? total : current), 0);
  const mostProductsByBrandsLessThan40 = productsByBrandsLessThan40.filter((producsByBrand) => producsByBrand.products.length === productsByBrandsLessThan40MaxCount);
  return mostProductsByBrandsLessThan40;
}

function getLargestSelectionBySize(products: ProductType[]) {
  const brands = products.map((p) => p.brand).filter((brand, index, self) => self.indexOf(brand) === index);
  const sizesForEachBranch = brands.map((brand) => {
    return {
      brand,
      sizes: products
        .filter((p) => p.brand === brand)
        .map((p) => p.sizes)
        .reduce((total, current) => total.concat(current))
        .filter((size, index, self) => self.indexOf(size) === index),
    };
  }) as { brand: string; sizes: string[] }[];
  const maxSizes = sizesForEachBranch.map((item) => item.sizes.length).reduce((total, current) => (total > current ? total : current));
  const brandsWithMaxSize = sizesForEachBranch.filter((item) => item.sizes.length === maxSizes);
  return brandsWithMaxSize;
}

function getLowestAveragePriceForSize(products: ProductType[], size: string) {
  const productsBySize = products.filter((p) => p.sizes.indexOf(size) >= 0);
  const brands = productsBySize.map((p) => p.brand).filter((brand, index, self) => self.indexOf(brand) === index);
  const productsByBrandAndSize = brands.map((brand) => {
    const products = productsBySize.filter((p) => p.brand === brand);
    return {
      brand,
      products,
      averagePrice: products.map((p) => (p.priceR ? p.priceR : p.priceO)).reduce((sum, current) => sum + current) / products.length,
    };
  });
  const lowestPrice = productsByBrandAndSize.map((p) => p.averagePrice).reduce((last, current) => (last < current ? last : current));
  const lowestAveragePriceForSize = productsByBrandAndSize.filter((p) => p.averagePrice === lowestPrice);
  console.log('>>>>lowestAveragePriceForSize', lowestAveragePriceForSize);
  return lowestAveragePriceForSize;
}

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
