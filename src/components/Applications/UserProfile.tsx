// src/components/Applications/UserProfile.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image"; // For your avatar
import {
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  LinkIcon,
  UserCircleIcon,
  InformationCircleIcon,
  CommandLineIcon,
} from "@heroicons/react/24/solid";

interface UserProfileProps {
  windowId: string;
  // Your profile data can be passed as props or fetched
  profileData?: {
    name: string;
    title: string;
    avatarUrl: string;
    bio: string;
    skills: { category: string; items: string[] }[];
    experience: {
      role: string;
      company: string;
      duration: string;
      description: string;
    }[];
    contactLinks: { name: string; url: string; icon: React.FC<any> }[];
  };
}

// Dummy Profile Data (Replace with your actual data)
const defaultProfileData = {
  name: "Your Name",
  title: "Senior Full-Stack Developer | React & Next.js Enthusiast",
  avatarUrl: "/user-avatar.png", // Path to your avatar in /public
  bio: "Passionate and results-oriented developer with X years of experience in building dynamic web applications. I thrive on solving complex problems and creating intuitive user experiences. This portfolio is a testament to my love for detail and interactive design, built with Next.js to mimic Windows 10.",
  skills: [
    {
      category: "Front-End",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "JavaScript (ESNext)",
        "HTML5",
        "CSS3",
        "Framer Motion",
      ],
    },
    {
      category: "Back-End",
      items: [
        "Node.js",
        "Express.js",
        "Python (Flask/Django)",
        "REST APIs",
        "GraphQL",
      ],
    },
    { category: "Databases", items: ["MongoDB", "PostgreSQL", "Firebase"] },
    {
      category: "Tools & Platforms",
      items: ["Git & GitHub", "Docker", "Vercel", "AWS (Basic)", "VS Code"],
    },
    { category: "DevOps (Learning)", items: ["CI/CD", "Terraform"] },
  ],
  experience: [
    {
      role: "Lead Developer",
      company: "Tech Solutions Inc.",
      duration: "2021 - Present",
      description:
        "Led a team of 5 developers in creating innovative client solutions using React and Node.js. Spearheaded the adoption of Next.js for improved SEO and performance.",
    },
    {
      role: "Software Engineer",
      company: "Web Wizards LLC",
      duration: "2018 - 2021",
      description:
        "Developed and maintained full-stack web applications for various clients. Contributed to UI/UX design and database architecture.",
    },
  ],
  contactLinks: [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: CommandLineIcon,
    }, // Replace with actual Github logo
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: BriefcaseIcon,
    },
    {
      name: "Portfolio Site",
      url: "https://your-actual-portfolio.com",
      icon: LinkIcon,
    }, // If you have another live one
  ],
};

export default function UserProfile({
  windowId,
  profileData = defaultProfileData,
}: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<
    "bio" | "skills" | "experience" | "contact"
  >("bio");

  const TabButton: React.FC<{
    tabName: typeof activeTab;
    label: string;
    icon: React.FC<any>;
  }> = ({ tabName, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center gap-2 px-3 py-2 text-xs w-full text-left rounded-sm
                  ${
                    activeTab === tabName
                      ? "bg-win-blue text-white"
                      : "text-gray-700 hover:bg-win-gray-light"
                  }`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      {label}
    </button>
  );

  return (
    <div className="flex h-full bg-win-white font-segoe-ui text-sm text-black select-none">
      {/* Sidebar for Profile Pic and Tabs */}
      <div className="w-56 bg-[#e6e6e6] p-3 border-r border-win-gray flex flex-col items-center flex-shrink-0">
        <div className="mt-2 mb-4 text-center">
          <Image
            src={profileData.avatarUrl}
            alt={profileData.name}
            width={80}
            height={80}
            className="rounded-full border-2 border-win-blue shadow-md"
          />
          <h1 className="text-base font-semibold mt-2.5 text-gray-800">
            {profileData.name}
          </h1>
          <p className="text-xs text-gray-600 leading-tight">
            {profileData.title}
          </p>
        </div>
        <nav className="w-full space-y-1">
          <TabButton
            tabName="bio"
            label="About Me"
            icon={InformationCircleIcon}
          />
          <TabButton
            tabName="skills"
            label="Skills & Technologies"
            icon={CodeBracketIcon}
          />
          <TabButton
            tabName="experience"
            label="Experience"
            icon={BriefcaseIcon}
          />
          <TabButton
            tabName="contact"
            label="Connect & Projects"
            icon={LinkIcon}
          />
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-5 overflow-y-auto">
        {activeTab === "bio" && (
          <section>
            <h2 className="text-lg font-semibold text-win-blue mb-2.5">
              About Me
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {profileData.bio}
            </p>
          </section>
        )}

        {activeTab === "skills" && (
          <section>
            <h2 className="text-lg font-semibold text-win-blue mb-3">
              Skills & Technologies
            </h2>
            <div className="space-y-3">
              {profileData.skills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-win-blue/10 text-win-blue text-xs rounded-full border border-win-blue/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "experience" && (
          <section>
            <h2 className="text-lg font-semibold text-win-blue mb-3">
              Experience
            </h2>
            <div className="space-y-4">
              {profileData.experience.map((exp) => (
                <div
                  key={exp.company}
                  className="pb-3 border-b border-win-gray-light last:border-b-0"
                >
                  <h3 className="text-sm font-semibold text-gray-800">
                    {exp.role}
                  </h3>
                  <p className="text-xs text-win-blue font-medium">
                    {exp.company}{" "}
                    <span className="text-gray-500 font-normal">
                      | {exp.duration}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-gray-600 leading-snug">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "contact" && (
          <section>
            <h2 className="text-lg font-semibold text-win-blue mb-3">
              Connect & Projects
            </h2>
            <div className="space-y-2">
              {profileData.contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 text-xs text-gray-700 hover:bg-win-gray-light rounded-sm border border-transparent hover:border-win-gray"
                  >
                    <Icon className="w-4 h-4 text-win-blue flex-shrink-0" />
                    {link.name}
                    <span className="text-gray-500 truncate text-[10px] ml-auto hidden sm:inline">
                      ({link.url.replace("https://", "")})
                    </span>
                  </a>
                );
              })}
            </div>
            {/* You could also list key portfolio projects here */}
          </section>
        )}
      </div>
    </div>
  );
}
