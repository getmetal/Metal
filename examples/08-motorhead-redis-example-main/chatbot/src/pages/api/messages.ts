// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { session } = req.query;

  if (req.method === 'POST') {
    await fetch(`http://localhost:8080/sessions/${session}/memory`, {
      method: 'POST',
      body: req.body,
      headers: {
        'Content-Type': 'application/json',
      }
    } as any)

    res.status(200).json({ data: {} })
  } else {
    const motorheadRes = await fetch(`http://localhost:8080/sessions/${session}/memory`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    } as any);

    const { messages } = await motorheadRes.json();
    const inverted = messages.reverse();

    res.status(200).json({ data: { messages: inverted } })
  }
}
