// TypeScript interfaces for the English Learning App

export interface Exercise {
  type: "multiple" | "translate" | "build";
  question: string;
  options?: string[];
  correct: string | number;
  alternatives?: string[];
  words?: string[];
  audio: string;
}

export interface Lesson {
  id: string;
  title: string;
  exercises: Exercise[];
}

export interface Unit {
  title: string;
  color: string;
  lessons: Lesson[];
}

export interface ProgressData {
  completed: boolean;
  score: number;
  hearts: number;
}

export interface CurrentLesson extends Lesson {
  unitKey: string;
  lessonIndex: number;
}

export interface Feedback {
  type: "correct" | "incorrect";
  message: string;
}

export interface AppData {
  progress: Record<string, Record<string, ProgressData>>;
  xp: number;
  streak: number;
  lastVisit: string;
}

export interface Level {
  id: string;
  title: string;
  description?: string;
  content?: unknown; // Placeholder for future content
}

export interface Category {
  id: string;
  name: string;
  enabled: boolean;
  levels: Level[];
}

export interface CategoriesData {
  [categoryKey: string]: Category;
}

export interface LessonsData {
  [unitKey: string]: Unit;
}

// Exercise type guards for better type safety
export const isMultipleChoice = (
  exercise: Exercise
): exercise is Exercise & { type: "multiple"; options: string[] } => {
  return exercise.type === "multiple" && Array.isArray(exercise.options);
};

export const isTranslateExercise = (
  exercise: Exercise
): exercise is Exercise & { type: "translate" } => {
  return exercise.type === "translate";
};

export const isBuildExercise = (
  exercise: Exercise
): exercise is Exercise & { type: "build"; words: string[] } => {
  return exercise.type === "build" && Array.isArray(exercise.words);
};
