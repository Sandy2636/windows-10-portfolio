// src/components/Applications/GamesLauncher.tsx
"use client";
import React from "react";
import {
  PuzzlePieceIcon,
  RocketLaunchIcon,
  FlagIcon,
} from "@heroicons/react/24/solid"; // Example icons
import { useWindowManager } from "@/contexts/WindowManagerContext"; // To open game windows
import GameViewer from "./GameViewer"; // Assume GameViewer component exists

// Define your embeddable games
const availableGames = [
  {
    id: "2048",
    name: "2048",
    icon: PuzzlePieceIcon,
    embedUrl: "https://play2048.co/",
    iconColor: "text-purple-500",
    size: { width: 550, height: 750 },
  },
  {
    id: "pacman",
    name: "Pac-Man",
    icon: RocketLaunchIcon,
    embedUrl: "https://cdn.htmlgames.com/Pacsman/",
    iconColor: "text-yellow-500",
    size: { width: 600, height: 700 },
  },
  {
    id: "minesweeper",
    name: "Minesweeper",
    icon: FlagIcon,
    embedUrl: "https://minesweeper.online/start/easy",
    iconColor: "text-green-600",
    size: { width: 400, height: 500 },
  },
  // Add more games. Find reliable embed URLs. Some sites might block iframe embedding.
  // Example of an archive.org embed:
  // { id: 'donkeykong', name: 'Donkey Kong', icon: BeakerIcon, embedUrl: 'https://archive.org/embed/arcade_dkong' }
];

interface GamesLauncherProps {
  windowId: string;
}

export default function GamesLauncher({ windowId }: GamesLauncherProps) {
  const { openWindow } = useWindowManager();

  const launchGame = (game: (typeof availableGames)[0]) => {
    openWindow({
      type: "GAME_VIEWER", // A new window type for viewing games
      title: game.name,
      icon: "/icons/controller.svg", // Generic game controller icon for the taskbar for GameViewer
      component: GameViewer, // This component will host the iframe
      props: { gameUrl: game.embedUrl, gameName: game.name },
      initialSize: game.size || { width: 800, height: 600 },
      unique: false, // Allow multiple game windows, or set to true with game.id as part of type for uniqueness per game
    });
  };

  return (
    <div className="flex flex-col h-full bg-win-gray-light font-segoe-ui text-sm text-black p-3 select-none">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Game Center</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-auto flex-grow">
        {availableGames.map((game) => {
          const IconComponent = game.icon;
          return (
            <button
              key={game.id}
              onClick={() => launchGame(game)}
              className="aspect-square flex flex-col items-center justify-center p-3 bg-white rounded-md shadow
                         hover:shadow-lg hover:bg-win-blue/10 transition-all transform hover:scale-105"
              title={`Play ${game.name}`}
            >
              <IconComponent
                className={`w-12 h-12 mb-2 ${
                  game.iconColor || "text-gray-700"
                }`}
              />
              <span className="text-xs font-medium text-center text-gray-800">
                {game.name}
              </span>
            </button>
          );
        })}
        {availableGames.length === 0 && (
          <p className="col-span-full text-center text-gray-500 mt-10">
            No games available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
