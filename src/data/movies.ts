import poster1 from "@/assets/poster-1.jpg";
import poster2 from "@/assets/poster-2.jpg";
import poster3 from "@/assets/poster-3.jpg";
import poster4 from "@/assets/poster-4.jpg";
import poster5 from "@/assets/poster-5.jpg";
import poster6 from "@/assets/poster-6.jpg";
import poster7 from "@/assets/poster-7.jpg";
import poster8 from "@/assets/poster-8.jpg";
import heroBanner from "@/assets/hero-banner.jpg";

export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  duration: string;
  genres: string[];
  poster: string;
  backdrop?: string;
  description: string;
  isSeries?: boolean;
  seasons?: number;
  episodes?: number;
  progress?: number;
  currentEpisode?: string;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Лесная охотница",
    year: 2024,
    rating: 8.1,
    duration: "2ч 15мин",
    genres: ["Приключения", "Фэнтези"],
    poster: poster1,
    backdrop: poster1,
    description: "Молодая воительница отправляется в опасное путешествие через заколдованный лес, чтобы спасти свой народ от древнего проклятия.",
  },
  {
    id: "2",
    title: "Ночной детектив",
    year: 2023,
    rating: 7.8,
    duration: "1ч 52мин",
    genres: ["Триллер", "Детектив"],
    poster: poster2,
    description: "Детектив расследует серию загадочных исчезновений в ночном городе, где каждая улика ведёт к ещё большей тайне.",
    isSeries: true,
    seasons: 2,
    episodes: 16,
    progress: 35,
    currentEpisode: "S1:E4",
  },
  {
    id: "3",
    title: "За горизонтом",
    year: 2024,
    rating: 8.5,
    duration: "2ч 28мин",
    genres: ["Фантастика", "Драма"],
    poster: poster3,
    backdrop: heroBanner,
    description: "Экипаж космического корабля обнаруживает загадочную планету на краю галактики, которая может стать новым домом для человечества.",
  },
  {
    id: "4",
    title: "Мост над закатом",
    year: 2023,
    rating: 7.4,
    duration: "1ч 48мин",
    genres: ["Драма", "Мелодрама"],
    poster: poster4,
    description: "История двух людей, чьи судьбы переплетаются на старом мосту в маленьком городке на юге.",
  },
  {
    id: "5",
    title: "Крепость грома",
    year: 2024,
    rating: 8.3,
    duration: "2ч 05мин",
    genres: ["Фэнтези", "Боевик"],
    poster: poster5,
    description: "Древняя крепость хранит тайну, способную изменить судьбу целого королевства.",
    isSeries: true,
    seasons: 3,
    episodes: 24,
  },
  {
    id: "6",
    title: "Точка невозврата",
    year: 2023,
    rating: 7.9,
    duration: "2ч 01мин",
    genres: ["Боевик", "Триллер"],
    poster: poster6,
    description: "Бывший агент вынужден вернуться к прошлой жизни, когда его семье угрожает опасность.",
    progress: 65,
  },
  {
    id: "7",
    title: "Тихий коридор",
    year: 2024,
    rating: 7.2,
    duration: "1ч 40мин",
    genres: ["Ужасы", "Триллер"],
    poster: poster7,
    description: "Медсестра ночной смены начинает замечать странные события в заброшенном крыле больницы.",
  },
  {
    id: "8",
    title: "Огни большого города",
    year: 2023,
    rating: 7.6,
    duration: "1ч 55мин",
    genres: ["Комедия", "Драма"],
    poster: poster8,
    description: "Два друга из маленького города приезжают покорять столицу и открывают для себя совершенно новый мир.",
    isSeries: true,
    seasons: 1,
    episodes: 8,
    progress: 50,
    currentEpisode: "S1:E4",
  },
];

export const continueWatching = movies.filter((m) => m.progress);
export const popular = [movies[0], movies[2], movies[4], movies[5]];
export const newReleases = [movies[6], movies[3], movies[1], movies[7]];
export const recommended = [movies[2], movies[0], movies[5], movies[4]];
export const seriesForYou = movies.filter((m) => m.isSeries);
export const shortEvening = [movies[3], movies[6], movies[7]];
