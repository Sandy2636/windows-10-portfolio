// src/components/Applications/BlogWriter.tsx
"use client";
import React, { useState, useEffect, lazy, Suspense } from "react";
// For Monaco Editor (npm install @monaco-editor/react)
// const MonacoEditor = lazy(() => import('@monaco-editor/react')); // Lazy load for performance

// Placeholder for Monaco Editor until you integrate it
const EditorPlaceholder = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full h-full p-2 border border-win-gray rounded-sm font-mono text-sm outline-none focus:border-win-blue resize-none"
    placeholder="Start writing your Markdown here..."
  />
);

interface BlogWriterProps {
  windowId: string;
  // Props for loading existing post for editing (e.g., postSlug, initialContent)
  postSlug?: string;
  initialContent?: string;
  initialTitle?: string;
}

export default function BlogWriter({
  windowId,
  postSlug,
  initialContent = "",
  initialTitle = "",
}: BlogWriterProps) {
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(postSlug || "");
  const [tags, setTags] = useState(""); // Comma-separated
  const [description, setDescription] = useState("");
  const [markdownContent, setMarkdownContent] = useState(initialContent);
  const [htmlPreview, setHtmlPreview] = useState(""); // For live preview
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    // If using lazy-loaded Monaco, this indicates it's ready
    setIsEditorReady(true);
  }, []);

  useEffect(() => {
    // Simulate Markdown to HTML conversion for preview (replace with actual Markdown parser like 'marked' or 'showdown')
    // For a real app, debounce this or update on blur for performance
    if (typeof window !== "undefined" && (window as any).marked) {
      // Check if marked.js is loaded (example)
      setHtmlPreview((window as any).marked.parse(markdownContent));
    } else {
      setHtmlPreview(
        `<p><em>Preview requires a Markdown parser. Current content:</em></p><pre>${markdownContent
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</pre>`
      );
    }
  }, [markdownContent]);

  const handleSave = async () => {
    console.log("Saving post:", {
      title,
      slug,
      tags,
      description,
      markdownContent,
    });
    // API call to save the post (e.g., POST to /api/blog)
    // Example:
    // const response = await fetch('/api/blog', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ slug, title, date: new Date().toISOString(), tags: tags.split(','), description, content: markdownContent }),
    // });
    // if (response.ok) alert('Post saved!'); else alert('Error saving post.');
    alert("Save action triggered (implement API call).");
  };

  const handlePublish = () => {
    console.log("Publishing post...");
    // Similar to save, but might set a 'published' flag or trigger a build
    alert("Publish action triggered (implement API call).");
  };

  return (
    <div className="flex flex-col h-full bg-win-gray-light font-segoe-ui text-sm text-black select-none">
      {/* 1. Toolbar / Action Bar */}
      <div className="p-2 border-b border-win-gray bg-win-white flex-shrink-0">
        <div className="flex flex-wrap gap-x-4 gap-y-2 items-end">
          <div className="flex-grow min-w-[200px]">
            <label
              htmlFor={`title-${windowId}`}
              className="block text-xs font-medium text-gray-700 mb-0.5"
            >
              Title
            </label>
            <input
              type="text"
              id={`title-${windowId}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-[26px] px-2 py-1 border border-win-gray-dark rounded-sm outline-none focus:border-win-blue text-xs"
              placeholder="Blog Post Title"
            />
          </div>
          <div className="flex-grow min-w-[150px]">
            <label
              htmlFor={`slug-${windowId}`}
              className="block text-xs font-medium text-gray-700 mb-0.5"
            >
              Slug
            </label>
            <input
              type="text"
              id={`slug-${windowId}`}
              value={slug}
              onChange={(e) =>
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))
              }
              className="w-full h-[26px] px-2 py-1 border border-win-gray-dark rounded-sm outline-none focus:border-win-blue text-xs"
              placeholder="your-post-slug"
            />
          </div>
          <div className="flex items-center gap-2 pt-3">
            <button
              onClick={handleSave}
              className="px-3 py-1 h-[26px] bg-win-blue text-white text-xs rounded-sm hover:bg-opacity-80 active:bg-opacity-90"
            >
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              className="px-3 py-1 h-[26px] bg-gray-600 text-white text-xs rounded-sm hover:bg-gray-700 active:bg-gray-800"
            >
              Publish
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
          <div className="flex-grow min-w-[200px]">
            <label
              htmlFor={`tags-${windowId}`}
              className="block text-xs font-medium text-gray-700 mb-0.5"
            >
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id={`tags-${windowId}`}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full h-[26px] px-2 py-1 border border-win-gray-dark rounded-sm outline-none focus:border-win-blue text-xs"
              placeholder="react, nextjs, portfolio"
            />
          </div>
          <div className="flex-grow min-w-[200px]">
            <label
              htmlFor={`desc-${windowId}`}
              className="block text-xs font-medium text-gray-700 mb-0.5"
            >
              Description (SEO)
            </label>
            <input
              type="text"
              id={`desc-${windowId}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-[26px] px-2 py-1 border border-win-gray-dark rounded-sm outline-none focus:border-win-blue text-xs"
              placeholder="Short summary for SEO"
            />
          </div>
        </div>
      </div>

      {/* 2. Editor and Preview Panes */}
      <div className="flex flex-grow overflow-hidden p-2 gap-2">
        {/* Editor Pane */}
        <div className="w-1/2 h-full flex flex-col">
          <h3 className="text-xs font-semibold mb-1 text-gray-600">
            Markdown Editor
          </h3>
          <div className="flex-grow border border-win-gray bg-white rounded-sm overflow-hidden">
            {/* <Suspense fallback={<div className="p-4">Loading Editor...</div>}>
              {isEditorReady && (
                <MonacoEditor
                  height="100%"
                  language="markdown"
                  value={markdownContent}
                  onChange={(value) => setMarkdownContent(value || '')}
                  theme="vs" // or 'vs-dark'
                  options={{ minimap: { enabled: false }, wordWrap: 'on', automaticLayout: true }}
                />
              )}
            </Suspense> */}
            <EditorPlaceholder
              value={markdownContent}
              onChange={setMarkdownContent}
            />
          </div>
        </div>

        {/* Preview Pane */}
        <div className="w-1/2 h-full flex flex-col">
          <h3 className="text-xs font-semibold mb-1 text-gray-600">
            Live Preview
          </h3>
          <div
            className="flex-grow border border-win-gray bg-white rounded-sm p-3 overflow-y-auto prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlPreview }}
          />
        </div>
      </div>
    </div>
  );
}
