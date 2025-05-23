// src/components/Windows/WindowFrame.tsx
"use client";
import React, { useRef, useEffect, useState } from "react";
import Draggable, {
  DraggableEventHandler,
  DraggableData,
  DraggableEvent,
} from "react-draggable";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import "react-resizable/css/styles.css";

import {
  XMarkIcon,
  MinusIcon,
  Square2StackIcon as MaximizeIcon,
  ArrowsPointingOutIcon as RestoreIcon,
} from "@heroicons/react/24/outline";

interface WindowFrameProps {
  title: string;
  children: React.ReactNode;
  windowId: string;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  currentPosition: { x: number; y: number };
  currentSize: { width: number | string; height: number | string };
  zIndex: number;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  onSizeChange: (
    id: string,
    size: { width: number | string; height: number | string }
  ) => void;
}

export default function WindowFrame({
  title,
  children,
  windowId,
  isActive,
  isMinimized,
  isMaximized,
  currentPosition,
  currentSize,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
}: WindowFrameProps) {
  const nodeRef = useRef<HTMLDivElement>(null); // Ref for Draggable, ResizableBox should forward this
  const [resizableBoxKey, setResizableBoxKey] = useState(0); // Key to force re-mount on maximize/restore

  useEffect(() => {
    // This key change forces ResizableBox to re-initialize its internal size/position
    // when isMaximized status changes, which can help with some edge cases.
    setResizableBoxKey((prev) => prev + 1);
  }, [isMaximized]);

  if (isMinimized) return null;

  const handleDragStart: DraggableEventHandler = (e, data) => {
    onFocus(windowId);
  };

  const handleDragStop: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData
  ) => {
    if (!isMaximized) {
      onPositionChange(windowId, { x: data.x, y: data.y });
    }
  };

  const handleClickOnWindow = (e: React.MouseEvent) => {
    // Focus if clicking on the window frame itself, not title bar buttons
    if (
      (e.target as HTMLElement).closest(".window-title-bar") &&
      !(e.target as HTMLElement).closest("button")
    ) {
      onFocus(windowId);
    } else if (!(e.target as HTMLElement).closest(".window-title-bar")) {
      // If click is on content area, also focus.
      onFocus(windowId);
    }
  };

  const parseNumericSize = (value: number | string): number => {
    if (typeof value === "string") {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? 200 : parsed; // Fallback to a small number if NaN
    }
    return value;
  };

  // Dimensions for ResizableBox props
  const boxWidth = isMaximized
    ? window.innerWidth
    : parseNumericSize(currentSize.width);
  const boxHeight = isMaximized
    ? window.innerHeight
    : parseNumericSize(currentSize.height);

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-title-bar"
      position={isMaximized ? { x: 0, y: 0 } : currentPosition}
      onStart={handleDragStart}
      onStop={handleDragStop}
      disabled={isMaximized}
    >
      <div ref={nodeRef} className="absolute top-0" style={{ zIndex }}>
        <ResizableBox
          key={resizableBoxKey} // Force re-render on maximize state change
          width={boxWidth}
          height={boxHeight}
          minConstraints={
            isMaximized ? [window.innerWidth, window.innerHeight] : [200, 150]
          }
          maxConstraints={
            isMaximized
              ? [window.innerWidth, window.innerHeight]
              : [Infinity, Infinity]
          }
          onResizeStop={(e: React.SyntheticEvent, data: ResizeCallbackData) => {
            if (!isMaximized) {
              onSizeChange(windowId, {
                width: data.size.width,
                height: data.size.height,
              });
            }
          }}
          className={`fixed ${
            isMaximized ? "inset-0" : ""
          } shadow-win-window bg-win-white border border-win-gray-medium flex flex-col overflow-hidden pointer-events-auto`}
          style={{
            zIndex, // CRITICAL: Use the dynamic zIndex from props
          }}
          onClickCapture={handleClickOnWindow} // Use a more specific click handler
          resizeHandles={
            isMaximized ? [] : ["s", "w", "e", "n", "sw", "nw", "se", "ne"]
          } // Disable handles when maximized
        >
          <div
            className={`window-title-bar h-7 flex items-center justify-between pl-2 pr-1 select-none
                      ${
                        isActive
                          ? "bg-win-blue text-win-white cursor-grab"
                          : "bg-win-gray-light text-win-black cursor-default"
                      }`}
          >
            <span className="text-xs font-semibold truncate">{title}</span>
            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize(windowId);
                }}
                className={`p-1 w-8 h-full ${
                  isActive ? "hover:bg-white/20" : "hover:bg-win-gray/30"
                }`}
                title="Minimize"
              >
                <MinusIcon className="w-3 h-3 mx-auto" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMaximize(windowId);
                }}
                className={`p-1 w-8 h-full ${
                  isActive ? "hover:bg-white/20" : "hover:bg-win-gray/30"
                }`}
                title={isMaximized ? "Restore" : "Maximize"}
              >
                {isMaximized ? (
                  <RestoreIcon className="w-3 h-3 mx-auto" />
                ) : (
                  <MaximizeIcon className="w-3 h-3 mx-auto" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(windowId);
                }}
                className="p-1 w-10 h-full hover:bg-red-500 active:bg-red-700 hover:text-white"
                title="Close"
              >
                <XMarkIcon className="w-3 h-3 mx-auto" />
              </button>
            </div>
          </div>
          <div className="flex-grow overflow-auto p-1 bg-win-white text-win-black">
            {children}
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
}
