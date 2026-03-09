import { Movie } from "@/data/movies";
import { Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
  size?: "small" | "medium" | "large";
  showProgress?: boolean;
}

export default function MovieCard({ movie, size = "medium", showProgress }: MovieCardProps) {
  const navigate = useNavigate();
  const widths = { small: "w-28", medium: "w-36", large: "w-44" };
  const heights = { small: "h-40", medium: "h-52", large: "h-64" };

  return (
    <button
      onClick={() => navigate(`/movie/${movie.id}`)}
      className={`${widths[size]} flex-shrink-0 group relative`}
    >
      <div className={`${heights[size]} relative rounded-xl overflow-hidden mb-2`}>
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        <button
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-background/40 backdrop-blur-sm"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <Heart className="w-3.5 h-3.5 text-foreground/80" />
        </button>
        {showProgress && movie.progress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/50">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${movie.progress}%` }}
            />
          </div>
        )}
      </div>
      <p className="text-xs font-semibold text-foreground truncate text-left">{movie.title}</p>
      <div className="flex items-center gap-1 mt-0.5">
        <Star className="w-3 h-3 text-star fill-star" />
        <span className="text-[11px] text-muted-foreground font-medium">{movie.rating}</span>
      </div>
      {movie.genres.length > 0 && (
        <div className="flex gap-1 mt-1 flex-wrap">
          {movie.genres.slice(0, 2).map((g) => (
            <span key={g} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-medium">
              {g}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
