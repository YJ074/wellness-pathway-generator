
import { createRoot } from 'react-dom/client'
import './index.css'

// Create a simple diagnostic component for immediate visibility
const DiagnosticApp = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Arogyam75 - Diagnostic Page</h1>
      <p>If you can see this text, basic React rendering is working.</p>
      <div style={{ padding: "10px", background: "#e0f2fe", borderRadius: "4px", marginTop: "20px" }}>
        <p>Troubleshooting information:</p>
        <ul>
          <li>Browser: {navigator.userAgent}</li>
          <li>Window dimensions: {window.innerWidth} x {window.innerHeight}</li>
          <li>React version: {React.version}</li>
        </ul>
      </div>
    </div>
  );
};

console.log("=== STARTUP: Application initialization beginning ===");

// Basic diagnostic info
console.log("Window dimensions:", window.innerWidth, "x", window.innerHeight);
console.log("User agent:", navigator.userAgent);
console.log("Document ready state:", document.readyState);

// Check CSS loading
const styleSheets = document.styleSheets;
console.log(`Stylesheets loaded: ${styleSheets.length}`);

// Search for root element
const rootElement = document.getElementById("root");
console.log("Root element found:", rootElement);

if (rootElement) {
  console.log("Root element dimensions:", rootElement.clientWidth, "x", rootElement.clientHeight);
  console.log("Root element styles:", {
    display: window.getComputedStyle(rootElement).display,
    visibility: window.getComputedStyle(rootElement).visibility,
    position: window.getComputedStyle(rootElement).position,
    width: window.getComputedStyle(rootElement).width,
    height: window.getComputedStyle(rootElement).height,
    overflow: window.getComputedStyle(rootElement).overflow
  });

  try {
    console.log("Mounting diagnostic component for visibility testing...");
    const root = createRoot(rootElement);
    root.render(<DiagnosticApp />);
    console.log("=== STARTUP: Diagnostic component render called successfully ===");
  } catch (error) {
    console.error("CRITICAL ERROR during React initialization:", error);
  }
} else {
  console.error("CRITICAL ERROR: Root element not found. Cannot mount React application.");
  console.log("Current DOM structure:", document.body.innerHTML);
}

// Define React for DiagnosticApp
import React from 'react';

// Only after confirmation that the diagnostic component works,
// we will update this file to import the actual App component
// If the diagnostic component renders, then we'll have better information
// about what might be causing the issue with the full application
