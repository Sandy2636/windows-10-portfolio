// src/components/Applications/SourceCodeViewer.tsx
"use client";
import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  FolderIcon,
  MagnifyingGlassIcon,
  CodeBracketSquareIcon,
  DocumentIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

// Lazy load Monaco Editor
const MonacoEditor = lazy(() => import("@monaco-editor/react"));

// Dummy file structure for the sidebar
const projectFileStructure = {
  src: {
    type: "folder",
    children: {
      app: {
        type: "folder",
        children: {
          "(desktop)": {
            type: "folder",
            children: {
              "layout.tsx": { type: "file", language: "typescript" },
              "page.tsx": { type: "file", language: "typescript" },
            },
          },
          "globals.css": { type: "file", language: "css" },
          "layout.tsx": { type: "file", language: "typescript" },
          "page.tsx": { type: "file", language: "typescript" },
        },
      },
      components: {
        type: "folder",
        children: {
          Windows: {
            type: "folder",
            children: {
              "WindowFrame.tsx": { type: "file", language: "typescript" },
            },
          },
          Desktop: {
            type: "folder",
            children: {
              "Desktop.tsx": { type: "file", language: "typescript" },
            },
          },
        },
      },
      contexts: {
        type: "folder",
        children: {
          "WindowManagerContext.tsx": { type: "file", language: "typescript" },
        },
      },
    },
  },
  public: {
    type: "folder",
    children: { "wallpaper.jpg": { type: "file", language: "plaintext" } },
  },
  "package.json": { type: "file", language: "json" },
  "tailwind.config.js": { type: "file", language: "javascript" },
};

// Dummy code content for files (replace with actual fetched content or more detailed dummies)
const fileContents: Record<string, string> = {
  "src/app/(desktop)/layout.tsx": `// Desktop Layout: Manages the overall desktop view\nexport default function DesktopLayout({ children }) {\n  return (\n    <WindowManagerProvider>\n       {/* ... */}\n    </WindowManagerProvider>\n  );\n}`,
  "src/components/Windows/WindowFrame.tsx": `// WindowFrame: The shell for all application windows\nimport Draggable from 'react-draggable';\nexport default function WindowFrame({ title, children, ... }) {\n  return <Draggable>...</Draggable>;\n}`,
  "package.json": `{ "name": "windows10-portfolio", "version": "0.1.0", "private": true, ... }`,
  "tailwind.config.js": `module.exports = { theme: { extend: { colors: { 'win-blue': '#0078D7' } } } }`,
  default: "// Select a file to view its content.",
};

interface SourceCodeViewerProps {
  windowId: string;
}

export default function SourceCodeViewer({ windowId }: SourceCodeViewerProps) {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [code, setCode] = useState<string>(fileContents["default"]);
  const [language, setLanguage] = useState<string>("plaintext");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    if (activeFile && fileContents[activeFile]) {
      setCode(fileContents[activeFile]);
      // Infer language from file extension (simplified)
      const ext = activeFile.split(".").pop();
      if (ext === "tsx" || ext === "ts") setLanguage("typescript");
      else if (ext === "js") setLanguage("javascript");
      else if (ext === "json") setLanguage("json");
      else if (ext === "css") setLanguage("css");
      else setLanguage("plaintext");
    } else if (activeFile) {
      setCode(`// Content for ${activeFile} not found.`);
      setLanguage("plaintext");
    }
  }, [activeFile]);

  const renderFileTree = (structure: any, currentPath = "") => {
    return Object.entries(structure).map(([name, item]: [string, any]) => {
      const path = currentPath ? `${currentPath}/${name}` : name;
      return (
        <div key={path} className="ml-2">
          {item.type === "folder" ? (
            <div>
              <div className="flex items-center py-0.5 cursor-pointer hover:bg-[#2a2d2e]">
                <FolderIcon className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-300">{name}</span>
              </div>
              {renderFileTree(item.children, path)}
            </div>
          ) : (
            <button
              onClick={() => setActiveFile(path)}
              className={`w-full text-left flex items-center py-0.5 pl-1 pr-1 rounded-sm
                          ${
                            activeFile === path
                              ? "bg-[#37373d]"
                              : "hover:bg-[#2a2d2e]"
                          }`}
            >
              <DocumentIcon className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-300 truncate">{name}</span>
            </button>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex h-full bg-[#1e1e1e] text-gray-300 font-segoe-ui text-sm select-none">
      {/* 1. Activity Bar */}
      <div className="w-12 bg-[#333333] flex flex-col items-center py-2 space-y-3 flex-shrink-0">
        <button
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          title="Explorer"
          className={`p-2 rounded ${
            isSidebarVisible ? "bg-win-blue/30" : "hover:bg-white/10"
          }`}
        >
          <FolderIcon className="w-5 h-5 text-gray-300" />
        </button>
        <button
          title="Search (Not Implemented)"
          className="p-2 rounded hover:bg-white/10 opacity-50 cursor-not-allowed"
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-300" />
        </button>
        <button
          title="Source Control (Not Implemented)"
          className="p-2 rounded hover:bg-white/10 opacity-50 cursor-not-allowed"
        >
          <ShareIcon className="w-5 h-5 text-gray-300" />{" "}
          {/* Placeholder icon */}
        </button>
        <a
          href="https://github.com/yourusername/your-portfolio-repo" // Replace with your actual repo URL
          target="_blank"
          rel="noopener noreferrer"
          title="View on GitHub"
          className="p-2 rounded hover:bg-white/10 mt-auto"
        >
          <svg
            className="w-5 h-5 text-gray-300"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </div>

      {/* 2. Sidebar (File Explorer) */}
      {isSidebarVisible && (
        <div className="w-56 bg-[#252526] p-1.5 border-r border-[#333333] overflow-y-auto flex-shrink-0">
          <h3 className="text-xs font-semibold text-gray-400 uppercase px-1 mb-1.5">
            Explorer
          </h3>
          {renderFileTree(projectFileStructure)}
        </div>
      )}

      {/* 3. Editor Group & Tabs & Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tab Bar (Simplified) */}
        <div className="h-[30px] bg-[#252526] flex items-end border-b border-[#1e1e1e] flex-shrink-0">
          {activeFile && (
            <div className="px-3 py-1.5 text-xs bg-[#1e1e1e] text-gray-200 border-r border-[#252526] flex items-center">
              <DocumentIcon className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
              {activeFile.split("/").pop()}
              {/* Add close icon for tab later */}
            </div>
          )}
          {/* Add more tabs if multiple files are open */}
        </div>
        <div className="flex-grow relative bg-[#1e1e1e]">
          <Suspense
            fallback={
              <div className="p-4 text-gray-400 text-center">
                Loading Code Editor...
              </div>
            }
          >
            <MonacoEditor
              height="100%" // Or use `wrapperProps={{ style: { height: '100%' } }}`
              language={language}
              value={code}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: true },
                fontSize: 13,
                wordWrap: "on",
                automaticLayout: true, // Important for resizing
                scrollBeyondLastLine: false,
                contextmenu: false, // Disable built-in context menu for simplicity
              }}
              // onMount={(editor, monaco) => console.log('Monaco editor mounted')}
            />
          </Suspense>
        </div>
        {/* 4. Status Bar */}
        <div className="h-[22px] bg-[#007acc] text-white flex items-center justify-between px-3 text-xs flex-shrink-0">
          <div>{activeFile ? `Ln 1, Col 1 (Simulated)` : "Ready"}</div>
          <div>{language}</div>
        </div>
      </div>
    </div>
  );
}
