import { Award, Flame, Star } from "lucide-react";
import type { LessonsData, ProgressData } from "../types";

/**
 * Componente para la pantalla de inicio.
 * Muestra las unidades, lecciones y estadísticas del usuario.
 */
interface HomeScreenProps {
  lessonsData: LessonsData;
  progress: Record<string, Record<string, ProgressData>>;
  streak: number;
  xp: number;
  onStartLesson: (unitKey: string, lessonIndex: number) => void;
}

export const HomeScreen = ({
  lessonsData,
  progress,
  streak,
  xp,
  onStartLesson,
}: HomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                English Learning
              </h1>
              <p className="text-gray-600">Aprende inglés paso a paso</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-xl">
                <Flame className="text-orange-500" size={24} />
                <span className="font-bold text-orange-600">{streak} días</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-xl">
                <Star className="text-yellow-500" size={24} />
                <span className="font-bold text-yellow-600">{xp} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Unidades y lecciones */}
        {Object.entries(lessonsData).map(([unitKey, unit]) => (
          <div key={unitKey} className="mb-8">
            <div className={`${unit.color} text-white rounded-2xl p-6 mb-4`}>
              <h2 className="text-2xl font-bold">{unit.title}</h2>
            </div>
            <div className="grid gap-4">
              {unit.lessons.map((lesson, idx) => {
                const isCompleted = progress[unitKey]?.[lesson.id]?.completed;
                const isLocked =
                  idx > 0 &&
                  !progress[unitKey]?.[unit.lessons[idx - 1].id]?.completed;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => !isLocked && onStartLesson(unitKey, idx)}
                    disabled={isLocked}
                    className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-left ${
                      isLocked ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {lesson.title}
                        </h3>
                        <p className="text-gray-600">
                          {lesson.exercises.length} ejercicios
                        </p>
                      </div>
                      {isCompleted && (
                        <Award className="text-yellow-500" size={32} />
                      )}
                      {isLocked && (
                        <div className="text-gray-400 text-2xl">🔒</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
