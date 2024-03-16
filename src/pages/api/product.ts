// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData } from '@/lib/firebase/service';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: boolean;
  statusCode: Number;
  data: any;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await retrieveData("products");
  res.status(200).json({ status: true, statusCode: 200, data });
  // try {
  //   // ... your logic to fetch product data (replace with your actual implementation)
  //   const productData = { products: data};
  //   res.status(200).json(productData); // Send success response with product data
  // } catch (error) {
  // }
}