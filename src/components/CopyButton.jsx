import { useThemeStore } from "../stores/themeStore";

export const CopyButton = ({ text }) => {
  const { isDark } = useThemeStore();

  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className={`p-2 rounded-md opacity-0 
          group-hover:opacity-100 transition-opacity
          ${
            isDark
              ? "bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
              : "bg-blue-500/10 hover:bg-blue-500/20 text-blue-600"
          }
        `}
      aria-label="Copy code"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    </button>
  );
};
