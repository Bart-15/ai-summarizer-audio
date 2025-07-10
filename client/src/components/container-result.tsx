import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// Extend the props from HTMLMotionProps for a 'div' element
type ContainerResultProps = {
  textResult?: string;
} & HTMLMotionProps<"div">;

const ContainerResult = ({ textResult, ...rest }: ContainerResultProps) => {
  return (
    <motion.div
      {...rest}
      className={cn(
        "w-48 bg-slate-100 dark:bg-gray-900 rounded-md p-6",
        rest.className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="leading-normal tracking-normal typing font-light whitespace-pre-line">
        {textResult}
      </p>{" "}
    </motion.div>
  );
};

export default ContainerResult;
