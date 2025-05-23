// src/app/layout.tsx
import "./globals.css";
// import { SpeedInsights } from "@vercel/speed-insights/next" // Optional: for Vercel analytics

export const metadata = {
  title: "Saurav Chaudhari - Developer Portfolio",
  description: "A Windows 10 themed interactive portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* <SpeedInsights /> */} {/* Optional */}
      </body>
    </html>
  );
}
