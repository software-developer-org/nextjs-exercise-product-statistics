import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: string;
  brand: string;
  description: string;
  priceO: number;
  priceR: number;
  url: string;
  images: string[];
  sizes: string[];
};

export default async function fetchAPI(req: NextApiRequest, res: NextApiResponse<Data[]>) {
  const headers = { 'Content-Type': 'application/json' };

  const productsReponse = await fetch('https://s3-eu-west-1.amazonaws.com/fid-recruiting/fid-task-4-ffront-products.json', {
    method: 'GET',
    headers,
  });

  const json = await productsReponse.json();
  res.status(productsReponse.status);
  if (productsReponse.status === 200) {
    res.json(json);
  }
}
