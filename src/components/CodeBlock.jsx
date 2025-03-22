import { useState } from "react";
import {
  ContentCopy as CopyIcon,
  Check as CheckIcon,
} from "@mui/icons-material";

export default function CodeBlock({ children, language, title }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group w-full my-4">
      {title && (
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-t-lg border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
            {title}
          </span>
          <button
            onClick={copyToClipboard}
            className="p-1 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Copy code"
          >
            {isCopied ? (
              <CheckIcon className="h-4 w-4 text-green-500" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
      <div className="relative w-full">
        {!title && (
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-2 p-1 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 opacity-0 group-hover:opacity-100 sm:opacity-100"
            aria-label="Copy code"
          >
            {isCopied ? (
              <CheckIcon className="h-4 w-4 text-green-500" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </button>
        )}
        <pre
          className={`${
            title ? "rounded-b-lg" : "rounded-lg"
          } overflow-x-auto p-3 sm:p-4 text-sm sm:text-base max-w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900`}
        >
          <code
            className={`language-${language} block w-full whitespace-pre-wrap break-words`}
          >
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
}
