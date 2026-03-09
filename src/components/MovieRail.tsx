import { Movie } from "@/data/movies";
import MovieCard from "./MovieCard";
import { ChevronRight } from "lucide-react";

interface MovieRailProps {
  title: string;
  movies: Movie[];
  size?: "small" | "medium" | "large";
  showProgress?: boolean;
}

export default function MovieRail({ title, movies, size = "medium", showProgress }: MovieRailProps) {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-base font-bold text-foreground">{title}</h2>
        <button className="flex items-center text-xs text-muted-foreground font-medium">
          Все <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} size={size} showProgress={showProgress} />
        ))}
      </div>
    </section>
  );
}
