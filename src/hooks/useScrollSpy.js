import { useEffect, useState, useCallback } from "react";

export const useScrollSpy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const updateActiveSection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: "0px 0px -80% 0px",
      threshold: 0.1,
    });

    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent.toLowerCase().replace(/\s+/g, "-");
      }
      observer.observe(heading);
    });

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [updateActiveSection]);

  return activeSection;
};
