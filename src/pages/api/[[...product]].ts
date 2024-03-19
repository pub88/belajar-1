// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData, retrieveDataById } from '@/lib/firebase/service';
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
  if(req.query.product?.[1]){
    const data = await retrieveDataById("products", req.query.product[1]);
    response(res, data);
  } else {
    let data = await retrieveData();
    response(res, data);
  }
}