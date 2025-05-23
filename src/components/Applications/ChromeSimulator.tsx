// src/components/Applications/ChromeSimulator.tsx
"use client";
import React, { useState, useRef, KeyboardEvent } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  LockClosedIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid"; // Using solid for Chrome-like feel

interface ChromeSimulatorProps {
  windowId: string;
  initialUrl?: string;
}

export default function ChromeSimulator({
  windowId,
  initialUrl = "https://www.google.com/webhp?igu=1",
}: ChromeSimulatorProps) {
  // igu=1 for minimal Google
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [displayUrl, setDisplayUrl] = useState(initialUrl); // For the address bar input
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigate = (url: string, type: "new" | "back" | "forward" = "new") => {
    let newUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      newUrl = "https://" + url;
    }
    setCurrentUrl(newUrl);
    setDisplayUrl(newUrl); // Update address bar immediately

    if (type === "new") {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newUrl);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    } else if (type === "back" && historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setCurrentUrl(history[historyIndex - 1]);
      setDisplayUrl(history[historyIndex - 1]);
    } else if (type === "forward" && historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setCurrentUrl(history[historyIndex + 1]);
      setDisplayUrl(history[historyIndex + 1]);
    }
  };

  const handleAddressBarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(displayUrl);
  };

  const handleAddressBarKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(displayUrl);
    }
  };

  const handleBack = () => navigate(history[historyIndex - 1], "back");
  const handleForward = () => navigate(history[historyIndex + 1], "forward");
  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = "about:blank"; // Clear first to avoid issues
      setTimeout(() => {
        if (iframeRef.current) iframeRef.current.src = currentUrl;
      }, 50);
    }
  };

  // Update displayUrl when iframe navigates (if possible and allowed by same-origin policy)
  // This is tricky and often not fully possible due to security restrictions with iframes.
  // For a simulator, we mostly control navigation via our own address bar.
  // useEffect(() => {
  //    const iframe = iframeRef.current;
  //    const handleLoad = () => {
  //        try {
  //            if (iframe && iframe.contentWindow && iframe.contentWindow.location.href !== 'about:blank') {
  //                const newUrl = iframe.contentWindow.location.href;
  //                setDisplayUrl(newUrl);
  //                // Potentially update history here too, but be careful of loops
  //            }
  //        } catch (e) {
  //            console.warn("Cannot access iframe location due to security restrictions.");
  //        }
  //    };
  //    if (iframe) iframe.addEventListener('load', handleLoad);
  //    return () => {
  //        if (iframe) iframe.removeEventListener('load', handleLoad);
  //    };
  // }, [currentUrl]);

  return (
    <div className="flex flex-col h-full bg-[#dee1e6] font-segoe-ui text-sm text-black">
      {/* 1. Navigation Bar - Chrome-like styling */}
      <div className="h-[38px] bg-[#dee1e6] border-b border-gray-400/80 flex items-center px-2 py-1.5 gap-1.5 flex-shrink-0">
        <button
          onClick={handleBack}
          disabled={historyIndex === 0}
          className="p-1 rounded-full hover:bg-black/10 disabled:opacity-50"
        >
          <ArrowLeftIcon className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={handleForward}
          disabled={historyIndex === history.length - 1}
          className="p-1 rounded-full hover:bg-black/10 disabled:opacity-50"
        >
          <ArrowRightIcon className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={handleReload}
          className="p-1 rounded-full hover:bg-black/10"
        >
          <ArrowPathIcon className="w-4 h-4 text-gray-700" />
        </button>
        <form onSubmit={handleAddressBarSubmit} className="flex-grow mx-1">
          <div className="flex items-center bg-[#f1f3f4] rounded-full h-[28px] px-1 border border-transparent focus-within:bg-white focus-within:border-gray-400/90 focus-within:shadow-sm">
            {currentUrl.startsWith("https://") ? (
              <LockClosedIcon className="w-3.5 h-3.5 text-gray-600 ml-1.5 mr-1 flex-shrink-0" />
            ) : (
              <GlobeAltIcon className="w-3.5 h-3.5 text-gray-600 ml-1.5 mr-1 flex-shrink-0" />
            )}
            <input
              type="text"
              value={displayUrl}
              onChange={(e) => setDisplayUrl(e.target.value)}
              onKeyDown={handleAddressBarKeyDown}
              className="w-full h-full bg-transparent text-xs outline-none text-gray-800 placeholder-gray-500"
              placeholder="Search Google or type a URL"
            />
          </div>
        </form>
        {/* Add extension icons or profile icon here for more detail */}
      </div>

      {/* 2. Content Area (Iframe) */}
      <div className="flex-grow bg-white border-t border-gray-300">
        {" "}
        {/* Border helps delineate iframe area */}
        <iframe
          ref={iframeRef}
          src={currentUrl}
          title="Web Browser Content"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation" // Adjust sandbox as needed
          onError={() => console.error(`Error loading URL: ${currentUrl}`)}
        />
      </div>
    </div>
  );
}
