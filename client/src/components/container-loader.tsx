import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// Extend the props from HTMLMotionProps for a 'div' element
type ContainerLoaderProps = {} & HTMLMotionProps<"div">;

const ContainerLoader = (props: ContainerLoaderProps) => {
  return (
    <motion.div
      {...props}
      className={cn(
        "w-48 h-48 bg-slate-200 dark:bg-gray-900 rounded-md shimmer",
        props.className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default ContainerLoader;
