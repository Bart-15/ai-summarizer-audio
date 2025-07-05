import Header from "@/components/header";
import SummarizeForm from "./summarize-form";

const AiSummarizer = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center px-4 py-6">
        <div className="w-full max-w-[1000px]">
          <SummarizeForm />
        </div>
      </div>
    </>
  );
};

export default AiSummarizer;
