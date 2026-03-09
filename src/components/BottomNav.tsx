import { NavLink, useLocation } from "react-router-dom";
import { Home, Search, Heart, User, Layers } from "lucide-react";

const tabs = [
  { to: "/", icon: Home, label: "Главная" },
  { to: "/search", icon: Search, label: "Поиск" },
  { to: "/swipe", icon: Layers, label: "Свайпы" },
  { to: "/library", icon: Heart, label: "Сохранённое" },
  { to: "/profile", icon: User, label: "Профиль" },
];

export default function BottomNav() {
  const location = useLocation();
  const isPlayer = location.pathname.startsWith("/player");
  if (isPlayer) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/50 safe-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
            end={to === "/"}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
