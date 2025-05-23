// src/components/StartMenu/StartMenu.tsx
"use client";
import Image from "next/image";
import {
  PowerIcon,
  CogIcon,
  UserCircleIcon,
  DocumentTextIcon,
  FolderIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline"; // Example icons
// import StartMenuTile from './StartMenuTile';

interface StartMenuProps {
  onClose: () => void; // Function to close the start menu
}

export default function StartMenu({ onClose }: StartMenuProps) {
  // Dummy data for tiles
  const pinnedItems = [
    {
      id: "project1",
      name: "Project Showcase",
      icon: FolderIcon,
      type: "project",
      action: () => console.log("Open Project 1"),
    },
    {
      id: "blog-react",
      name: "React Posts",
      icon: HashtagIcon,
      type: "blog_category",
      action: () => console.log("Open React Category"),
    },
    {
      id: "resume-tile",
      name: "My Resume",
      icon: DocumentTextIcon,
      type: "resume",
      action: () => console.log("Open Resume"),
    },
  ];

  return (
    <div
      className="fixed bottom-10 left-0 w-[500px] h-[600px] bg-black/70 backdrop-blur-lg shadow-lg text-win-white
                 flex animate-slide-up z-40" // Animation from tailwind.config.js
    >
      {/* Left Panel */}
      <div className="w-12 bg-black/30 flex flex-col items-center py-2">
        <button className="p-2 hover:bg-white/20 rounded w-full mb-auto">
          {/* Hamburger icon or similar */}
          <svg
            className="w-6 h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <button title="User" className="p-2 hover:bg-white/20 rounded w-full">
          <UserCircleIcon className="w-6 h-6 mx-auto" />
        </button>
        <button
          title="Settings"
          className="p-2 hover:bg-white/20 rounded w-full"
        >
          <CogIcon className="w-6 h-6 mx-auto" />
        </button>
        <button title="Power" className="p-2 hover:bg-white/20 rounded w-full">
          <PowerIcon className="w-6 h-6 mx-auto" />
        </button>
      </div>

      {/* Middle Panel (Apps list - simplified for now) */}
      <div className="w-[200px] p-4 overflow-y-auto">
        <h3 className="text-sm font-semibold mb-2">Recently added</h3>
        {/* List apps here */}
        <div className="text-sm py-1 px-2 hover:bg-white/10 cursor-pointer">
          Calculator
        </div>
        <div className="text-sm py-1 px-2 hover:bg-white/10 cursor-pointer">
          Calendar
        </div>
        <div className="text-sm py-1 px-2 hover:bg-white/10 cursor-pointer">
          Mail
        </div>
      </div>

      {/* Right Panel (Tiles) */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2">Pinned Tiles</h3>
        <div className="grid grid-cols-2 gap-2">
          {pinnedItems.map((item) => (
            // <StartMenuTile key={item.id} item={item} />
            <div
              key={item.id}
              onClick={item.action}
              className="h-24 bg-win-blue hover:bg-opacity-80 p-2 flex flex-col justify-between cursor-pointer"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar (conceptual position, actual Start Menu search is complex) */}
      {/* <div className="absolute bottom-0 left-12 right-0 h-10 bg-black/50 p-1">
        <input type="text" placeholder="Type here to search" className="w-full h-full bg-transparent text-white px-2" />
      </div> */}
    </div>
  );
}
