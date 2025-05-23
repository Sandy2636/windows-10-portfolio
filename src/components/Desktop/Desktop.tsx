// src/components/Desktop/Desktop.tsx
"use client";
import DesktopIcon from "./DesktopIcon";
import { useState } from "react";
import {
  useWindowManager,
  AppComponentsMapping,
} from "@/contexts/WindowManagerContext";
// Import Window components if they are rendered here directly
// import FileExplorer from '../Applications/FileExplorer';
// import BlogPad from '../Applications/BlogPad';
// ... and other "apps"

interface IconConfig {
  id: string;
  name: string;
  icon: string;
  appType: string;
  appProps?: any;
  unique: boolean;
}

interface DesktopProps {
  icons: IconConfig[];
}

export default function Desktop({ icons }: DesktopProps) {
  const [selectedIcons, setSelectedIcons] = useState<Set<string>>(new Set());
  const { openWindow } = useWindowManager();
  // const [windows, setWindows] = useState([]); // Manage open windows state here or via context

  // Logic for drag-to-select will be complex, involving mouse events on the Desktop area.
  // For simplicity, individual icon click/selection first.

  const handleIconClick = (id: string, event: React.MouseEvent) => {
    if (event.ctrlKey) {
      setSelectedIcons((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    } else {
      setSelectedIcons(new Set([id]));
    }
  };

  const handleIconDoubleClick = (iconData: IconConfig) => {
    const AppComponent =
      AppComponentsMapping[
        iconData.appType as keyof typeof AppComponentsMapping
      ];
    if (AppComponent) {
      openWindow({
        type: iconData.appType,
        title: iconData.name,
        icon: iconData.icon,
        component: AppComponent,
        props: iconData.appProps || {},
        unique: iconData.unique,
        // initialSize: iconData.appType === 'RESUME_VIEWER' ? { width: 800, height: 1000} : undefined // Example of custom size
      });
    } else {
      console.error(
        "Application component not found for type:",
        iconData.appType
      );
    }
    setSelectedIcons(new Set());
  };

  const handleDesktopClick = (event: React.MouseEvent) => {
    // Deselect icons if clicking on empty desktop space
    if (event.target === event.currentTarget) {
      setSelectedIcons(new Set());
    }
  };

  return (
    <div
      className="w-full h-full p-1 grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] grid-rows-[repeat(auto-fill,minmax(90px,1fr))] grid-flow-col auto-cols-max auto-rows-max gap-1 content-start bg-cover bg-center bg-no-repeat"
      //   className="w-full h-full p-4 grid grid-flow-col auto-rows-max gap-2 content-start"
      style={{ backgroundImage: `url(/Wallpaper.webp)` }}
      onClick={handleDesktopClick}
      // onMouseDown, onMouseMove, onMouseUp for drag selection rectangle
    >
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          name={icon.name}
          iconSrc={icon.icon}
          isSelected={selectedIcons.has(icon.id)}
          onClick={(e) => handleIconClick(icon.id, e)}
          onDoubleClick={() => handleIconDoubleClick(icon)}
        />
      ))}

      {/* Render Open Windows Here */}
      {/* Example:
      {windows.map(win => {
        if (win.type === 'FileExplorer') return <FileExplorer key={win.id} {...win.props} />;
        // etc.
      })}
      */}
    </div>
  );
}
