export const retrieveContext = async (text: string, opts: any) => {
  const limit = opts.limit || 10;

  const metalRes = await fetch(`https://api.getmetal.io/v1/search?limit=${limit}`, {
    method: 'POST',
    body: JSON.stringify({
      index: process.env.METAL_INDEX_ID,
      text,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-metal-api-key': process.env.METAL_API_KEY,
      'x-metal-client-id': process.env.METAL_CLIENT_ID,
    }
  } as any);

  const { data: metalResults } = await metalRes.json();
  const ctx = metalResults?.map((r: any) => r.text).join("\n");
  return ctx;
};
