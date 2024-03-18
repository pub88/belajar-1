// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData } from '@/lib/firebase/service';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: boolean;
  statusCode: Number;
  data: any;
};

function response(res: NextApiResponse<Data>, data: any) {
  res.status(200).json({ status: true, statusCode: 200, data });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let data = await retrieveData();

  response(res, data);
}