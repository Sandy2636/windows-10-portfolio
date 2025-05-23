// src/components/Applications/GameViewer.tsx
"use client";
import React from "react";

interface GameViewerProps {
  windowId: string;
  gameUrl: string;
  gameName: string;
}

export default function GameViewer({
  windowId,
  gameUrl,
  gameName,
}: GameViewerProps) {
  return (
    <div className="flex flex-col h-full bg-black">
      {" "}
      {/* Black background for focus on game */}
      <iframe
        src={gameUrl}
        title={gameName}
        className="w-full h-full border-none"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation" // Common sandbox for games
        allowFullScreen // If the game supports it
      />
    </div>
  );
}
