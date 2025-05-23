// src/components/Desktop/DesktopIcon.tsx
import Image from "next/image";

interface DesktopIconProps {
  id: string;
  name: string;
  iconSrc: string;
  isSelected: boolean;
  onClick: (event: React.MouseEvent) => void;
  onDoubleClick: () => void;
}

export default function DesktopIcon({
  name,
  iconSrc,
  isSelected,
  onClick,
  onDoubleClick,
}: DesktopIconProps) {
  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={`flex flex-col items-center justify-between w-20 h-[90px] p-1 text-center cursor-pointer
                  hover:bg-win-blue/20
                  ${
                    isSelected ? "bg-win-blue/30 border border-win-blue/50" : ""
                  }`}
      title={name}
    >
      <div className="h-[63px] w-16 flex items-center justify-center">
        {" "}
        {/* 70% of 90px = ~63px */}
        <Image
          src={iconSrc}
          alt={name}
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
      <div className="h-[27px] w-full flex items-center justify-center">
        {" "}
        {/* 30% of 90px = ~27px */}
        <p
          className={`text-xs text-win-white break-words leading-tight line-clamp-2 px-1 ${
            isSelected ? "bg-win-blue/70 w-full" : ""
          }`}
        >
          {name}
        </p>
      </div>
    </div>
  );
}
