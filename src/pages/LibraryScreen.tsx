import { useState } from "react";
import { movies } from "@/data/movies";
import { useNavigate } from "react-router-dom";
import { Play, Trash2, Star } from "lucide-react";

const tabs = ["Хочу посмотреть", "Просмотрено", "Избранное", "Не досмотрено"];

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  // Mock different lists
  const lists = [
    movies.slice(0, 4),
    movies.slice(2, 5),
    movies.slice(1, 4),
    movies.filter((m) => m.progress),
  ];

  const currentList = lists[activeTab];

  return (
    <div className="pb-20 min-h-screen">
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-xl font-bold text-foreground mb-4">Сохранённое</h1>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-5">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === i ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        {currentList.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-muted-foreground">Здесь пока ничего нет</p>
          </div>
        ) : (
          <div className="space-y-3">
            {currentList.map((movie) => (
              <button
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="w-full flex gap-3 p-3 rounded-xl bg-secondary/50 text-left"
              >
                <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                  {movie.progress && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/50">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${movie.progress}%` }} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <p className="text-sm font-semibold text-foreground truncate">{movie.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Star className="w-3 h-3 text-star fill-star" /> {movie.rating} • {movie.year}
                  </p>
                  <div className="flex gap-1 mt-1.5">
                    {movie.genres.slice(0, 2).map((g) => (
                      <span key={g} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{g}</span>
                    ))}
                  </div>
                  {movie.progress && (
                    <div className="flex items-center gap-1 mt-2">
                      <Play className="w-3 h-3 text-primary fill-primary" />
                      <span className="text-[10px] text-primary font-medium">Продолжить</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
