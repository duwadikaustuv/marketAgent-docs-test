import { Diagram } from "./components/Diagram";
import CodeBlock from "./components/CodeBlock";

export const components = {
  h1: (props) => (
    <h1
      {...props}
      className="text-4xl font-bold mb-8 text-gray-900 dark:text-white"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      className="text-3xl font-semibold mt-12 mb-6 text-gray-900 dark:text-white"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="text-2xl font-medium mt-8 mb-4 text-gray-900 dark:text-white"
    />
  ),
  p: (props) => (
    <p
      {...props}
      className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
    />
  ),
  a: (props) => (
    <a
      {...props}
      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
    />
  ),
  code: (props) => {
    const isInline = !props.className;
    if (isInline) {
      return (
        <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-sm">
          {props.children}
        </code>
      );
    }
    return props.children;
  },
  pre: (props) => {
    const language =
      props.children?.props?.className?.replace("language-", "") || "text";
    const title = props.children?.props?.title;

    return (
      <CodeBlock language={language} title={title}>
        {props.children?.props?.children}
      </CodeBlock>
    );
  },
  ul: (props) => <ul {...props} className="list-disc pl-6 mb-6 space-y-2" />,
  ol: (props) => <ol {...props} className="list-decimal pl-6 mb-6 space-y-2" />,
  li: (props) => <li {...props} className="text-gray-600 dark:text-gray-300" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-300 mb-6 bg-gray-50 dark:bg-gray-800 py-2"
    />
  ),
  table: (props) => (
    <div className="overflow-x-auto mb-6">
      <table
        {...props}
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
      />
    </div>
  ),
  th: (props) => (
    <th
      {...props}
      className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800"
    />
  ),
  td: (props) => (
    <td
      {...props}
      className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700"
    />
  ),
  Diagram,
};

export function useMDXComponents(components) {
  return {
    ...components,
    pre: (props) => {
      const language =
        props.children?.props?.className?.replace("language-", "") || "text";
      const title = props.children?.props?.title;

      return (
        <CodeBlock language={language} title={title}>
          {props.children?.props?.children}
        </CodeBlock>
      );
    },
    code: (props) => {
      const isInline = !props.className;
      if (isInline) {
        return (
          <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-sm">
            {props.children}
          </code>
        );
      }
      return props.children;
    },
  };
}
