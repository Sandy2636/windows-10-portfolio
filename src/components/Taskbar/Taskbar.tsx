// src/components/Taskbar/Taskbar.tsx
"use client";
import StartButton from "./StartButton";
import TaskbarClock from "./TaskbarClock";
import TaskbarItem from "./TaskbarItem";
import { useState } from "react";
import StartMenu from "../StartMenu/StartMenu";
import { useWindowManager } from "@/contexts/WindowManagerContext";
// import { useWindowManager } from '@/components/Windows/WindowManagerContext'; // To get open apps

export default function Taskbar() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const { windows, dispatch } = useWindowManager(); // Get open windows from context
  const toggleStartMenu = () => setIsStartMenuOpen((prev) => !prev);

  return (
    <>
      {isStartMenuOpen && (
        <StartMenu onClose={() => setIsStartMenuOpen(false)} />
      )}
      <div className="h-10 bg-black/80 backdrop-blur-md text-win-white flex items-center px-2 shadow-win-taskbar z-50">
        <StartButton onClick={toggleStartMenu} isActive={isStartMenuOpen} />
        <div className="h-full w-px bg-white/20 mx-1"></div>
        {/* Pinned/Open Apps */}
        <div className="flex items-center h-full">
          {/* Example pinned app - these would eventually come from openWindows state */}
          {windows.map((i) => (
            <TaskbarItem
              key={i.id}
              id={i.id}
              icon={i.icon}
              appName={i.title}
              isActive={i.isActive}
              onClick={() =>
                dispatch({ type: "UNMINIMIZE_WINDOW", payload: { id: i.id } })
              }
            />
          ))}

          {/* Map through openWindows from context here */}
        </div>
        <div className="flex-grow" /> {/* Spacer */}
        {/* System Tray (simplified) */}
        <TaskbarClock />
        {/* Add other system tray icons: notifications, etc. */}
        <div className="h-full w-px bg-white/20 mx-1"></div>
        <div
          className="h-full w-6 hover:bg-white/20 flex items-center justify-center cursor-pointer"
          title="Show Desktop"
        >
          {/* Little sliver at the end */}
        </div>
      </div>
    </>
  );
}
