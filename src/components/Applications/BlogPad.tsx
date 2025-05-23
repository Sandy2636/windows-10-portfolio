// src/components/Applications/BlogPad.tsx
"use client";
import { useState, useEffect } from "react";
// When fetching real data:
// import { getPostData } from '@/lib/blog'; // Assuming this can be adapted for client or an API route
// import { getMDXComponent } from 'mdx-bundler/client';
// import { useMemo } from 'react';

interface BlogPadProps {
  slug?: string; // If opening a specific post directly
  filePath?: string; // If opening from File Explorer (e.g., 'C:/BlogArticles/my-post.mdx')
  windowId: string;
  title: string; // Passed from WindowManager, initial title
}

export default function BlogPad({
  slug,
  filePath,
  windowId,
  title: initialWindowTitle,
}: BlogPadProps) {
  const [postMdxContent, setPostMdxContent] = useState<string | null>(null); // Stores the raw MDX string
  const [currentWindowTitle, setCurrentWindowTitle] = useState(
    initialWindowTitle || "Untitled - BlogPad"
  );
  const [loading, setLoading] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [wordWrap, setWordWrap] = useState(true);

  // const MDXComponent = useMemo(() => {
  //   if (postMdxContent) {
  //     try {
  //       return getMDXComponent(postMdxContent); // This assumes postMdxContent is *already bundled code*
  //     } catch (e) {
  //       console.error("Error getting MDX component:", e);
  //       return () => <p className="text-red-500">Error rendering content.</p>;
  //     }
  //   }
  //   return () => <p>No content loaded.</p>;
  // }, [postMdxContent]);

  useEffect(() => {
    const targetIdentifier =
      slug ||
      (filePath
        ? filePath
            .split("/")
            .pop()
            ?.replace(/\.(md|mdx)$/, "")
        : null);

    if (targetIdentifier) {
      setLoading(true);
      setCurrentWindowTitle(`${targetIdentifier} - BlogPad`);
      // TODO: Implement actual fetching and MDX bundling
      // This would involve an API call if mdx-bundler is on the server
      // For example: fetch(`/api/blog-content?slug=${targetIdentifier}`).then(res => res.json()).then(data => { ... })
      console.log(`Simulating fetch for: ${targetIdentifier}`);
      setTimeout(() => {
        // Simulate fetched Markdown content
        const fetchedMd = `# ${targetIdentifier}\n\nThis is the simulated content for **${targetIdentifier}**.\n\n- List item 1\n- List item 2\n\n*Emphasized text.*`;
        // In a real scenario with mdx-bundler, you'd get 'code' (the bundled JS) and 'frontmatter'
        // For now, we'll just store the raw MD string and won't render it as MDX for simplicity here.
        // To render MDX, you need to call bundleMDX (server-side or API route) and then use getMDXComponent with the result.
        setPostMdxContent(fetchedMd);
        setLoading(false);
      }, 500);
    } else {
      setPostMdxContent(
        "Click File > Open to load a blog post, or open one from File Explorer."
      );
      setCurrentWindowTitle("Untitled - BlogPad");
    }
  }, [slug, filePath]);

  // Menu bar items (very simplified, actions are mostly console logs)
  const menu = {
    File: [
      { name: "Open...", action: () => console.log("Open clicked") },
      { name: "Save", action: () => console.log("Save clicked (simulated)") },
      {
        name: "Save As...",
        action: () => console.log("Save As clicked (simulated)"),
      },
      { name: "---" }, // Separator
      {
        name: "Exit",
        action: () =>
          console.log("Exit BlogPad - TODO: Call closeWindow(windowId)"),
      },
    ],
    Edit: [
      { name: "Undo", action: () => console.log("Undo") },
      { name: "---" },
      { name: "Cut", action: () => console.log("Cut") },
      { name: "Copy", action: () => console.log("Copy") },
      { name: "Paste", action: () => console.log("Paste") },
    ],
    Format: [
      {
        name: "Word Wrap",
        checked: wordWrap,
        action: () => setWordWrap(!wordWrap),
      },
      { name: "Font...", action: () => console.log("Font dialog") },
    ],
    View: [
      {
        name: "Zoom",
        subMenu: [
          { name: "Zoom In" },
          { name: "Zoom Out" },
          { name: "Restore Default Zoom" },
        ],
      },
      {
        name: "Status Bar",
        checked: showStatusBar,
        action: () => setShowStatusBar(!showStatusBar),
      },
    ],
    Help: [
      { name: "About BlogPad", action: () => console.log("About BlogPad") },
    ],
  };

  // For this simpler text display, we won't use MDXComponent yet.
  // Just display postMdxContent in a textarea.
  // If you want full MDX rendering, you need to adapt the mdx-bundler flow.

  return (
    <div className="flex flex-col h-full bg-win-white font-[Consolas,'Courier_New',monospace] text-black text-[11pt] select-none">
      {/* 1. Menu Bar */}
      <div className="h-[21px] bg-win-gray-light border-b border-win-gray flex items-center px-1.5 flex-shrink-0 text-xs">
        {Object.entries(menu).map(([menuName, items]) => (
          <div key={menuName} className="relative group">
            <button className="px-1.5 py-0.5 hover:bg-win-blue hover:text-white active:bg-win-blue active:text-white focus:bg-win-blue focus:text-white">
              {menuName}
            </button>
            {/* Basic Dropdown (improve with proper positioning and click-away) */}
            <div className="absolute left-0 top-full bg-win-gray-light border border-win-gray-dark shadow-md py-0.5 hidden group-focus-within:block group-hover:block min-w-[160px] z-10">
              {items.map((item, index) =>
                item.name === "---" ? (
                  <div
                    key={index}
                    className="h-px bg-win-gray-dark my-0.5 mx-1"
                  />
                ) : (
                  <button
                    key={item.name}
                    onClick={item.action}
                    className="w-full text-left px-2 py-0.5 hover:bg-win-blue hover:text-white flex justify-between items-center"
                  >
                    {item.name}
                    {/* @ts-ignore */}
                    {item.checked !== undefined && (
                      // @ts-ignore
                      <span className="text-xs">{item.checked ? "✓" : ""}</span>
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Main Text Area */}
      <div className="flex-grow overflow-hidden p-0.5">
        {loading ? (
          <div className="p-2">Loading content...</div>
        ) : (
          <textarea
            readOnly // For a reader. For an editor, this would be false.
            value={postMdxContent || ""}
            className={`w-full h-full bg-win-white border-none outline-none resize-none font-[Consolas,'Courier_New',monospace] text-[11pt] leading-normal
                        ${
                          wordWrap
                            ? "whitespace-pre-wrap break-words"
                            : "whitespace-pre overflow-auto"
                        }`}
            spellCheck="false"
          />
        )}
        {/* If you were rendering MDX:
           <div className="prose prose-sm max-w-none p-2 overflow-y-auto h-full">
             <MDXComponent />
           </div>
        */}
      </div>

      {/* 3. Status Bar (Optional) */}
      {showStatusBar && (
        <div className="h-[22px] bg-win-gray-light border-t border-win-gray px-3 flex items-center justify-end text-xs text-gray-600 flex-shrink-0">
          {/* Placeholder status items */}
          <span>Ln 1, Col 1</span>
          <span className="w-px h-3 bg-win-gray-dark mx-2"></span>
          <span>100%</span>
          <span className="w-px h-3 bg-win-gray-dark mx-2"></span>
          <span>Windows (CRLF)</span>
          <span className="w-px h-3 bg-win-gray-dark mx-2"></span>
          <span>UTF-8</span>
        </div>
      )}
    </div>
  );
}
