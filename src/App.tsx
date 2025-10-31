import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/world-map" element={<Dashboard />} />
              <Route path="/forecast" element={<Dashboard />} />
              <Route path="/scenarios" element={<Dashboard />} />
              <Route path="/training" element={<Dashboard />} />
              <Route path="/sectors" element={<Dashboard />} />
              <Route path="/anomalies" element={<Dashboard />} />
              <Route path="/notifications" element={<Dashboard />} />
              <Route path="/reports" element={<Dashboard />} />
              <Route path="/settings" element={<Dashboard />} />
              <Route path="/profile" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
