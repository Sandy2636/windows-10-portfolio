// src/components/Applications/ResumeViewer.tsx
"use client";
import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

interface ResumeViewerProps {
  windowId: string;
  pdfPath?: string; // Path to the PDF in the /public folder
}

export default function ResumeViewer({
  windowId,
  pdfPath = "/resume.pdf",
}: ResumeViewerProps) {
  return (
    <div className="flex flex-col h-full bg-gray-700 font-segoe-ui text-sm">
      {" "}
      {/* PDF Display Area */}
      <div className="flex-grow">
        <iframe
          src={pdfPath}
          title="Resume PDF Viewer"
          className="w-full h-full border-none"
          // Browsers have built-in PDF viewers. No complex library needed for simple display.
        />
      </div>
    </div>
  );
}
