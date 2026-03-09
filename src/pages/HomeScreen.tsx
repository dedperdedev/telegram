import avatar from "@/assets/avatar.jpg";
import { Menu } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import MovieRail from "@/components/MovieRail";
import { movies, continueWatching, popular, newReleases, recommended, seriesForYou, shortEvening } from "@/data/movies";

export default function HomeScreen() {
  return (
    <div className="pb-20 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <img src={avatar} alt="Аватар" className="w-9 h-9 rounded-full object-cover border-2 border-primary/30" />
          <span className="text-sm font-semibold text-foreground">Привет, Алексей 👋</span>
        </div>
        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-secondary">
          <Menu className="w-4.5 h-4.5 text-foreground" />
        </button>
      </div>

      {/* Premium Banner */}
      <div className="mx-4 mb-5 p-4 rounded-2xl bg-secondary/80 border border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        <div className="relative z-10">
          <p className="text-sm font-semibold text-foreground mb-1">Смотрите без рекламы</p>
          <p className="text-xs text-muted-foreground mb-3">Безлимитный доступ ко всем фильмам</p>
          <button className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-lg glow-green">
            Премиум
          </button>
        </div>
        <button className="absolute top-3 right-3 text-muted-foreground">
          <span className="text-xs">✕</span>
        </button>
      </div>

      {/* Hero */}
      <HeroBanner movie={movies[2]} />

      {/* Continue Watching */}
      {continueWatching.length > 0 && (
        <MovieRail title="Продолжить просмотр" movies={continueWatching} showProgress />
      )}

      {/* Recommendations */}
      <MovieRail title="Рекомендации для вас" movies={recommended} size="large" />

      {/* Popular */}
      <MovieRail title="Популярное" movies={popular} />

      {/* New */}
      <MovieRail title="Новинки" movies={newReleases} />

      {/* Because you liked */}
      <MovieRail title="Потому что вам понравилось" movies={[movies[0], movies[4], movies[6]]} />

      {/* Short evening */}
      <MovieRail title="Короткое на вечер" movies={shortEvening} size="small" />

      {/* Series */}
      <MovieRail title="Сериалы для вас" movies={seriesForYou} />
    </div>
  );
}
