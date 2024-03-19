import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    revalidated: boolean;
    message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.query.token!==process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({revalidated: false, message: "Unauthorized"});
  }
  if(req.query.data==="product"){
    try {
      await res.revalidate("/product/static");
      return res.json({revalidated: true});
    } catch (err) {
      return res.status(500).send({revalidated: false})
    }
  }
  return res.json({
    revalidated: false,
    message: "Pilih data mana yang ingin di revalidate"
  });
}