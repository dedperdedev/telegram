import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movies } from "@/data/movies";
import { X, Settings, RotateCcw, Play, Pause, SkipForward, Subtitles, Maximize } from "lucide-react";

export default function PlayerScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === id);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(12);
  const [showControls, setShowControls] = useState(true);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-background z-[100] flex items-center justify-center" onClick={() => setShowControls(!showControls)}>
      {/* Video placeholder */}
      <img src={movie.backdrop || movie.poster} alt="" className="w-full h-full object-cover" />

      {/* Controls overlay */}
      {showControls && (
        <div className="absolute inset-0 bg-background/40" onClick={(e) => e.stopPropagation()}>
          {/* Top controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-background/50 backdrop-blur-sm flex items-center justify-center">
              <X className="w-5 h-5 text-foreground" />
            </button>
            <div className="text-center">
              <p className="text-xs font-semibold text-foreground">{movie.title}</p>
              {movie.currentEpisode && <p className="text-[10px] text-muted-foreground">{movie.currentEpisode}</p>}
            </div>
            <button className="w-10 h-10 rounded-xl bg-background/50 backdrop-blur-sm flex items-center justify-center">
              <Settings className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Center play/pause */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button onClick={() => setPlaying(!playing)} className="w-16 h-16 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center">
              {playing ? <Pause className="w-8 h-8 text-foreground fill-current" /> : <Play className="w-8 h-8 text-foreground fill-current ml-1" />}
            </button>
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-6 left-4 right-4">
            <div className="glass-card rounded-2xl p-3">
              <div className="flex items-center gap-3">
                <button className="text-[10px] font-bold text-foreground bg-secondary px-2 py-1 rounded-md">HQ</button>
                <button><Subtitles className="w-4 h-4 text-foreground" /></button>
                <div className="flex-1 relative h-1 bg-muted rounded-full">
                  <div className="absolute left-0 top-0 h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full border-2 border-primary-foreground"
                    style={{ left: `${progress}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground font-mono whitespace-nowrap">00:16 / 2:12:02</span>
                <button><RotateCcw className="w-4 h-4 text-foreground" /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
