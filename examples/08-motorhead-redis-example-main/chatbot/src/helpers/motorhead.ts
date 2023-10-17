export const retrieveContext = async (text: string, session: string) => {
  const motorheadRes = await fetch(`http://localhost:8080/sessions/${session}/retrieval`, {
    method: 'POST',
    body: JSON.stringify({ text }),
    headers: {
      'Content-Type': 'application/json',
    }
  } as any);

  const motorheadResults = await motorheadRes.json();
  const ctx = motorheadResults?.map((r: any) => `${r.role}: ${r.content}`).join("\n");
  return ctx;
};