// src/app/page.tsx
"use client"; // This page involves client-side interaction for login
import LoginScreen from "@/components/LoginScreen";
import { useRouter } from "next/navigation"; // Use next/navigation for App Router
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Simulate asset loading / preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate preloading time
    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    // Use router.push for client-side navigation to the desktop page
    router.push("/desktop"); // Assuming your desktop is at '/desktop' route
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-win-blue flex flex-col items-center justify-center text-win-white">
        {/* Basic Preloader Example */}
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spinner border-win-white mb-4"></div>
        <p>Loading Windows...</p>
        {/* You can add a progress bar here */}
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // This part should ideally not be reached if router.push works correctly
  // Or you can redirect from a useEffect if isAuthenticated becomes true
  return null;
}
