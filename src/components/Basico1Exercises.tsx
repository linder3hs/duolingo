import { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Play,
  RotateCcw,
  Volume2,
} from "lucide-react";
import { ExerciseRenderer } from "./ExerciseRenderer";
import { ProgressBar } from "./ProgressBar";
import { HeartsDisplay } from "./HeartsDisplay";
import { basico1ExercisesData } from "../data/basico1Exercises";

/**
 * Componente para los ejercicios prácticos del Básico 1.
 * Maneja la secuencia de ejercicios para cada sub-nivel.
 */
interface Basico1ExercisesProps {
  subLevel: string;
  onBackToContent: () => void;
  onPlayAudio: (text: string) => void;
}

export const Basico1Exercises = ({
  subLevel,
  onBackToContent,
  onPlayAudio,
}: Basico1ExercisesProps) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [builtSentence, setBuiltSentence] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    type: "correct" | "incorrect";
    message: string;
  } | null>(null);
  const [hearts, setHearts] = useState(5);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);

  const subLevelData = basico1ExercisesData.find(
    (data) => data.subLevel === subLevel
  );
  const exercises = subLevelData?.exercises || [];
  const currentExercise = exercises[currentExerciseIndex];

  // Reset state when subLevel changes
  useEffect(() => {
    setCurrentExerciseIndex(0);
    setAnswer("");
    setBuiltSentence([]);
    setFeedback(null);
    setHearts(5);
    setScore(0);
    setCompletedExercises(new Array(exercises.length).fill(false));
    setShowResult(false);
  }, [subLevel, exercises.length]);

  const checkAnswer = () => {
    if (!currentExercise) return;

    let isCorrect = false;

    if (currentExercise.type === "multiple") {
      isCorrect = answer === currentExercise.correct.toString();
    } else if (currentExercise.type === "translate") {
      const userAnswer = answer.toLowerCase().trim();
      const correctAnswers = [
        String(currentExercise.correct).toLowerCase(),
        ...(currentExercise.alternatives || []).map((alt) => alt.toLowerCase()),
      ];
      isCorrect = correctAnswers.includes(userAnswer);
    } else if (currentExercise.type === "build") {
      isCorrect =
        builtSentence.join(" ").toLowerCase() ===
        String(currentExercise.correct).toLowerCase();
    }

    if (isCorrect) {
      setFeedback({
        type: "correct",
        message: "¡Excelente! Respuesta correcta.",
      });
      setScore((prev) => prev + 10);
      setCompletedExercises((prev) => {
        const newCompleted = [...prev];
        newCompleted[currentExerciseIndex] = true;
        return newCompleted;
      });
    } else {
      setFeedback({
        type: "incorrect",
        message: "Incorrecto. Inténtalo de nuevo.",
      });
      setHearts((prev) => Math.max(0, prev - 1));
    }

    // Auto-advance after showing feedback
    setTimeout(() => {
      if (isCorrect) {
        nextExercise();
      } else {
        setFeedback(null);
      }
    }, 2000);
  };

  const nextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setAnswer("");
      setBuiltSentence([]);
      setFeedback(null);
    } else {
      setShowResult(true);
    }
  };

  const restartExercises = () => {
    setCurrentExerciseIndex(0);
    setAnswer("");
    setBuiltSentence([]);
    setFeedback(null);
    setHearts(5);
    setScore(0);
    setCompletedExercises(new Array(exercises.length).fill(false));
    setShowResult(false);
  };

  const progressPercent =
    ((currentExerciseIndex +
      (completedExercises[currentExerciseIndex] ? 1 : 0)) /
      exercises.length) *
    100;

  if (showResult) {
    const totalScore = score;
    const maxScore = exercises.length * 10;
    const percentage = Math.round((totalScore / maxScore) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 screen-enter">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToContent}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                aria-label="Volver al contenido"
              >
                <ArrowLeft size={24} />
                <span>Volver</span>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Resultados - {subLevelData?.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mb-6">
              {percentage >= 80 ? (
                <CheckCircle
                  className="text-green-500 mx-auto mb-4"
                  size={64}
                />
              ) : (
                <XCircle className="text-red-500 mx-auto mb-4" size={64} />
              )}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {percentage >= 80 ? "¡Felicitaciones!" : "Sigue practicando"}
              </h2>
              <p className="text-gray-600">
                Completaste {completedExercises.filter(Boolean).length} de{" "}
                {exercises.length} ejercicios
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {totalScore}
                </div>
                <div className="text-sm text-blue-800">Puntuación</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">
                  {percentage}%
                </div>
                <div className="text-sm text-green-800">Precisión</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={restartExercises}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                <RotateCcw size={20} />
                Repetir Ejercicios
              </button>
              <button
                onClick={onBackToContent}
                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                <ArrowLeft size={20} />
                Volver al Contenido
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentExercise) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 screen-enter">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-600">
              No hay ejercicios disponibles para este nivel.
            </p>
            <button
              onClick={onBackToContent}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl transition-colors"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 screen-enter">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToContent}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                aria-label="Volver al contenido"
              >
                <ArrowLeft size={24} />
                <span>Volver</span>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {subLevelData?.title}
                </h1>
                <p className="text-gray-600">
                  Ejercicio {currentExerciseIndex + 1} de {exercises.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <HeartsDisplay hearts={hearts} />
              <div className="text-right">
                <div className="text-sm text-gray-600">Puntuación</div>
                <div className="font-bold text-gray-800">{score}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <ProgressBar progressPercent={progressPercent} />
        </div>

        {/* Ejercicio */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {currentExercise.question}
              </h2>
              <button
                onClick={() => onPlayAudio(currentExercise.audio)}
                className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                aria-label="Escuchar ejercicio"
              >
                <Volume2 className="text-blue-600" size={24} />
              </button>
            </div>

            <ExerciseRenderer
              exercise={currentExercise}
              answer={answer}
              setAnswer={setAnswer}
              builtSentence={builtSentence}
              setBuiltSentence={setBuiltSentence}
            />
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`mb-6 p-4 rounded-xl ${
                feedback.type === "correct"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {feedback.type === "correct" ? (
                  <CheckCircle className="text-green-500" size={24} />
                ) : (
                  <XCircle className="text-red-500" size={24} />
                )}
                <span
                  className={`font-bold ${
                    feedback.type === "correct"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {feedback.message}
                </span>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {completedExercises.filter(Boolean).length} / {exercises.length}{" "}
              completados
            </div>
            <button
              onClick={checkAnswer}
              disabled={!answer && builtSentence.length === 0}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              <Play size={20} />
              Verificar Respuesta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
