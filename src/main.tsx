
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add a console log to check if main.tsx is loading
console.log('main.tsx is executing');

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found!");
} else {
  console.log('Root element found, rendering app');
  createRoot(rootElement).render(<App />);
}
