import { ProductType } from "./products";

export function getMostProductsByBrandsLessThan40(products: ProductType[]) {
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

  export function getLargestSelectionBySize(products: ProductType[]) {
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

  export function getLowestAveragePriceForSize(products: ProductType[], size: string) {
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
    return lowestAveragePriceForSize;
  }
