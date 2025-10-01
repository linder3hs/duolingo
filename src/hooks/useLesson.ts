import { useState } from "react";
import type { CurrentLesson, Feedback, Exercise } from "../types";

/**
 * Hook personalizado para manejar el estado y lógica de una lección.
 * Gestiona el ejercicio actual, respuestas, feedback y finalización de lección.
 */
export const useLesson = () => {
  const [currentLesson, setCurrentLesson] = useState<CurrentLesson | null>(
    null
  );
  const [currentExercise, setCurrentExercise] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [hearts, setHearts] = useState(5);
  const [score, setScore] = useState(0);
  const [builtSentence, setBuiltSentence] = useState<string[]>([]);

  /**
   * Inicia una nueva lección.
   * @param lesson - La lección a iniciar.
   */
  const startLesson = (lesson: CurrentLesson) => {
    setCurrentLesson(lesson);
    setCurrentExercise(0);
    setHearts(5);
    setScore(0);
    setFeedback(null);
    setAnswer("");
    setBuiltSentence([]);
  };

  /**
   * Verifica la respuesta del usuario para el ejercicio actual.
   * @param playAudio - Función para reproducir audio.
   * @returns true si la respuesta es correcta, false en caso contrario.
   */
  const checkAnswer = (playAudio: (text: string) => void): boolean => {
    if (!currentLesson) return false;

    const exercise = currentLesson.exercises[currentExercise];
    let isCorrect = false;

    if (exercise.type === "multiple") {
      isCorrect = parseInt(answer) === exercise.correct;
    } else if (exercise.type === "translate") {
      const userAnswer = answer.toLowerCase().trim();
      isCorrect =
        userAnswer === exercise.correct ||
        (exercise.alternatives?.includes(userAnswer) ?? false);
    } else if (exercise.type === "build") {
      const builtAnswer = builtSentence.join(" ");
      isCorrect = builtAnswer === exercise.correct;
    }

    if (isCorrect) {
      setFeedback({ type: "correct", message: "¡Correcto! 🎉" });
      setScore(score + 1);
      playAudio(exercise.audio);
    } else {
      setFeedback({
        type: "incorrect",
        message: `Incorrecto. La respuesta correcta es: ${
          exercise.type === "build"
            ? exercise.correct
            : exercise.type === "multiple"
            ? exercise.options?.[exercise.correct as number] ?? exercise.correct
            : exercise.correct
        }`,
      });
      setHearts(hearts - 1);
    }

    return isCorrect;
  };

  /**
   * Avanza al siguiente ejercicio o finaliza la lección.
   * @param onLessonEnd - Callback a ejecutar cuando la lección termina.
   */
  const nextExercise = (onLessonEnd: (completed: boolean) => void) => {
    if (!currentLesson) return;

    if (currentExercise + 1 < currentLesson.exercises.length) {
      setCurrentExercise(currentExercise + 1);
      setFeedback(null);
      setAnswer("");
      setBuiltSentence([]);
    } else {
      onLessonEnd(true);
    }
  };

  /**
   * Reinicia el estado para un nuevo ejercicio.
   */
  const resetExercise = () => {
    setFeedback(null);
    setAnswer("");
    setBuiltSentence([]);
  };

  /**
   * Obtiene el ejercicio actual.
   */
  const getCurrentExercise = (): Exercise | null => {
    return currentLesson ? currentLesson.exercises[currentExercise] : null;
  };

  /**
   * Calcula el porcentaje de progreso de la lección.
   */
  const getProgressPercent = (): number => {
    if (!currentLesson) return 0;
    return ((currentExercise + 1) / currentLesson.exercises.length) * 100;
  };

  return {
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
    resetExercise,
    getCurrentExercise,
    getProgressPercent,
  };
};
