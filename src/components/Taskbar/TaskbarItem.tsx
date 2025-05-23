// src/components/Taskbar/TaskbarItem.tsx
import Image from "next/image";

interface TaskbarItemProps {
  id: string;
  appName: string;
  icon: string;
  isActive: boolean; // Is this the currently focused window?
  isMinimized?: boolean; // Is the window minimized?
  onClick: (id: string) => void;
}

export default function TaskbarItem({
  id,
  appName,
  icon,
  isActive,
  onClick,
}: TaskbarItemProps) {
  return (
    <button
      onClick={() => onClick(id)}
      title={appName}
      className={`h-full px-3 flex items-center gap-2 transition-colors relative
                  hover:bg-white/20
                  ${isActive ? "bg-white/10" : "bg-transparent"}`}
    >
      <Image src={icon} alt={appName} width={16} height={16} />
      {/* <span className="text-xs text-win-white hidden sm:inline">{appName}</span> */}
      {/* Optional: line indicating active/open status */}
      <div
        className={`absolute bottom-0 left-1 right-1 h-[2px]
                    ${
                      isActive
                        ? "bg-win-blue"
                        : "bg-transparent group-hover:bg-white/30"
                    }`}
      />
    </button>
  );
}
