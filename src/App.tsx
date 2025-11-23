import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useThemeColor, ThemeColorProvider } from "@/hooks/use-theme-color";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import VantaBackground from "@/components/VantaBackground";

function AppContent() {
  const { themeColor } = useThemeColor();

  useEffect(() => {
    // Initialize theme color on mount
  }, [themeColor]);

  return (
    <>
      <VantaBackground />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const App = () => (                                                                                                                                                                                                                                                                                                                                       
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ThemeColorProvider>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </ThemeColorProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
