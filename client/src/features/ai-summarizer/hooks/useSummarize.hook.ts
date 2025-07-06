import { useMutation } from "@tanstack/react-query";
import {
  summarize,
  type SummarizePayload,
} from "../service/ai-summarizer.service";

export function useSummarize() {
  return useMutation({
    mutationFn: (payload: SummarizePayload) => summarize(payload),
  });
}
