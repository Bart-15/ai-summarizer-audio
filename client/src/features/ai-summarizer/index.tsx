import Header from "@/components/header";
import SummarizeForm from "./summarize-form";
import { useSummarize } from "./hooks/useSummarize.hook";
import ContainerLoader from "@/components/container-loader";
import ContainerResult from "@/components/container-result";

const AiSummarizer = () => {
  const summarizeMutation = useSummarize();

  const result = summarizeMutation.isSuccess && (
    <ContainerResult
      className="w-full"
      audioUrl={summarizeMutation.data?.audioUrl}
      textResult={summarizeMutation.data?.summary || "No summary available"}
    />
  );

  const isLoading = summarizeMutation.isPending && (
    <ContainerLoader className="w-full" />
  );
  return (
    <>
      <Header />
      <div className="w-full max-w-[1000px] mx-auto px-4 py-6">
        <div className="flex justify-center">
          <div className="w-full">
            <SummarizeForm useSummarize={() => summarizeMutation} />
          </div>
        </div>

        {isLoading}

        {result}
      </div>
    </>
  );
};

export default AiSummarizer;
