// src/components/Taskbar/StartButton.tsx
import Image from "next/image"; // Or use an SVG component

interface StartButtonProps {
  onClick: () => void;
  isActive: boolean;
}

export default function StartButton({ onClick, isActive }: StartButtonProps) {
  return (
    <button
      onClick={onClick}
      title="Start"
      className={`h-full w-12 flex items-center justify-center transition-colors
                  hover:bg-white/20
                  ${isActive ? "bg-win-blue/80" : "bg-transparent"}`}
    >
      {/* Use a proper Windows logo icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 17 17"
        width="17"
        height="17"
        fill="currentColor"
      >
        <path d="M0 0H7.72727V7.72727H0V0ZM9.27273 0H17V7.72727H9.27273V0ZM0 9.27273H7.72727V17H0V9.27273ZM9.27273 9.27273H17V17H9.27273V9.27273Z" />
      </svg>
    </button>
  );
}
