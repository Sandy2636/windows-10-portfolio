// src/contexts/WindowManagerContext.types.ts
import React from "react";

export interface WindowInstance {
  id: string;
  type: string; // e.g., 'FILE_EXPLORER', 'BLOG_PAD', 'CHROME_SIMULATOR'
  title: string;
  icon: string; // Icon for taskbar and window title (optional here, can be derived)
  component: React.FC<any>; // The actual React component for the app's content
  props?: Record<string, any>; // Props to pass to the component
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  position: { x: number; y: number };
  size: { width: number | string; height: number | string };
  previousSize?: { width: number | string; height: number | string }; // For restoring from maximized
  previousPosition?: { x: number; y: number }; // For restoring from maximized
}

export interface WindowManagerContextState {
  windows: WindowInstance[];
  activeWindowId: string | null;
  nextZIndex: number;
  uniqueIdCounter: number; // To generate unique window IDs
}

export type WindowManagerAction =
  | {
      type: "OPEN_WINDOW";
      payload: Omit<
        WindowInstance,
        | "id"
        | "zIndex"
        | "isActive"
        | "isMinimized"
        | "isMaximized"
        | "position"
        | "size"
      > & {
        initialPosition?: { x: number; y: number };
        initialSize?: { width: number | string; height: number | string };
        unique?: boolean;
      };
    }
  | { type: "CLOSE_WINDOW"; payload: { id: string } }
  | { type: "FOCUS_WINDOW"; payload: { id: string } }
  | { type: "MINIMIZE_WINDOW"; payload: { id: string } }
  | { type: "TOGGLE_MAXIMIZE_WINDOW"; payload: { id: string } }
  | { type: "UNMINIMIZE_WINDOW"; payload: { id: string } } // Specific action to restore from minimized
  | {
      type: "UPDATE_WINDOW_POSITION";
      payload: { id: string; position: { x: number; y: number } };
    }
  | {
      type: "UPDATE_WINDOW_SIZE";
      payload: {
        id: string;
        size: { width: number | string; height: number | string };
      };
    };

export interface WindowManagerContextType extends WindowManagerContextState {
  dispatch: React.Dispatch<WindowManagerAction>;
  openWindow: (
    payload: Omit<
      WindowInstance,
      | "id"
      | "zIndex"
      | "isActive"
      | "isMinimized"
      | "isMaximized"
      | "position"
      | "size"
    > & {
      initialPosition?: { x: number; y: number };
      initialSize?: { width: number | string; height: number | string };
      unique?: boolean;
    }
  ) => void;
}
