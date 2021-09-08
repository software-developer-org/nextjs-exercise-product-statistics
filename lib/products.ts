export type ProductType = {
  id: string;
  brand: string;
  description: string;
  priceO: number;
  priceR: number;
  url: string;
  images: string[];
  sizes: string[];
};

export async function getProducts(size?: string): Promise<ProductType[]> {
  const headers = { 'Content-Type': 'application/json' };

  const productsReponse = await fetch('https://s3-eu-west-1.amazonaws.com/fid-recruiting/fid-task-4-ffront-products.json', {
    method: 'GET',
    headers,
  });

  const products = await productsReponse.json() as ProductType[];
  if (size) {
    return products.filter((p) => p.sizes.filter((productSize) => productSize === size).length > 0);
  }
  return products;
}
