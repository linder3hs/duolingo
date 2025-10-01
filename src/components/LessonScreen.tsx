import { Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App";
import { HeartsDisplay } from "./HeartsDisplay";
import { ProgressBar } from "./ProgressBar";
import { ExerciseRenderer } from "./ExerciseRenderer";

/**
 * Componente para la pantalla de lección.
 * Maneja la visualización y interacción con los ejercicios.
 */
export const LessonScreen = () => {
  const navigate = useNavigate();
  const {
    currentLesson,
    currentExercise,
    answer,
    setAnswer,
    feedback,
    hearts,
    builtSentence,
    setBuiltSentence,
    getProgressPercent,
    playAudio,
    checkAnswer,
    nextExercise,
  } = useAppContext();

  if (!currentLesson) {
    return <div>Lección no encontrada</div>;
  }
  const exercise = currentLesson.exercises[currentExercise];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ← Salir
          </button>
          <HeartsDisplay hearts={hearts} />
        </div>

        {/* Progress bar */}
        <ProgressBar progressPercent={getProgressPercent()} />

        {/* Ejercicio */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {exercise.question}
            </h2>
            <button
              onClick={() => playAudio(exercise.audio)}
              className="p-3 bg-blue-100 rounded-full hover:bg-blue-200"
            >
              <Volume2 className="text-blue-600" size={24} />
            </button>
          </div>

          <ExerciseRenderer
            exercise={exercise}
            answer={answer}
            setAnswer={setAnswer}
            builtSentence={builtSentence}
            setBuiltSentence={setBuiltSentence}
          />

          {/* Feedback */}
          {feedback && (
            <div
              className={`mt-6 p-4 rounded-xl ${
                feedback.type === "correct"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {feedback.message}
            </div>
          )}

          {/* Botones */}
          <div className="mt-6 flex gap-4">
            {!feedback ? (
              <button
                onClick={checkAnswer}
                disabled={
                  (exercise.type === "translate" && !answer) ||
                  (exercise.type === "multiple" && answer === "") ||
                  (exercise.type === "build" && builtSentence.length === 0)
                }
                className="w-full py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={nextExercise}
                className="w-full py-4 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600"
              >
                Continuar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
