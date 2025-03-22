import { useState, useEffect } from "react";

export default function TableOfContents({ activeSection }) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // Find all headings in the document
    const headingElements = Array.from(document.querySelectorAll("h2, h3"));

    // Map them to a more usable structure
    const extractedHeadings = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.textContent,
      level: parseInt(heading.tagName.substring(1)),
    }));

    setHeadings(extractedHeadings);
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="toc">
      <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        On this page
      </h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${heading.level === 3 ? "ml-4" : ""}`}
          >
            <a
              href={`#${heading.id}`}
              className={`block text-sm py-1 border-l-2 pl-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                activeSection === heading.id
                  ? "border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
                  : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
