import { Movie } from "@/data/movies";
import { Play, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroBannerProps {
  movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  const navigate = useNavigate();

  return (
    <div className="relative h-56 mx-4 rounded-2xl overflow-hidden mb-6">
      <img
        src={movie.backdrop || movie.poster}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 gradient-overlay-full" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h2 className="text-lg font-bold text-foreground mb-1">{movie.title}</h2>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 text-star fill-star" />
            {movie.rating}
          </span>
          <span>•</span>
          <span>{movie.duration}</span>
          <span>•</span>
          <span>{movie.year}</span>
        </div>
        <button
          onClick={() => navigate(`/movie/${movie.id}`)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold glow-green"
        >
          <Play className="w-4 h-4 fill-current" />
          Смотреть
        </button>
      </div>
    </div>
  );
}
