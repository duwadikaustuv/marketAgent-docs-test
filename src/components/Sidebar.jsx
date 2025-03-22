import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Close as CloseIcon } from "@mui/icons-material";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Overview", href: "/overview" },
  { name: "Installation", href: "/installation" },
  { name: "Core Concepts", href: "/core-concepts" },
  { name: "Usage Guide", href: "/usage" },
  { name: "Advanced Features", href: "/advanced-features" },
  { name: "API Reference", href: "/api-reference" },
  { name: "Contributing", href: "/contributing-guide" },
  { name: "License", href: "/license" },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const activeSection = useScrollSpy(["h2", "h3"], 100);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    setActiveItem(location.pathname.slice(1));
  }, [location]);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-50 w-72 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Documentation
            </h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <Link
              to="/"
              onClick={onClose}
              className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === "/"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Overview
            </Link>
            <Link
              to="/installation"
              onClick={onClose}
              className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === "/installation"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Installation
            </Link>
            <Link
              to="/core-concepts"
              onClick={onClose}
              className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === "/core-concepts"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Core Concepts
            </Link>
            <Link
              to="/usage"
              onClick={onClose}
              className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === "/usage"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Usage
            </Link>
            <Link
              to="/advanced-features"
              onClick={onClose}
              className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === "/advanced-features"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Advanced Features
            </Link>
            <Link
              to="/api-reference"
              onClick={onClose}
              className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === "/api-reference"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              API Reference
            </Link>
            <Link
              to="/contributing"
              onClick={onClose}
              className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === "/contributing"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Contributing
            </Link>
            <Link
              to="/license"
              onClick={onClose}
              className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === "/license"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              License
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Need help?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Check out our examples and documentation on GitHub.
                </p>
              </div>
              <a
                href="https://github.com/marketagents-ai/MarketAgents/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 text-sm font-medium text-center text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-200"
              >
                Open an Issue
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
