"use client";
import Desktop from "@/components/Desktop/Desktop";

export default function DesktopPage() {
  const desktopIcons2 = [
    {
      id: "thispc",
      name: "This PC",
      icon: "/icons/this-pc.png",
      appType: "FILE_EXPLORER",
      appProps: { initialPath: "C:/" },
      unique: true,
    },
    {
      id: "gamse",
      name: "Games",
      icon: "/icons/Games.png",
      appType: "GAMES_LAUNCHER",
      // appProps: { initialPath: "C:/" },
      unique: true,
    },
    {
      id: "contactme",
      name: "Contact me",
      icon: "/icons/Mail.png",
      appType: "OUTLOOK_CONTACT",
      // appProps: { initialPath: "C:/" },
      unique: true,
    },
    {
      id: "projects",
      name: "My Projects",
      icon: "/icons/my-projects.png",
      appType: "FILE_EXPLORER",
      appProps: { initialPath: "C:/Projects" },
      unique: false,
    }, // Allow multiple project explorers
    {
      id: "blogpad",
      name: "BlogPad",
      icon: "/icons/blogpad.png",
      appType: "BLOG_PAD",
      unique: true,
    }, // Show list of articles
    {
      id: "resume",
      name: "About me",
      icon: "/icons/Aboutme.png",
      appType: "RESUME_VIEWER",
      unique: true,
    },
    {
      id: "source",
      name: "Source Code",
      icon: "/icons/vscode.png",
      appType: "SOURCE_CODE_VIEWER",
      unique: true,
    },
    {
      id: "chrome",
      name: "Web Browser",
      icon: "/icons/chrome.png",
      appType: "CHROME_SIMULATOR",
      unique: false,
    },
  ];

  return (
    <Desktop icons={desktopIcons2} />
    // Render open windows here based on your WindowManager state
  );
}
