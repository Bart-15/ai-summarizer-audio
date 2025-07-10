import Header from "@/components/header";
import SummarizeForm from "./summarize-form";
import { useSummarize } from "./hooks/useSummarize.hook";

const AiSummarizer = () => {
  const summarizeMutation = useSummarize();

  return (
    <>
      <Header />
      <div className="flex justify-center px-4 py-6">
        <div className="w-full max-w-[1000px]">
          <SummarizeForm useSummarize={() => summarizeMutation} />
        </div>
      </div>
    </>
  );
};

export default AiSummarizer;
