import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { getMdxContent } from "../utils/loadMdxContent";
import { useScrollSpy } from "../hooks/useScrollSpy";
import TableOfContents from "../components/TableOfContents";
import { MDXProvider } from "@mdx-js/react";
import { components } from "../mdx-components";

// Import MDX files statically
import Overview from "../content/overview.mdx";
import Installation from "../content/installation.mdx";
import CoreConcepts from "../content/core-concepts.mdx";
import Usage from "../content/usage.mdx";
import AdvancedFeatures from "../content/advanced-features.mdx";
import ApiReference from "../content/api-reference.mdx";
import ContributingGuide from "../content/contributing-guide.mdx";
import License from "../content/license.mdx";

// Map of all content
const contentMap = {
  overview: Overview,
  installation: Installation,
  "core-concepts": CoreConcepts,
  usage: Usage,
  "advanced-features": AdvancedFeatures,
  "api-reference": ApiReference,
  contributing: ContributingGuide,
  license: License,
};

export default function DocPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const activeSection = useScrollSpy();

  // Redirect to overview if slug is not found
  useEffect(() => {
    if (slug && !contentMap[slug]) {
      console.error(`Content not found for slug: ${slug}`);
      setError("Content not found");
    } else {
      setError(null);
    }
  }, [slug]);

  if (error) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {error}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The requested content could not be loaded.
          </p>
          <button
            onClick={() => navigate("/overview")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Overview
          </button>
        </div>
      </MainLayout>
    );
  }

  // Get the content component based on the slug
  const Content = contentMap[slug] || contentMap["overview"];

  return (
    <MainLayout>
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <aside className="hidden lg:block lg:col-span-3">
          <nav className="sticky top-20">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <TableOfContents activeSection={activeSection} />
            </div>
          </nav>
        </aside>

        <article className="lg:col-span-9">
          <div
            className="prose dark:prose-invert prose-headings:font-heading max-w-none
            prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6
            prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:font-medium prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-gray-600 dark:prose-p:text-gray-300
            prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
            prose-code:text-blue-600 dark:prose-code:text-blue-400
            prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
            prose-pre:rounded-lg prose-pre:p-4
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-ul:list-disc prose-ul:pl-6
            prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-gray-600 dark:prose-li:text-gray-300
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500
            prose-blockquote:pl-4 prose-blockquote:italic
            prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-300
            prose-table:border-collapse prose-table:w-full
            prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600
            prose-th:bg-gray-100 dark:prose-th:bg-gray-800
            prose-th:p-2 prose-th:text-left
            prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600
            prose-td:p-2"
          >
            <MDXProvider components={components}>
              <Content />
            </MDXProvider>
          </div>
        </article>
      </div>
    </MainLayout>
  );
}
