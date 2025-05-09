
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense, useEffect } from "react";

console.log("App module loaded");

// Create QueryClient outside component to avoid recreation
const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendering started");
  
  useEffect(() => {
    console.log("App component mounted");
    
    // Check if any styles are loaded
    const styleSheets = document.styleSheets;
    console.log(`Stylesheets loaded: ${styleSheets.length}`);
    
    return () => {
      console.log("App component unmounting");
    };
  }, []);
  
  try {
    return (
      <div className="app-container">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <BrowserRouter>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Toaster />
              <Sonner />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    );
  } catch (error) {
    console.error("Error rendering App:", error);
    return <div className="error-boundary">An error occurred while loading the application</div>;
  }
};

export default App;
