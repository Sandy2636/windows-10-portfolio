"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; // For avatar

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [welcomeText, setWelcomeText] = useState("Welcome");

  const handleSignIn = () => {
    setIsLoggingIn(true);
    // Simulate login delay
    setTimeout(() => {
      onLoginSuccess();
    }, 1500);
  };

  useEffect(() => {
    if (isLoggingIn) {
      const texts = ["Welcome.", "Welcome..", "Welcome..."];
      let i = 0;
      const interval = setInterval(() => {
        setWelcomeText(texts[i % 3]);
        i++;
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isLoggingIn]);

  return (
    <div className="fixed inset-0">
      {/* Blurred background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md scale-105"
        style={{ backgroundImage: `url(/LockScreen.jpg)` }}
      ></div>

      {/* Content layer */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Apply blur effect to a background image if you have one */}
        <div className="text-center text-win-white">
          {!isLoggingIn ? (
            <>
              <Image
                src="/Avatar.webp" // Add your avatar to public folder
                alt="User Avatar"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4 border-3 overflow-hidden aspect-square border-win-white"
              />
              <h1 className="text-3xl mb-2">Saurav Chaudhari</h1>
              <p className="mb-6">User</p>
              <div className="w-64 mx-auto">
                {/* Simulate password input, not functional */}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  readOnly
                  className="w-full p-2 rounded bg-white/20 text-win-white placeholder-win-gray-light mb-4 text-center"
                  value="***********" // Fake password
                />
                <button
                  onClick={handleSignIn}
                  className="w-full p-2 rounded bg-win-white/30 hover:bg-win-white/40 transition-colors"
                >
                  Sign in
                </button>
              </div>
            </>
          ) : (
            <>
              <Image
                src="/user-avatar.png"
                alt="User Avatar"
                width={96}
                height={96}
                className="rounded-full mx-auto mb-4 animate-pulse"
              />
              <div className="w-8 h-8 border-2 border-dashed rounded-full animate-spinner border-win-white mx-auto mb-4"></div>
              <p className="text-xl">{welcomeText}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
