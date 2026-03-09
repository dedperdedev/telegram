import { useState } from "react";
import { Search, Sparkles, Clock, TrendingUp, X } from "lucide-react";
import { movies } from "@/data/movies";
import MovieCard from "@/components/MovieCard";

const genres = ["Боевик", "Драма", "Комедия", "Фантастика", "Триллер", "Фэнтези", "Ужасы", "Мелодрама"];
const moods = ["На вечер", "Для двоих", "Поднять настроение", "Подумать"];
const recentSearches = ["Ночной детектив", "фантастика 2024", "триллер"];
const popularSearches = ["Лесная охотница", "За горизонтом", "Крепость грома"];

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"search" | "ai">("search");
  const [aiQuery, setAiQuery] = useState("");

  const filtered = query
    ? movies.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.genres.some((g) => g.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="pb-20 min-h-screen">
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-xl font-bold text-foreground mb-4">Поиск</h1>

        {/* Mode Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode("search")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              mode === "search" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Поиск
          </button>
          <button
            onClick={() => setMode("ai")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              mode === "ai" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Спросить у ИИ
          </button>
        </div>

        {mode === "search" ? (
          <>
            {/* Search Input */}
            <div className="relative mb-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск фильма, сериала, актёра..."
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {query ? (
              <div>
                <p className="text-xs text-muted-foreground mb-3">
                  {filtered.length > 0 ? `Найдено: ${filtered.length}` : "Ничего не найдено"}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {filtered.map((m) => (
                    <MovieCard key={m.id} movie={m} size="small" />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Recent */}
                <div className="mb-5">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> Недавние
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="px-3 py-1.5 rounded-lg bg-secondary text-xs text-secondary-foreground"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular */}
                <div className="mb-5">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <TrendingUp className="w-3 h-3" /> Популярные запросы
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="px-3 py-1.5 rounded-lg bg-secondary text-xs text-secondary-foreground"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Genres */}
                <div className="mb-5">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Жанры</h3>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((g) => (
                      <button
                        key={g}
                        onClick={() => setQuery(g)}
                        className="px-3 py-1.5 rounded-lg bg-primary/10 text-xs text-primary font-medium border border-primary/20"
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Moods */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Настроение</h3>
                  <div className="flex flex-wrap gap-2">
                    {moods.map((m) => (
                      <button
                        key={m}
                        className="px-3 py-1.5 rounded-lg bg-accent/10 text-xs text-accent font-medium border border-accent/20"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          /* AI Mode */
          <div>
            <div className="glass-card p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Спросить у ИИ</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Опишите сюжет, сцену или всё, что помните — мы найдём фильм
              </p>
              <textarea
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Например: фильм, где мужчина просыпается в поезде и ничего не помнит"
                className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none h-24"
              />
              <button
                className="w-full mt-3 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold glow-green disabled:opacity-40"
                disabled={!aiQuery.trim()}
              >
                Найти фильм
              </button>
            </div>

            <p className="text-xs text-muted-foreground text-center mb-4">Попробуйте описать:</p>
            <div className="space-y-2">
              {[
                "Фильм про космос, где команда застревает на неизвестной планете",
                "Сериал про детектива в дождливом городе",
                "Фильм где два друга переезжают в большой город",
              ].map((ex) => (
                <button
                  key={ex}
                  onClick={() => setAiQuery(ex)}
                  className="w-full text-left px-4 py-3 rounded-xl bg-secondary text-xs text-secondary-foreground"
                >
                  «{ex}»
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
