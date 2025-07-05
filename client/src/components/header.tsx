import { ModeToggle } from "@/components/mode-toggle";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-800 dark:shadow-none">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        AI Text Summarizer
      </h1>
      <ModeToggle />
    </div>
  );
};

export default Header;
