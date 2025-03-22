import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";

// Import all MDX files
import Overview from "../content/overview.mdx";
import Installation from "../content/installation.mdx";
import CoreConcepts from "../content/core-concepts.mdx";
import Usage from "../content/usage.mdx";
import AdvancedFeatures from "../content/advanced-features.mdx";
import ApiReference from "../content/api-reference.mdx";
import Contributing from "../content/contributing.mdx";
import License from "../content/license.mdx";

const contentMap = {
  "/": { content: Overview, title: "Overview" },
  "/installation": { content: Installation, title: "Installation" },
  "/core-concepts": { content: CoreConcepts, title: "Core Concepts" },
  "/usage": { content: Usage, title: "Usage" },
  "/advanced-features": {
    content: AdvancedFeatures,
    title: "Advanced Features",
  },
  "/api-reference": { content: ApiReference, title: "API Reference" },
  "/contributing": { content: Contributing, title: "Contributing" },
  "/license": { content: License, title: "License" },
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  // Create search data from MDX files
  const searchData = Object.entries(contentMap).map(
    ([path, { content, title }]) => {
      // Extract frontmatter if it exists
      const frontmatter = content.frontmatter || {};
      const contentText = content.default?.props?.children || "";

      return {
        path,
        title: title || frontmatter.title || "",
        content: contentText.toString(),
        keywords: frontmatter.keywords || [],
      };
    }
  );

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchData
        .filter((item) => {
          const searchContent = `${item.title} ${
            item.content
          } ${item.keywords.join(" ")}`.toLowerCase();
          return searchContent.includes(query.toLowerCase());
        })
        .map((item) => ({
          ...item,
          relevance: calculateRelevance(item, query),
        }))
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 5);

      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  const calculateRelevance = (item, query) => {
    const searchContent = `${item.title} ${item.content} ${item.keywords.join(
      " "
    )}`.toLowerCase();
    const queryTerms = query.toLowerCase().split(" ");

    let relevance = 0;
    queryTerms.forEach((term) => {
      if (item.title.toLowerCase().includes(term)) relevance += 3;
      if (item.keywords.some((k) => k.toLowerCase().includes(term)))
        relevance += 2;
      if (searchContent.includes(term)) relevance += 1;
    });

    return relevance;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex(
            (prev) => (prev - 1 + results.length) % results.length
          );
          break;
        case "Enter":
          event.preventDefault();
          if (results[selectedIndex]) {
            window.location.href = results[selectedIndex].path;
            setIsOpen(false);
          }
          break;
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search documentation..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {isOpen && (query.length >= 2 ? results.length > 0 : true) && (
        <div
          ref={resultsRef}
          className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto"
        >
          {query.length >= 2 ? (
            results.map((result, index) => (
              <a
                key={result.path}
                href={result.path}
                className={`block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                  index === selectedIndex ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = result.path;
                  setIsOpen(false);
                }}
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  {result.title}
                </div>
                {result.keywords.length > 0 && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Keywords: {result.keywords.join(", ")}
                  </div>
                )}
              </a>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 dark:text-gray-400">
              Type at least 2 characters to search
            </div>
          )}
        </div>
      )}
    </div>
  );
}
