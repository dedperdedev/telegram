import { useState } from "react";
import { Movie } from "@/data/movies";
import { Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RatingModalProps {
  movie: Movie;
  onClose: () => void;
  onRate: (rating: string) => void;
}

export default function RatingModal({ movie, onClose, onRate }: RatingModalProps) {
  const ratings = [
    { label: "Отлично", emoji: "😍" },
    { label: "Нормально", emoji: "😐" },
    { label: "Не понравилось", emoji: "😞" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-end justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-lg glass-card p-6 pb-10 rounded-t-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-base font-bold text-foreground">Как вам фильм?</h3>
            <button onClick={onClose} className="text-muted-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <img src={movie.poster} alt={movie.title} className="w-14 h-20 rounded-lg object-cover" />
            <div>
              <p className="text-sm font-semibold text-foreground">{movie.title}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Star className="w-3 h-3 text-star fill-star" /> {movie.rating} • {movie.year}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            {ratings.map(({ label, emoji }) => (
              <button
                key={label}
                onClick={() => onRate(label)}
                className="flex-1 flex flex-col items-center gap-2 py-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-xs font-medium text-foreground">{label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
