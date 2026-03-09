import avatar from "@/assets/avatar.jpg";
import { ChevronRight, Crown, Film, Heart, Star, Bell, Globe, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Просмотрено", value: "47", icon: Film },
  { label: "Избранное", value: "23", icon: Heart },
  { label: "Оценки", value: "38", icon: Star },
];

const menuItems = [
  { label: "Подписка", icon: Crown, to: "/premium" },
  { label: "Уведомления", icon: Bell },
  { label: "Настройки воспроизведения", icon: Settings },
  { label: "Язык", icon: Globe },
];

export default function ProfileScreen() {
  const navigate = useNavigate();

  return (
    <div className="pb-20 min-h-screen">
      <div className="px-4 pt-4">
        <h1 className="text-xl font-bold text-foreground mb-6">Профиль</h1>

        {/* Avatar & info */}
        <div className="flex items-center gap-4 mb-6">
          <img src={avatar} alt="Аватар" className="w-16 h-16 rounded-full object-cover border-2 border-primary/30" />
          <div>
            <h2 className="text-base font-bold text-foreground">Алексей</h2>
            <p className="text-xs text-muted-foreground">Бесплатный план</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mb-6">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex-1 p-3 rounded-xl bg-secondary/50 text-center">
              <Icon className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Favorite genres */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Любимые жанры</h3>
          <div className="flex flex-wrap gap-2">
            {["Фантастика", "Триллер", "Драма", "Фэнтези"].map((g) => (
              <span key={g} className="px-3 py-1.5 rounded-lg bg-primary/10 text-xs text-primary font-medium border border-primary/20">{g}</span>
            ))}
          </div>
        </div>

        {/* Premium CTA */}
        <button
          onClick={() => navigate("/premium")}
          className="w-full p-4 rounded-xl bg-gradient-to-r from-primary/20 to-accent/10 border border-primary/20 mb-6 text-left"
        >
          <div className="flex items-center gap-2 mb-1">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Попробуйте Премиум</span>
          </div>
          <p className="text-xs text-muted-foreground">Без рекламы, HD качество и больше</p>
        </button>

        {/* Menu */}
        <div className="space-y-1">
          {menuItems.map(({ label, icon: Icon, to }) => (
            <button
              key={label}
              onClick={() => to && navigate(to)}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/30 transition-colors">
            <LogOut className="w-4 h-4 text-destructive" />
            <span className="text-sm text-destructive">Выйти</span>
          </button>
        </div>
      </div>
    </div>
  );
}
