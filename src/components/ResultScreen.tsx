import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../App";

/**
 * Componente para la pantalla de resultados.
 * Muestra el puntaje final y opciones para volver o repetir la lección.
 */
export const ResultScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, startLesson } = useAppContext();

  const currentLesson = location.state?.lesson;

  if (!currentLesson) {
    return <div>Resultado no encontrado</div>;
  }
  const finalScore = Math.round((score / currentLesson.exercises.length) * 100);
  const passed = finalScore >= 60;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">{passed ? "🎉" : "😔"}</div>
        <h2 className="text-3xl font-bold mb-4">
          {passed ? "¡Lección Completada!" : "Inténtalo de nuevo"}
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <span className="text-gray-600">Puntuación</span>
            <span className="text-2xl font-bold">{finalScore}%</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <span className="text-gray-600">Respuestas correctas</span>
            <span className="text-2xl font-bold">
              {score}/{currentLesson.exercises.length}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
            <span className="text-gray-600">XP Ganados</span>
            <span className="text-2xl font-bold text-yellow-600">
              +{score * 10} XP
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 bg-gray-200 rounded-xl font-bold hover:bg-gray-300"
          >
            Volver
          </button>
          <button
            onClick={() =>
              startLesson(currentLesson.unitKey, currentLesson.lessonIndex)
            }
            className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600"
          >
            Repetir
          </button>
        </div>
      </div>
    </div>
  );
};
