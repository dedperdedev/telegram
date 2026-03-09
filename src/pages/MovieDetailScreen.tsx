import { useParams, useNavigate } from "react-router-dom";
import { movies } from "@/data/movies";
import { ArrowLeft, Heart, Share2, Play, Star, Download } from "lucide-react";

export default function MovieDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === id);

  if (!movie) return <div className="min-h-screen flex items-center justify-center text-foreground">Не найдено</div>;

  const similar = movies.filter((m) => m.id !== movie.id).slice(0, 4);

  return (
    <div className="pb-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-80">
        <img src={movie.backdrop || movie.poster} alt={movie.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-overlay-full" />
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <button className="w-10 h-10 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center">
            <Heart className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      <div className="px-4 -mt-16 relative z-10">
        <h1 className="text-2xl font-bold text-foreground mb-2">{movie.title}</h1>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 text-star fill-star" /> {movie.rating}
          </span>
          <span>•</span>
          <span>{movie.duration}</span>
          <span>•</span>
          <span>{movie.year}</span>
        </div>

        <div className="flex gap-1.5 mb-5">
          {movie.genres.map((g) => (
            <span key={g} className="text-[11px] px-2.5 py-1 rounded-full bg-accent/15 text-accent font-medium border border-accent/20">
              {g}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => navigate(`/player/${movie.id}`)}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold glow-green"
          >
            <Play className="w-4 h-4 fill-current" />
            {movie.progress ? "Продолжить" : "Смотреть"}
          </button>
          <button className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center border border-border/50">
            <Download className="w-4.5 h-4.5 text-muted-foreground" />
          </button>
          <button className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center border border-border/50">
            <Share2 className="w-4.5 h-4.5 text-muted-foreground" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-secondary-foreground leading-relaxed mb-6">{movie.description}</p>

        {/* Series info */}
        {movie.isSeries && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Сезоны и серии</h3>
              <span className="text-xs text-muted-foreground">{movie.seasons} сезон • {movie.episodes} серий</span>
            </div>
            {/* Season selector */}
            <div className="flex gap-2 mb-3">
              {Array.from({ length: movie.seasons! }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  Сезон {i + 1}
                </button>
              ))}
            </div>
            {/* Episodes */}
            <div className="space-y-2">
              {Array.from({ length: Math.min(movie.episodes || 4, 4) }, (_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                  <div className="w-20 h-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src={movie.poster} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">Серия {i + 1}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{movie.description.slice(0, 50)}...</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{movie.duration}</p>
                  </div>
                  {i < 2 && movie.progress && (
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Похожие</h3>
          <div className="grid grid-cols-3 gap-3">
            {similar.slice(0, 3).map((m) => (
              <button key={m.id} onClick={() => navigate(`/movie/${m.id}`)} className="group">
                <div className="aspect-[2/3] rounded-xl overflow-hidden mb-1">
                  <img src={m.poster} alt={m.title} className="w-full h-full object-cover" />
                </div>
                <p className="text-[11px] font-medium text-foreground truncate">{m.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
