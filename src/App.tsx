import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import HomeScreen from "@/pages/HomeScreen";
import SearchScreen from "@/pages/SearchScreen";
import SwipeScreen from "@/pages/SwipeScreen";
import MovieDetailScreen from "@/pages/MovieDetailScreen";
import PlayerScreen from "@/pages/PlayerScreen";
import LibraryScreen from "@/pages/LibraryScreen";
import ProfileScreen from "@/pages/ProfileScreen";
import PremiumScreen from "@/pages/PremiumScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <div className="max-w-lg mx-auto relative min-h-screen">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/swipe" element={<SwipeScreen />} />
            <Route path="/movie/:id" element={<MovieDetailScreen />} />
            <Route path="/player/:id" element={<PlayerScreen />} />
            <Route path="/library" element={<LibraryScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/premium" element={<PremiumScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
