// src/app/(desktop)/layout.tsx
// This layout wraps the desktop page and includes persistent UI like Taskbar
import Taskbar from "@/components/Taskbar/Taskbar";
import { WindowManagerProvider } from "@/contexts/WindowManagerContext";
// import WindowManager from '@/components/Windows/WindowManager'; // If you build a context provider

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <WindowManager> // Wrap with your window management context provider
    <WindowManagerProvider>
      <div className="h-screen w-screen flex flex-col bg-[url('/path/to/your/wallpaper.jpg')] bg-cover bg-center">
        {/* Replace with your actual wallpaper path in /public */}
        <main className="flex-grow overflow-hidden relative">
          {children} {/* This will render page.tsx for the desktop */}
        </main>
        <Taskbar />
      </div>
    </WindowManagerProvider>
  );
}
