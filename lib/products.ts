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

export async function getProducts(): Promise<ProductType[]> {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

  const productsReponse = await fetch('https://s3-eu-west-1.amazonaws.com/fid-recruiting/fid-task-4-ffront-products.json', {
    method: 'GET',
    mode: 'no-cors',
    headers,
  });

  const products = (await productsReponse.json()) as ProductType[];
  return products;
}
