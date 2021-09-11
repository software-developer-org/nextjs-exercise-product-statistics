import { ProductType } from '../../lib/products';
import { getMostProductsByBrandsLessThan40 } from '../../lib/statistics';
import { randomInteger } from '../../__mocks__/fixture-utils';

test('getMostProductsByBrandsLessThan40(): brand1 with two products', () => {
  // brand 1
  const product1 = { brand: 'brand1', description: 'description1', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 38 };
  const product2 = { brand: 'brand1', description: 'description2', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 50, priceR: 39.99 };
  const product3 = { brand: 'brand1', description: 'description3', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 40 };
  // brand 2
  const product4 = { brand: 'brand2', description: 'description4', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 50, priceR: 50 };
  const product5 = { brand: 'brand2', description: 'description5', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 50 };
  const products: ProductType[] = [product1, product2, product3, product4, product5];

  //test
  const result = getMostProductsByBrandsLessThan40(products);

  expect(result.length).toEqual(1);
  expect(result[0].brand).toEqual('brand1');
  expect(result[0].products.length).toEqual(2);
  expect(result[0].products[0]).toEqual(product1);
  expect(result[0].products[1]).toEqual(product2);
});

test('getMostProductsByBrandsLessThan40(): brand1 with two products (brand 2 has only one product < 40 EUR) ', () => {
  // brand 1
  const product1 = { brand: 'brand1', description: 'description1', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 38 };
  const product2 = { brand: 'brand1', description: 'description2', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 50, priceR: 39.99 };
  const product3 = { brand: 'brand1', description: 'description3', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 40 };
  // brand 2
  const product4 = { brand: 'brand2', description: 'description4', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 50, priceR: 50 };
  const product5 = { brand: 'brand2', description: 'description5', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 50 };
  const product6 = { brand: 'brand2', description: 'description6', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 38 };
  const products: ProductType[] = [product1, product2, product3, product4, product5, product6];

  //test
  const result = getMostProductsByBrandsLessThan40(products);

  expect(result.length).toEqual(1);
  expect(result[0].brand).toEqual('brand1');
  expect(result[0].products.length).toEqual(2);
  expect(result[0].products[0]).toEqual(product1);
  expect(result[0].products[1]).toEqual(product2);
});

test('getMostProductsByBrandsLessThan40(): brand1 and brand 2 has same amount of products < 40) ', () => {
  // brand 1
  const product1 = { brand: 'brand1', description: 'description1', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 38 };
  const product2 = { brand: 'brand1', description: 'description2', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 50, priceR: 39.99 };
  const product3 = { brand: 'brand1', description: 'description3', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 40 };
  // brand 2
  const product4 = { brand: 'brand2', description: 'description4', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 50, priceR: 50 };
  const product5 = { brand: 'brand2', description: 'description5', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 50 };
  const product6 = { brand: 'brand2', description: 'description6', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 38 };
  const product7 = { brand: 'brand2', description: 'description2', id: randomInteger() + '', images: [], sizes: [], url: '', priceO: 50, priceR: 0.50 };
  const products: ProductType[] = [product1, product2, product3, product4, product5, product6, product7];

  //test
  const result = getMostProductsByBrandsLessThan40(products);

  expect(result.length).toEqual(2);
  expect(result[0].brand).toEqual('brand1');
  expect(result[0].products.length).toEqual(2);
  expect(result[0].products[0]).toEqual(product1);
  expect(result[0].products[1]).toEqual(product2);

  expect(result[1].brand).toEqual('brand2');
  expect(result[1].products.length).toEqual(2);
  expect(result[1].products[0]).toEqual(product6);
  expect(result[1].products[1]).toEqual(product7);
});
