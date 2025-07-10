import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { VOICES } from "@/utils/const";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AiSummarizerValidationSchema,
  type TAiSummarizerSchema,
} from "./validation/ai-summarizer.validation";
import type { UseMutationResult } from "@tanstack/react-query";
import type { SummarizePayload } from "./service/ai-summarizer.service";

type SummarizeForm = {
  useSummarize: () => UseMutationResult<any, Error, SummarizePayload, unknown>;
};

const SummarizeForm = ({ useSummarize }: SummarizeForm) => {
  const summarizeMutation = useSummarize();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(AiSummarizerValidationSchema),
    defaultValues: {
      text: "",
      context: "",
      voiceId: "Joanna", // Default voice
    },
  });

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  async function onSubmit(data: TAiSummarizerSchema) {
    await summarizeMutation.mutateAsync(data);
  }

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 p-4 w-full max-w-[1000px] mx-auto"
    >
      <div>
        <Label
          htmlFor="text"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Text for summarization
        </Label>
        <Textarea
          id="text"
          placeholder="Enter the text here..."
          className="w-full mb-2"
          {...register("text")}
          aria-invalid={errors.text ? "true" : "false"}
          aria-describedby="textError"
        />
        {errors.text?.message && (
          <p className="text-xs text-red-500">{errors.text?.message}</p>
        )}
      </div>
      <div>
        <Label
          htmlFor="context"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Context (optional)
        </Label>
        <Textarea
          id="context"
          placeholder="Provide any context here..."
          className="w-full"
          {...register("context")}
          aria-invalid={errors.context ? "true" : "false"}
          aria-describedby="contextError"
        />
      </div>
      <div>
        <Label
          htmlFor="voiceSelect"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Voice Selection
        </Label>
        <Controller
          control={control}
          name="voiceId"
          defaultValue="Joanna"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger aria-label="Voice">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {VOICES.map((voice) => (
                  <SelectItem key={voice} value={voice}>
                    {voice}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.voiceId?.message && (
          <p className="text-xs text-red-500">{errors.voiceId.message}</p>
        )}
      </div>
      <div>
        <Button variant="default" type="submit" className="w-full">
          Submit
        </Button>
      </div>
    </motion.form>
  );
};

export default SummarizeForm;
