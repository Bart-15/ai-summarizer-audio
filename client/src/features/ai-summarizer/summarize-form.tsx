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

const SummarizeForm = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.5 }}
      onSubmit={() => {}}
      className="flex flex-col gap-6 p-4 w-full max-w-[1000px] mx-auto"
    >
      <div>
        <Label
          htmlFor="textInput"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Text for summarization
        </Label>
        <Textarea
          id="textInput"
          placeholder="Enter the text here..."
          className="w-full"
        />
      </div>
      <div>
        <Label
          htmlFor="contextInput"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Context (optional)
        </Label>
        <Textarea
          id="contextInput"
          placeholder="Provide any context here..."
          className="w-full"
        />
      </div>
      <div>
        <Label
          htmlFor="voiceSelect"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Voice Selection
        </Label>
        <Select id="voiceSelect" className="w-full">
          <SelectTrigger aria-label="Voice">
            <SelectValue placeholder="Select a voice" />
          </SelectTrigger>
          <SelectContent>
            {/* Map over your VOICES array from [cdk/lambda/utils/const.ts](cci:7://file:///Users/user/Documents/practice-proj/ai-apps/ai-text-summarizer/cdk/lambda/utils/const.ts:0:0-0:0) to create SelectItems */}
            {/* Example: */}
            <SelectItem value="Joanna">Joanna</SelectItem>
            <SelectItem value="Matthew">Matthew</SelectItem>
            {/* Add more SelectItems here */}
          </SelectContent>
        </Select>
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
