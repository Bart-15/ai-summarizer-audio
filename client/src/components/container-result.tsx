import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

// Extend the props from HTMLMotionProps for a 'div' element
type ContainerResultProps = {
  textResult?: string;
  audioUrl?: string;
} & HTMLMotionProps<"div">;

const ContainerResult = ({
  textResult,
  audioUrl,
  ...rest
}: ContainerResultProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Handle audio ended event
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <motion.div
      {...rest}
      className={cn(
        "w-48 bg-slate-100 dark:bg-gray-900 rounded-md p-6 relative",
        rest.className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="leading-normal tracking-normal typing font-light whitespace-pre-line">
        {textResult}
      </p>
      <br />

      {audioUrl && (
        <>
          <audio ref={audioRef} src={audioUrl} onEnded={handleAudioEnded} />
          <button
            onClick={handlePlayPause}
            className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
              </svg>
            )}
          </button>
        </>
      )}
    </motion.div>
  );
};

export default ContainerResult;
