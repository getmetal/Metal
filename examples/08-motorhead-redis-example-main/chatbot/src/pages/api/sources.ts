// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  index?: string;
  data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { prompt, index = process.env.METAL_INDEX_ID as string, chunkCount = 10, pw } = JSON.parse(req.body);

  const demoPw = process.env.DEMO_PW;
  if (demoPw && pw !== demoPw) {
    return res.status(401);
  }

  const metalRes = await fetch(`https://api.getmetal.io/v1/search?limit=${chunkCount}`, {
    method: 'POST',
    body: JSON.stringify({
      index,
      text: prompt
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-metal-api-key': process.env.METAL_API_KEY,
      'x-metal-client-id': process.env.METAL_CLIENT_ID,
    }
  } as any);

  const { data: metalResults } = await metalRes.json();
  res.status(200).json({ index, data: metalResults })
}
