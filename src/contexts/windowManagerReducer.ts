// src/contexts/windowManagerReducer.ts
import {
  WindowManagerContextState,
  WindowManagerAction,
  WindowInstance,
} from "./WindowManagerContext.types";

const DEFAULT_POSITION = { x: 100, y: 50 };
const DEFAULT_SIZE = { width: 720, height: 480 };

export const windowManagerReducer = (
  state: WindowManagerContextState,
  action: WindowManagerAction
): WindowManagerContextState => {
  switch (action.type) {
    case "OPEN_WINDOW": {
      const {
        type,
        title,
        component,
        props,
        initialPosition,
        initialSize,
        icon,
        unique = false,
      } = action.payload;

      // If unique, check if a window of this type is already open
      if (unique) {
        const existingWindow = state.windows.find((w) => w.type === type);
        if (existingWindow) {
          // Bring existing window to front and focus
          return {
            ...state,
            activeWindowId: existingWindow.id,
            windows: state.windows.map((w) =>
              w.id === existingWindow.id
                ? {
                    ...w,
                    zIndex: state.nextZIndex,
                    isActive: true,
                    isMinimized: false,
                  }
                : { ...w, isActive: false }
            ),
            nextZIndex: state.nextZIndex + 1,
          };
        }
      }

      const newWindowId = `${type.toLowerCase()}-${state.uniqueIdCounter}`;
      const newWindow: WindowInstance = {
        id: newWindowId,
        type,
        title,
        icon,
        component,
        props: props || {},
        position: initialPosition || {
          x: DEFAULT_POSITION.x + state.windows.length * 20,
          y: DEFAULT_POSITION.y + state.windows.length * 20,
        },
        size: initialSize || DEFAULT_SIZE,
        zIndex: state.nextZIndex,
        isActive: true,
        isMinimized: false,
        isMaximized: false,
      };

      return {
        ...state,
        windows: [
          ...state.windows.map((w) => ({ ...w, isActive: false })),
          newWindow,
        ],
        activeWindowId: newWindow.id,
        nextZIndex: state.nextZIndex + 1,
        uniqueIdCounter: state.uniqueIdCounter + 1,
      };
    }

    case "CLOSE_WINDOW": {
      const remainingWindows = state.windows.filter(
        (w) => w.id !== action.payload.id
      );
      let newActiveWindowId: string | null = null;
      if (remainingWindows.length > 0) {
        // Focus the window with the highest zIndex among the remaining ones
        newActiveWindowId = remainingWindows.reduce((prev, curr) =>
          prev.zIndex > curr.zIndex ? prev : curr
        ).id;
      }
      return {
        ...state,
        windows: remainingWindows.map((w) =>
          w.id === newActiveWindowId ? { ...w, isActive: true } : w
        ),
        activeWindowId: newActiveWindowId,
      };
    }

    case "FOCUS_WINDOW": {
      if (state.activeWindowId === action.payload.id) return state; // No change if already active
      return {
        ...state,
        activeWindowId: action.payload.id,
        windows: state.windows.map((w) =>
          w.id === action.payload.id
            ? {
                ...w,
                zIndex: state.nextZIndex,
                isActive: true,
                isMinimized: false,
              } // Also unminimize on focus
            : { ...w, isActive: false }
        ),
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "UNMINIMIZE_WINDOW": {
      // This action is similar to FOCUS_WINDOW but specifically for unminimizing
      // It ensures the window becomes active and gets the highest z-index.
      return {
        ...state,
        activeWindowId: action.payload.id,
        windows: state.windows.map((w) =>
          w.id === action.payload.id
            ? {
                ...w,
                zIndex: state.nextZIndex,
                isActive: true,
                isMinimized: false,
              }
            : { ...w, isActive: false }
        ),
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "MINIMIZE_WINDOW": {
      let newActiveWindowId = state.activeWindowId;
      if (state.activeWindowId === action.payload.id) {
        // If minimizing the active window, find the next highest zIndex window to activate
        const otherWindows = state.windows.filter(
          (w) => w.id !== action.payload.id && !w.isMinimized
        );
        if (otherWindows.length > 0) {
          newActiveWindowId = otherWindows.reduce((prev, curr) =>
            prev.zIndex > curr.zIndex ? prev : curr
          ).id;
        } else {
          newActiveWindowId = null;
        }
      }
      return {
        ...state,
        activeWindowId: newActiveWindowId,
        windows: state.windows.map((w) =>
          w.id === action.payload.id
            ? { ...w, isMinimized: true, isActive: false }
            : w.id === newActiveWindowId
            ? { ...w, isActive: true }
            : w
        ),
      };
    }

    case "TOGGLE_MAXIMIZE_WINDOW": {
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.id === action.payload.id) {
            const isNowMaximized = !w.isMaximized;
            return {
              ...w,
              isMaximized: isNowMaximized,
              // Store current size/pos before maximizing, restore it when unmaximizing
              previousSize: isNowMaximized ? w.size : w.previousSize,
              previousPosition: isNowMaximized
                ? w.position
                : w.previousPosition,
              // When unmaximizing, restore to previous size/pos.
              // When maximizing, position is typically (0,0) and size is 100% (handled by WindowFrame styles)
              position: isNowMaximized
                ? { x: 0, y: 0 }
                : w.previousPosition || DEFAULT_POSITION,
              size: isNowMaximized
                ? { width: "100%", height: "100%" }
                : w.previousSize || DEFAULT_SIZE,
              isActive: true, // Ensure it's active
              zIndex: state.nextZIndex, // Bring to front
            };
          }
          return { ...w, isActive: false };
        }),
        activeWindowId: action.payload.id,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "UPDATE_WINDOW_POSITION": {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id
            ? { ...w, position: action.payload.position }
            : w
        ),
      };
    }

    case "UPDATE_WINDOW_SIZE": {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id ? { ...w, size: action.payload.size } : w
        ),
      };
    }

    default:
      return state;
  }
};
