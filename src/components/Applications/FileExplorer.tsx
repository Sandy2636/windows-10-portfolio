// src/components/Applications/FileExplorer.tsx
"use client";
import { useState, useEffect } from "react";
import {
  FolderIcon,
  DocumentIcon,
  ChevronRightIcon,
  ArrowUpIcon,
  HomeIcon,
  ComputerDesktopIcon,
  DocumentDuplicateIcon,
  PhotoIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"; // Using outline for a lighter feel
// You might want more specific icons for file types or from a Windows 10 icon set

// ... (keep your existing fileSystem data and navigation logic)
// Dummy file system structure (ensure this is defined as before)
const fileSystem = {
  "C:": {
    type: "drive",
    name: "Local Disk (C:)", // Add display names
    children: {
      Projects: {
        type: "folder",
        children: {
          /* ... */
        },
      },
      Documents: {
        type: "folder",
        children: {
          /* ... */
        },
      },
      Downloads: {
        type: "folder",
        children: {
          /* ... */
        },
      },
      Pictures: {
        type: "folder",
        children: {
          /* ... */
        },
      },
      Music: {
        type: "folder",
        children: {
          /* ... */
        },
      },
      Videos: {
        type: "folder",
        children: {
          /* ... */
        },
      },
      Windows: { type: "folder", children: {} },
      Users: { type: "folder", children: {} },
    },
  },
};

// Helper to get appropriate icon
const getItemIcon = (itemData: any, itemName: string) => {
  if (itemData.type === "folder" || itemData.type === "drive") {
    return (
      <FolderIcon className="w-5 h-5 mr-3 text-yellow-500 flex-shrink-0" />
    );
  }
  if (itemName.endsWith(".png") || itemName.endsWith(".jpg")) {
    return <PhotoIcon className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />;
  }
  if (itemName.endsWith(".mp4") || itemName.endsWith(".mov")) {
    return (
      <VideoCameraIcon className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />
    );
  }
  if (itemName.endsWith(".mp3") || itemName.endsWith(".wav")) {
    return (
      <MusicalNoteIcon className="w-5 h-5 mr-3 text-purple-500 flex-shrink-0" />
    );
  }
  // Add more specific icons (PDF, DOCX, etc.)
  return <DocumentIcon className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />;
};

interface FileExplorerProps {
  initialPath?: string;
  windowId: string;
}

export default function FileExplorer({
  initialPath = "C:/",
  windowId,
}: FileExplorerProps) {
  const [currentPathArray, setCurrentPathArray] = useState<string[]>(
    initialPath.replace(/^\/+|\/+$/g, "").split("/")
  );
  const [currentItems, setCurrentItems] = useState<Record<string, any>>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [quickAccessItems, setQuickAccessItems] = useState([
    {
      name: "Desktop",
      icon: HomeIcon,
      path: ["C:", "Users", "YourUser", "Desktop"],
    }, // Customize 'YourUser'
    {
      name: "Downloads",
      icon: DocumentDuplicateIcon,
      path: ["C:", "Downloads"],
    },
    { name: "Documents", icon: DocumentIcon, path: ["C:", "Documents"] },
    { name: "Pictures", icon: PhotoIcon, path: ["C:", "Pictures"] },
  ]);
  const [thisPCItems, setThisPCItems] = useState([
    { name: "Local Disk (C:)", icon: ComputerDesktopIcon, path: ["C:"] },
  ]);

  const navigateTo = (pathArray: string[]) => {
    let currentLevel: any = fileSystem;
    let displayPathRoot = "";

    // Determine the root object (e.g., fileSystem['C:'])
    // @ts-ignore
    if (pathArray.length > 0 && fileSystem[pathArray[0]]) {
      // @ts-ignore
      displayPathRoot = fileSystem[pathArray[0]].name || pathArray[0];
      // @ts-ignore
      currentLevel = fileSystem[pathArray[0]].children; // Start from children of C:
      // if navigating to C: itself, show its direct children
      if (pathArray.length === 1) {
        setCurrentItems(currentLevel || {});
        setCurrentPathArray(pathArray);
        setSelectedItem(null);
        return;
      }
      // Navigate deeper if path is longer than just the drive letter
      for (let i = 1; i < pathArray.length; i++) {
        // Start from index 1
        const part = pathArray[i];
        if (
          currentLevel &&
          currentLevel[part] &&
          (currentLevel[part].type === "folder" ||
            currentLevel[part].type === "drive")
        ) {
          currentLevel = currentLevel[part].children;
        } else if (currentLevel && currentLevel[part]) {
          // It's a file or non-navigable
          console.log(`Cannot navigate into ${part}, it's not a folder.`);
          return; // Stay at current valid path part
        } else {
          console.error("Path not found:", pathArray.join("/"));
          // setCurrentItems({}); // Clear items or show error
          return;
        }
      }
    } else {
      console.error("Invalid root path:", pathArray.join("/"));
      // Potentially reset to a default view or show an error
      // For now, if the path is empty or invalid root, show C: drive content
      currentLevel = fileSystem["C:"]?.children || {};
      setCurrentPathArray(["C:"]);
    }

    setCurrentItems(currentLevel || {}); // Use empty object if currentLevel is undefined
    setCurrentPathArray(pathArray);
    setSelectedItem(null); // Deselect on navigation
  };

  useEffect(() => {
    navigateTo(currentPathArray);
  }, []); // Initial navigation

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
  };

  const handleItemDoubleClick = (itemName: string, itemData: any) => {
    if (itemData.type === "folder" || itemData.type === "drive") {
      // For drives, navigateTo expects just the drive letter in the array if it's the root
      if (itemData.type === "drive") navigateTo([itemName]);
      else navigateTo([...currentPathArray, itemName]);
    } else {
      console.log("Open file:", itemName); // Placeholder, use WindowManager to open with appropriate app
      // Example: if (itemName.endsWith('.txt') || itemName.endsWith('.md')) {
      //   openWindow({ type: 'BLOG_PAD', title: itemName, component: AppComponents.BLOG_PAD, props: { filePath: [...currentPathArray, itemName].join('/') }, icon:'/icons/blogpad.svg' });
      // }
    }
  };

  const goUp = () => {
    if (currentPathArray.length > 1) {
      navigateTo(currentPathArray.slice(0, -1));
    }
  };

  const currentPathString = () => {
    if (!currentPathArray.length) return "";
    let displayPath =
      // @ts-ignore
      fileSystem[currentPathArray[0]]?.name || currentPathArray[0];
    if (currentPathArray.length > 1) {
      displayPath += " > " + currentPathArray.slice(1).join(" > ");
    }
    return displayPath;
  };

  return (
    <div className="flex flex-col h-full bg-win-white text-sm font-segoe-ui text-black select-none">
      {/* 1. Ribbon/Toolbar (Simplified) - Windows 10 often has a more complex ribbon */}
      <div className="h-[30px] bg-win-gray-light border-b border-win-gray flex items-center px-2 flex-shrink-0">
        {/* Example simplified actions - a real ribbon is more complex */}
        {/* <button className="p-1 hover:bg-win-gray rounded text-xs">File</button> */}
        <span className="text-sm font-semibold text-gray-700">
          File Explorer
        </span>
      </div>

      {/* 2. Address Bar & Up Button & Search */}
      <div className="h-[36px] bg-win-gray-light border-b border-win-gray flex items-center px-1.5 py-1 flex-shrink-0">
        <button
          onClick={goUp}
          disabled={currentPathArray.length <= 1}
          className="p-1.5 hover:bg-win-gray rounded disabled:opacity-50"
        >
          <ArrowUpIcon className="w-4 h-4 text-gray-700" />
        </button>
        {/* <button className="p-1.5 hover:bg-win-gray rounded disabled:opacity-50"> <ArrowLeftIcon/> </button> */}
        {/* <button className="p-1.5 hover:bg-win-gray rounded disabled:opacity-50"> <ArrowRightIcon/> </button> */}
        <div className="flex items-center border border-win-gray-dark focus-within:border-win-blue mx-1.5 flex-grow h-[26px] bg-white">
          <div className="px-2 text-gray-600 text-xs truncate flex-grow leading-[24px]">
            {currentPathString()}
          </div>
        </div>
        <div className="flex items-center border border-win-gray-dark focus-within:border-win-blue h-[26px] bg-white w-48">
          <input
            type="text"
            placeholder="Search"
            className="px-2 text-xs w-full h-full outline-none placeholder-gray-500"
          />
          <MagnifyingGlassIcon className="w-3.5 h-3.5 text-gray-600 mx-1.5" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-grow overflow-hidden">
        {/* 3. Navigation Pane (Left) */}
        <div className="w-48 bg-win-gray-light border-r border-win-gray p-1.5 overflow-y-auto flex-shrink-0">
          {/* Quick Access Section */}
          <div className="mb-3">
            <button className="flex items-center w-full text-left text-xs py-0.5 px-1 hover:bg-win-gray rounded">
              <ChevronDownIcon className="w-3 h-3 mr-1.5 text-gray-600" />
              <span className="font-semibold text-gray-700">Quick access</span>
            </button>
            {quickAccessItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigateTo(item.path)}
                className={`w-full text-left flex items-center py-0.5 pl-3 pr-1 my-px rounded
                                  ${
                                    currentPathArray.join("/") ===
                                    item.path.join("/")
                                      ? "bg-win-blue/20 hover:bg-win-blue/30"
                                      : "hover:bg-win-gray"
                                  }`}
              >
                <item.icon className="w-4 h-4 mr-1.5 text-gray-600 flex-shrink-0" />
                <span className="text-xs truncate text-gray-800">
                  {item.name}
                </span>
              </button>
            ))}
          </div>

          {/* This PC Section */}
          <div>
            <button className="flex items-center w-full text-left text-xs py-0.5 px-1 hover:bg-win-gray rounded">
              <ChevronDownIcon className="w-3 h-3 mr-1.5 text-gray-600" />
              <span className="font-semibold text-gray-700">This PC</span>
            </button>
            {thisPCItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigateTo(item.path)}
                className={`w-full text-left flex items-center py-0.5 pl-3 pr-1 my-px rounded
                                  ${
                                    currentPathArray.join("/") ===
                                    item.path.join("/")
                                      ? "bg-win-blue/20 hover:bg-win-blue/30"
                                      : "hover:bg-win-gray"
                                  }`}
              >
                <item.icon className="w-4 h-4 mr-1.5 text-gray-600 flex-shrink-0" />
                <span className="text-xs truncate text-gray-800">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Main Content View (Right) */}
        <div className="flex-1 overflow-auto p-1.5">
          {Object.keys(currentItems).length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              This folder is empty.
            </p>
          )}
          {Object.entries(currentItems).map(([name, data]) => (
            <div
              key={name}
              onClick={() => handleItemClick(name)}
              onDoubleClick={() => handleItemDoubleClick(name, data)}
              className={`flex items-center p-1 my-px rounded cursor-pointer
                          ${
                            selectedItem === name
                              ? "bg-win-blue/30 border border-win-blue/50"
                              : "hover:bg-win-blue/10"
                          }`}
              title={name}
            >
              {getItemIcon(data, name)}
              <span className="text-xs truncate text-gray-900">{name}</span>
              {/* Add more columns here later (Date modified, Type, Size) using a grid or flex layout */}
            </div>
          ))}
        </div>
      </div>

      {/* 5. Status Bar (Bottom) */}
      <div className="h-[22px] bg-win-gray-light border-t border-win-gray px-3 flex items-center justify-between text-xs text-gray-700 flex-shrink-0">
        <div>{Object.keys(currentItems).length} items</div>
        {selectedItem && <div>1 item selected</div>}
      </div>
    </div>
  );
}
