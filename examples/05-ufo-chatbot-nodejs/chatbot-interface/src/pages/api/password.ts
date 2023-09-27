import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const bodyStr = req?.body || '{}';
  const body = JSON.parse(bodyStr);
  const { pw } = body;

  // Branch: Is the password correct?
  const checkIfPwCorrect = !!pw;
  if (checkIfPwCorrect && pw !== process.env.DEMO_PW) {
    return res.status(401).json({ valid: false })
  }

  if (checkIfPwCorrect && pw === process.env.DEMO_PW) {
    return res.status(200).json({ valid: true })
  }

  // Branch: Is there a password?
  const isPwProtected = process.env.DEMO_PW !== undefined;
  if (!isPwProtected) {
    return res.status(404).json({ check: isPwProtected });
  }

  return res.status(200).json({ check: isPwProtected });
}
