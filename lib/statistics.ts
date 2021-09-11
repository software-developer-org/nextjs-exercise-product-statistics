import { ProductType } from './products';

export function getMostProductsByBrandsLessThan40(products: ProductType[]) {
  // filter by price less than 40 Euro
  const lessThan40Eur = products.filter((p) => {
    const price = p.priceR ? p.priceR : p.priceO;
    return price < 40;
  });

  // get distinct brands
  const brands = lessThan40Eur
    // get brands
    .map((p) => p.brand)
    // remove duplicates
    .filter((brand, index, self) => self.indexOf(brand) === index);

  // group products by brand
  const productsByBrandsLessThan40 = brands.map((brand) => {
    return {
      brand,
      products: lessThan40Eur.filter((p) => p.brand === brand),
    };
  });

  // find most products
  const productsByBrandsLessThan40MaxCount = productsByBrandsLessThan40
  // get product sizes
  .map((producsByBrand) => producsByBrand.products.length)
  // get max size
  .reduce((total, current) => (total > current ? total : current), 0);

  // filter products by max size
  const mostProductsByBrandsLessThan40 = productsByBrandsLessThan40.filter((producsByBrand) => producsByBrand.products.length === productsByBrandsLessThan40MaxCount);
  return mostProductsByBrandsLessThan40;
}

export function getLargestSelectionBySize(products: ProductType[]) {
  // get distinct brands
  const brands = products
    // get brands
    .map((p) => p.brand)
    // remove duplicates
    .filter((brand, index, self) => self.indexOf(brand) === index);

  // group sizes by brand
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

  // find max sizes
  const maxSizes = sizesForEachBranch
  // get size length
  .map((item) => item.sizes.length)
  // get max size
  .reduce((total, current) => (total > current ? total : current));

  // filter products by max size
  const brandsWithMaxSize = sizesForEachBranch.filter((item) => item.sizes.length === maxSizes);
  return brandsWithMaxSize;
}

export function getLowestAveragePriceForSize(products: ProductType[], size: string) {
  const productsBySize = products.filter((p) => p.sizes.indexOf(size) >= 0);
  // get distinct brands
  const brands = productsBySize
    // remove duplicates
    .map((p) => p.brand)
    // remove duplicates
    .filter((brand, index, self) => self.indexOf(brand) === index);

  // group products by brand, also calculate average price
  const productsByBrandAndSize = brands.map((brand) => {
    const products = productsBySize.filter((p) => p.brand === brand);
    return {
      brand,
      products,
      averagePrice: products.map((p) => (p.priceR ? p.priceR : p.priceO)).reduce((sum, current) => sum + current) / products.length,
    };
  });

  // find lowest average price
  const lowestPrice = productsByBrandAndSize
  // get average price
  .map((p) => p.averagePrice)
  // get lowest average price
  .reduce((last, current) => (last < current ? last : current));

  // filter products with lowest average price
  const lowestAveragePriceForSize = productsByBrandAndSize.filter((p) => p.averagePrice === lowestPrice);
  return lowestAveragePriceForSize;
}
