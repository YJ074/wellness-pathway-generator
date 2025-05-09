
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("=== STARTUP: Application initialization beginning ===");
console.log("Document ready state:", document.readyState);
console.log("Searching for root element with ID 'root'");

const rootElement = document.getElementById("root");
console.log("Root element found:", rootElement);
console.log("Root element properties:", rootElement ? {
  tagName: rootElement.tagName,
  id: rootElement.id,
  childNodes: rootElement.childNodes.length,
  visibility: window.getComputedStyle(rootElement).visibility,
  display: window.getComputedStyle(rootElement).display,
} : "NULL");

if (rootElement) {
  try {
    console.log("Creating React root...");
    const root = createRoot(rootElement);
    console.log("React root created successfully");
    
    console.log("Rendering App component...");
    root.render(<App />);
    console.log("=== STARTUP: App component render called successfully ===");
  } catch (error) {
    console.error("CRITICAL ERROR during React initialization:", error);
  }
} else {
  console.error("CRITICAL ERROR: Root element not found. Cannot mount React application.");
  console.log("DOM structure:", document.body.innerHTML);
}
