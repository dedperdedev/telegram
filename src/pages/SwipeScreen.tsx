import { useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate, PanInfo } from "framer-motion";
import { Heart, X, Eye, Star, Play } from "lucide-react";
import { movies, Movie } from "@/data/movies";
import RatingModal from "@/components/RatingModal";
import { useNavigate } from "react-router-dom";

export default function SwipeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratingMovie, setRatingMovie] = useState<Movie | null>(null);
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const currentMovie = movies[currentIndex % movies.length];
  const nextMovie = movies[(currentIndex + 1) % movies.length];

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => i + 1);
    x.set(0);
  }, [x]);

  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      if (Math.abs(info.offset.x) > 100) {
        const dir = info.offset.x > 0 ? 300 : -300;
        animate(x, dir, { duration: 0.2 }).then(handleNext);
      } else {
        animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
      }
    },
    [x, handleNext]
  );

  return (
    <div className="pb-20 min-h-screen flex flex-col">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-foreground">Открывайте новое</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Свайпайте, чтобы найти фильм</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
        {/* Next card (behind) */}
        <div className="absolute w-[calc(100%-3rem)] max-w-sm h-[420px] rounded-2xl overflow-hidden opacity-40 scale-95">
          <img src={nextMovie.poster} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Current card */}
        <motion.div
          style={{ x, rotate, opacity }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragEnd={handleDragEnd}
          className="relative w-full max-w-sm h-[420px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing z-10"
        >
          <img src={currentMovie.poster} alt={currentMovie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-overlay-full" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-xl font-bold text-foreground mb-1">{currentMovie.title}</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <span className="flex items-center gap-0.5">
                <Star className="w-3 h-3 text-star fill-star" /> {currentMovie.rating}
              </span>
              <span>•</span>
              <span>{currentMovie.year}</span>
              <span>•</span>
              <span>{currentMovie.duration}</span>
            </div>
            <div className="flex gap-1.5 mb-3">
              {currentMovie.genres.map((g) => (
                <span key={g} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-medium">
                  {g}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{currentMovie.description}</p>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-6 z-10">
          <button
            onClick={() => {
              animate(x, -300, { duration: 0.2 }).then(handleNext);
            }}
            className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border border-border/50"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            onClick={() => setRatingMovie(currentMovie)}
            className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center border border-border/50"
          >
            <Eye className="w-4.5 h-4.5 text-muted-foreground" />
          </button>
          <button
            onClick={() => navigate(`/movie/${currentMovie.id}`)}
            className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center border border-primary/30"
          >
            <Play className="w-4 h-4 text-primary fill-primary" />
          </button>
          <button
            onClick={() => {
              animate(x, 300, { duration: 0.2 }).then(handleNext);
            }}
            className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 glow-green"
          >
            <Heart className="w-5 h-5 text-primary" />
          </button>
        </div>

        <div className="flex gap-6 mt-3 text-[10px] text-muted-foreground z-10">
          <span>Пропустить</span>
          <span>Смотрел</span>
          <span>Смотреть</span>
          <span>В избранное</span>
        </div>
      </div>

      {ratingMovie && (
        <RatingModal
          movie={ratingMovie}
          onClose={() => setRatingMovie(null)}
          onRate={(r) => {
            setRatingMovie(null);
            handleNext();
          }}
        />
      )}
    </div>
  );
}
