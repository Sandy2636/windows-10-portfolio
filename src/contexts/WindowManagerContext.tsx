// src/contexts/WindowManagerContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from "react";
import { windowManagerReducer } from "./windowManagerReducer"; // Ensure this path is correct
import {
  WindowManagerContextState,
  WindowManagerAction,
  WindowManagerContextType,
  WindowInstance, // Omit from WindowInstance definition below if it's already fully defined in .types.ts
} from "./WindowManagerContext.types"; // Ensure this path is correct
import WindowFrame from "@/components/Windows/WindowFrame";

// Import your actual application components here
// These are placeholders; you'll create these components.
const FallbackComponent = ({ appName }: { appName: string }) => (
  <div className="p-4">This is a placeholder for the {appName} app.</div>
);

// It's good practice to define AppComponents mapping in a central place,
// possibly even within this context or imported from a dedicated file.
// For now, keeping it simple. Ensure these components exist or use placeholders.
import FileExplorer from "@/components/Applications/FileExplorer";
import BlogPad from "@/components/Applications/BlogPad";
import ResumeViewer from "@/components/Applications/ResumeViewer";
import SourceCodeViewer from "@/components/Applications/SourceCodeViewer";
import ChromeSimulator from "@/components/Applications/ChromeSimulator";
import GamesLauncher from "@/components/Applications/GamesLauncher";
import OutlookContactForm from "@/components/Applications/OutlookContactForm";
import UserProfile from "@/components/Applications/UserProfile";

export const AppComponentsMapping: Record<string, React.FC<any>> = {
  FILE_EXPLORER: FileExplorer,
  GAMES_LAUNCHER: GamesLauncher,
  OUTLOOK_CONTACT: OutlookContactForm,
  BLOG_PAD: BlogPad,
  // RESUME_VIEWER: ResumeViewer,
  RESUME_VIEWER: UserProfile,
  SOURCE_CODE_VIEWER: SourceCodeViewer,
  CHROME_SIMULATOR: ChromeSimulator,
  // Add other app types and their components here
  DEFAULT: ({ windowId, ...props }) => (
    <FallbackComponent appName={props.title || "Unknown App"} />
  ),
};

// export const initialWindowManagerState: WindowManagerContextState = {
//   windows: [],
//   activeWindowId: null,
//   nextZIndex: 100,
//   uniqueIdCounter: 0,
// };
export const initialWindowManagerState: WindowManagerContextState = {
  windows: [],
  activeWindowId: null,
  nextZIndex: 100,
  uniqueIdCounter: 0,
};

const WindowManagerContext = createContext<
  WindowManagerContextType | undefined
>(undefined);

export const WindowManagerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    windowManagerReducer,
    initialWindowManagerState
  );

  // Memoized openWindow function to pass down
  const openWindow = useCallback(
    (
      payload: Omit<
        WindowInstance,
        | "id"
        | "zIndex"
        | "isActive"
        | "isMinimized"
        | "isMaximized"
        | "position"
        | "size"
        | "component"
      > & {
        type: string;
        component?: React.FC<any>;
        initialPosition?: { x: number; y: number };
        initialSize?: { width: number | string; height: number | string };
        unique?: boolean;
      }
    ) => {
      const componentToRender =
        payload.component ||
        AppComponentsMapping[payload.type] ||
        AppComponentsMapping.DEFAULT;
      dispatch({
        type: "OPEN_WINDOW",
        payload: { ...payload, component: componentToRender },
      });
    },
    [dispatch]
  );
  const renderableWindows = state.windows.filter((win) => !win.isMinimized);

  return (
    <WindowManagerContext.Provider value={{ ...state, dispatch, openWindow }}>
      <div className="z-5">{children}</div>
      {/* <div
        id="windows-area"
        className={`${
          renderableWindows.length > 0 ? "absolute " : ""
        } top-0 right-0 bottom-0 pointer-events-none z-0`}
        style={{ left: "100px" }}
      > */}
      {/* Parent div for windows */}
      <div className="z-10">
        {renderableWindows.map((win) => {
          const AppComponent = win.component;
          return (
            <WindowFrame
              key={win.id}
              windowId={win.id}
              title={win.title}
              isActive={win.id === state.activeWindowId}
              isMinimized={win.isMinimized} // Should always be false here due to filter
              isMaximized={win.isMaximized}
              currentPosition={win.position}
              currentSize={win.size}
              zIndex={win.zIndex}
              onClose={(id) =>
                dispatch({ type: "CLOSE_WINDOW", payload: { id } })
              }
              onMinimize={(id) =>
                dispatch({ type: "MINIMIZE_WINDOW", payload: { id } })
              }
              onMaximize={(id) =>
                dispatch({ type: "TOGGLE_MAXIMIZE_WINDOW", payload: { id } })
              }
              onFocus={(id) =>
                dispatch({ type: "FOCUS_WINDOW", payload: { id } })
              }
              onPositionChange={(id, position) =>
                dispatch({
                  type: "UPDATE_WINDOW_POSITION",
                  payload: { id, position },
                })
              }
              onSizeChange={(id, size) =>
                dispatch({
                  type: "UPDATE_WINDOW_SIZE",
                  payload: { id, size },
                })
              }
            >
              <AppComponent
                {...win.props}
                windowId={win.id}
                title={win.title}
              />
            </WindowFrame>
          );
        })}
      </div>
      {/* </div> */}
    </WindowManagerContext.Provider>
  );
};

export const useWindowManager = (): WindowManagerContextType => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error(
      "useWindowManager must be used within a WindowManagerProvider"
    );
  }
  return context;
};
