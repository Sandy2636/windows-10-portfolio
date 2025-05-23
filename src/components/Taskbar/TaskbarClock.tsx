// src/components/Taskbar/TaskbarClock.tsx
"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function TaskbarClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000 * 30); // Update every 30 seconds is enough, or 1000 for every second
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="text-xs px-2 text-center leading-tight h-full flex flex-col justify-center items-center hover:bg-white/10 cursor-default">
      <div>{format(time, "h:mm a")}</div>
      <div>{format(time, "M/d/yyyy")}</div>
    </div>
  );
}
