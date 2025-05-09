
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root");
console.log("Root element found:", rootElement);

if (rootElement) {
  const root = createRoot(rootElement);
  console.log("React root created, mounting App component");
  
  root.render(<App />);
  console.log("App component rendered");
} else {
  console.error("Root element not found. Cannot mount React application.");
}
