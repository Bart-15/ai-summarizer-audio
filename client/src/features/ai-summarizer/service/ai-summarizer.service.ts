export type SummarizePayload = {
  text: string;
  context?: string;
  voiceId?: string;
};

const BASE_URI = import.meta.env.VITE_BACKEND_URI || "";

export async function summarize(payload: SummarizePayload) {
  const response = await fetch(`${BASE_URI}/summarize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to summarize");
  }

  return response.json();
}
