import { createContext, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import type {
  CategoriesData,
  LessonsData,
  ProgressData,
  CurrentLesson,
  Feedback,
} from "./types";
import { lessonsData } from "./data/lessons";
import { categoriesData } from "./data/categories";
import { useProgress } from "./hooks/useProgress";
import { useAudio } from "./hooks/useAudio";
import { useLesson } from "./hooks/useLesson";
import { CategoryScreen } from "./components/CategoryScreen";
import { LevelSelectionScreen } from "./components/LevelSelectionScreen";
import { LevelContentScreen } from "./components/LevelContentScreen";
import { LessonScreen } from "./components/LessonScreen";
import { ResultScreen } from "./components/ResultScreen";

interface AppContextType {
  categoriesData: CategoriesData;
  lessonsData: LessonsData;
  progress: Record<string, Record<string, ProgressData>>;
  xp: number;
  streak: number;
  saveProgress: (
    progress: Record<string, Record<string, ProgressData>>,
    xp: number
  ) => void;
  playAudio: (text: string) => void;
  currentLesson: CurrentLesson | null;
  currentExercise: number;
  answer: string;
  setAnswer: (answer: string) => void;
  feedback: Feedback | null;
  hearts: number;
  score: number;
  builtSentence: string[];
  setBuiltSentence: (sentence: string[]) => void;
  startLesson: (unitKey: string, lessonIndex: number) => void;
  checkAnswer: () => void;
  nextExercise: () => void;
  endLesson: (completed: boolean) => void;
  getProgressPercent: () => number;
  navigate: ReturnType<typeof useNavigate>;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContext.Provider");
  }
  return context;
};

/**
 * Componente principal de la aplicación de aprendizaje de inglés.
 * Gestiona la navegación entre pantallas y coordina los hooks personalizados.
 */
export default function EnglishLearningApp() {
  const navigate = useNavigate();

  // Hooks personalizados para manejar estado y lógica
  const { progress, xp, streak, saveProgress } = useProgress();
  const { playAudio } = useAudio();
  const {
    currentLesson,
    currentExercise,
    answer,
    setAnswer,
    feedback,
    hearts,
    score,
    builtSentence,
    setBuiltSentence,
    startLesson: startLessonHook,
    checkAnswer: checkAnswerHook,
    nextExercise: nextExerciseHook,
    getProgressPercent,
  } = useLesson();

  /**
   * Inicia una lección específica.
   * @param unitKey - Clave de la unidad.
   * @param lessonIndex - Índice de la lección en la unidad.
   */
  const startLesson = (unitKey: string, lessonIndex: number) => {
    const lesson = lessonsData[unitKey].lessons[lessonIndex];
    startLessonHook({ ...lesson, unitKey, lessonIndex });
    navigate("/lesson", { state: { unitKey, lessonIndex } });
  };

  /**
   * Verifica la respuesta del usuario para el ejercicio actual.
   */
  const checkAnswer = () => {
    const isCorrect = checkAnswerHook(playAudio);
    if (isCorrect) {
      // Actualizar XP si es correcto
      // Nota: El hook useLesson maneja el score, pero XP se maneja aquí
    }
  };

  /**
   * Avanza al siguiente ejercicio o finaliza la lección.
   */
  const nextExercise = () => {
    nextExerciseHook(() => endLesson(true));
  };

  /**
   * Finaliza la lección y guarda el progreso.
   * @param completed - Si la lección fue completada exitosamente.
   */
  const endLesson = (completed: boolean) => {
    if (completed && currentLesson) {
      const newProgress = { ...progress };
      if (!newProgress[currentLesson.unitKey]) {
        newProgress[currentLesson.unitKey] = {};
      }
      newProgress[currentLesson.unitKey][currentLesson.id] = {
        completed: true,
        score: Math.round((score / currentLesson.exercises.length) * 100),
        hearts: hearts,
      };
      saveProgress(newProgress, xp + score * 10); // XP por respuestas correctas
    }
    navigate("/result", { state: { lesson: currentLesson } });
  };

  const contextValue: AppContextType = {
    categoriesData,
    lessonsData,
    progress,
    xp,
    streak,
    saveProgress,
    playAudio,
    currentLesson,
    currentExercise,
    answer,
    setAnswer,
    feedback,
    hearts,
    score,
    builtSentence,
    setBuiltSentence,
    startLesson,
    checkAnswer,
    nextExercise,
    endLesson,
    getProgressPercent,
    navigate,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<CategoryScreen />} />
        <Route
          path="/category/:categoryId"
          element={<LevelSelectionScreen />}
        />
        <Route
          path="/level/:categoryId/:levelId"
          element={<LevelContentScreen />}
        />
        <Route path="/lesson" element={<LessonScreen />} />
        <Route path="/result" element={<ResultScreen />} />
      </Routes>
    </AppContext.Provider>
  );
}
