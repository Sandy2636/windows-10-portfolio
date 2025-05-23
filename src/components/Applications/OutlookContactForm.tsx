// src/components/Applications/OutlookContactForm.tsx
"use client";
import React, { useState } from "react";
import {
  PaperAirplaneIcon,
  UserCircleIcon,
  EnvelopeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

interface OutlookContactFormProps {
  windowId: string;
  recipientEmail?: string; // Your email, passed as a prop
}

export default function OutlookContactForm({
  windowId,
  recipientEmail = "your-email@example.com", // Replace with your actual email
}: OutlookContactFormProps) {
  const [fromEmail, setFromEmail] = useState(""); // Could be prefilled with a dummy or user input
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("Sending...");
    // TODO: Implement actual email sending logic here
    // This would involve an API call to a backend service (EmailJS, SendGrid, serverless function)
    // Example:
    // try {
    //   const response = await fetch('/api/send-email', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ to: recipientEmail, from: fromEmail, subject, body }),
    //   });
    //   if (response.ok) {
    //     setStatusMessage('Message sent successfully! Thank you.');
    //     setSubject(''); setBody(''); setFromEmail(''); // Clear form
    //   } else {
    //     const errorData = await response.json();
    //     setStatusMessage(`Error: ${errorData.message || 'Could not send message.'}`);
    //   }
    // } catch (error) {
    //   setStatusMessage('Error: Network issue or server unavailable.');
    // }
    setTimeout(() => {
      // Simulate API call
      if (subject && body && (fromEmail || !isFromEditable)) {
        // Simple validation
        setStatusMessage(
          `Message to ${recipientEmail} sent successfully (simulated)! Thank you for reaching out.`
        );
        setSubject("");
        setBody("");
        if (isFromEditable) setFromEmail("");
      } else {
        setStatusMessage(
          "Please fill in all required fields (simulated error)."
        );
      }
    }, 1500);
  };

  const isFromEditable = false; // Set to true if you want users to enter their email

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-full bg-win-white font-segoe-ui text-sm text-black select-none"
    >
      {/* 1. Ribbon/Toolbar (Simplified Outlook style) */}
      <div className="h-[50px] bg-[#f3f3f3] border-b border-[#c6c6c6] p-2 flex items-center gap-2 flex-shrink-0">
        <button
          type="submit"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-win-blue text-white text-xs rounded-sm hover:bg-opacity-80 active:bg-opacity-90"
        >
          <PaperAirplaneIcon className="w-4 h-4" />
          Send
        </button>
        {/* Add more simulated Outlook actions here if desired (e.g., Attach, Formatting) */}
      </div>

      {/* 2. Header Fields */}
      <div className="p-3 border-b border-[#e1e1e1] space-y-2 flex-shrink-0 bg-white">
        <div className="flex items-center">
          <label
            htmlFor={`to-${windowId}`}
            className="w-16 text-xs text-gray-600"
          >
            To:
          </label>
          <input
            type="email"
            id={`to-${windowId}`}
            value={recipientEmail}
            readOnly
            className="flex-grow h-[26px] px-2 bg-gray-100 border-none text-xs text-gray-700 cursor-not-allowed rounded-sm"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor={`from-${windowId}`}
            className="w-16 text-xs text-gray-600"
          >
            From:
          </label>
          <input
            type="email"
            id={`from-${windowId}`}
            value={isFromEditable ? fromEmail : "visitor@your-portfolio.dev"}
            onChange={
              isFromEditable ? (e) => setFromEmail(e.target.value) : undefined
            }
            readOnly={!isFromEditable}
            required={isFromEditable}
            placeholder={isFromEditable ? "Your email address" : undefined}
            className={`flex-grow h-[26px] px-2 border ${
              isFromEditable
                ? "border-win-gray-dark focus:border-win-blue"
                : "bg-gray-100 border-none text-gray-700 cursor-not-allowed"
            } text-xs outline-none rounded-sm`}
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor={`subject-${windowId}`}
            className="w-16 text-xs text-gray-600"
          >
            Subject:
          </label>
          <input
            type="text"
            id={`subject-${windowId}`}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            placeholder="Subject of your message"
            className="flex-grow h-[26px] px-2 border border-win-gray-dark focus:border-win-blue text-xs outline-none rounded-sm"
          />
        </div>
      </div>

      {/* 3. Body */}
      <div className="flex-grow p-0.5 overflow-hidden bg-white">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          placeholder="Write your message here..."
          className="w-full h-full p-2.5 border-none outline-none resize-none text-sm leading-relaxed"
          spellCheck="true"
        />
      </div>
      {statusMessage && (
        <div className="p-2 text-xs text-center bg-win-gray-light border-t border-[#e1e1e1] flex-shrink-0 text-gray-700">
          {statusMessage}
        </div>
      )}
    </form>
  );
}
