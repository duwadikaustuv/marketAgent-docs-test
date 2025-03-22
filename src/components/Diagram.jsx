import { useEffect, useRef } from "react";
import mermaid from "mermaid";

export const Diagram = ({ children, id }) => {
  const diagramRef = useRef(null);

  useEffect(() => {
    if (diagramRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: "default",
        securityLevel: "loose",
      });
      mermaid.render(id, children).then(({ svg }) => {
        diagramRef.current.innerHTML = svg;
      });
    }
  }, [children, id]);

  return (
    <div className="my-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div ref={diagramRef} className="flex justify-center" />
    </div>
  );
};
