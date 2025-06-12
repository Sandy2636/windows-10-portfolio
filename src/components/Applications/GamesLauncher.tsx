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
    id: "stickman_parkour",
    name: "Stickman Parkour",
    icon: "https://www.onlinegames.io/media/posts/871/responsive/stickman-parkour-OG-lg.jpg",
    embedUrl:
      "https://cloud.onlinegames.io/games/2024/construct/219/stickman-parkour/index-og.html",
    iconColor: "text-green-600",
    size: { width: 400, height: 500 },
  },
  {
    id: "apocalypse_truck",
    name: "Apocalypse Truck",
    icon: "https://www.onlinegames.io/media/posts/1015/responsive/apocalypse-truck-lg.jpg",
    embedUrl:
      "https://cloud.onlinegames.io/games/2021/1/apocalypse-truck/index-og.html",
    iconColor: "text-purple-500",
    size: { width: 550, height: 750 },
  },
  {
    id: "flight_simulator",
    name: "Flight Simulator",
    icon: "https://www.onlinegames.io/media/posts/342/responsive/Real-Flight-Simulator-2-lg.jpg",
    embedUrl:
      "https://cloud.onlinegames.io/games/2023/unity2/real-flight-simulator/index.html",
    iconColor: "text-purple-500",
    size: { width: 550, height: 750 },
  },
  {
    id: "gta",
    name: "GTA Simulator",
    icon: "https://www.onlinegames.io/media/posts/416/responsive/GTA-Simulator-lg.jpg",
    embedUrl:
      "https://www.onlinegames.io/games/2023/unity2/gta-simulator/index.html",
    iconColor: "text-yellow-500",
    size: { width: 600, height: 700 },
  },

  // Add more games. Find reliable embed URLs. Some sites might block iframe embedding.
  // Example of an archive.org embed:
  // { id: 'donkeykong', name: 'Donkey Kong', icon: BeakerIcon, embedUrl: 'https://archive.org/embed/arcade_dkong' }
];

interface GamesLauncherProps {
  windowId: string;
}

export default function GamesLauncher({ windowId }: GamesLauncherProps) {
  const { openWindow, dispatch } = useWindowManager();

  const launchGame = (game: (typeof availableGames)[0]) => {
    openWindow({
      type: "GAME_VIEWER", // A new window type for viewing games
      title: game.name,
      icon: "/icons/Games.png", // Generic game controller icon for the taskbar for GameViewer
      component: GameViewer, // This component will host the iframe
      props: { gameUrl: game.embedUrl, gameName: game.name },
      initialSize: game.size || { width: 800, height: 600 },
      unique: true,
    });
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#1f2937] via-[#374151] to-[#111827] font-segoe-ui text-sm text-white p-4 select-none">
      <h2 className="text-2xl font-bold text-yellow-300 mb-5 text-center tracking-wide">
        🎮 Game Center
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 overflow-y-auto flex-grow px-1">
        {availableGames.map((game) => {
          const IconComponent = game.icon;
          return (
            <button
              key={game.id}
              onClick={() => launchGame(game)}
              className="aspect-square flex flex-col items-center justify-center p-4 bg-white/10 border border-white/20 rounded-xl shadow-md backdrop-blur-sm
                       hover:bg-yellow-200/10 hover:shadow-yellow-300/40 transition-all duration-200 ease-in-out transform hover:scale-105"
              title={`Play ${game.name}`}
            >
              <img src={game.icon} className={`w-14 h-14 mb-3}`} />
              <span className="text-sm font-semibold text-center text-white tracking-wide">
                {game.name}
              </span>
            </button>
          );
        })}
        {availableGames.length === 0 && (
          <p className="col-span-full text-center text-gray-300 mt-10 text-lg">
            🚫 No games available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
