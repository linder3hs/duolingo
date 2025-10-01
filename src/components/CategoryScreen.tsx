import { Award, Flame, Star, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App";

/**
 * Componente para la pantalla de selección de categorías.
 * Muestra las categorías Básico, Intermedio y Avanzado.
 */
export const CategoryScreen = () => {
  const navigate = useNavigate();
  const { categoriesData, streak, xp } = useAppContext();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 screen-enter">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                English Learning
              </h1>
              <p className="text-gray-600">Elige tu nivel de dificultad</p>
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

        {/* Categorías */}
        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(categoriesData).map(([categoryKey, category]) => (
            <button
              key={categoryKey}
              onClick={() =>
                category.enabled && navigate("/category/" + categoryKey)
              }
              disabled={!category.enabled}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center ${
                category.enabled
                  ? "hover:scale-105 cursor-pointer"
                  : "opacity-60 cursor-not-allowed"
              }`}
              aria-label={
                category.enabled
                  ? `Seleccionar categoría ${category.name}`
                  : `Categoría ${category.name} próximamente`
              }
            >
              <div className="mb-4">
                {category.enabled ? (
                  <Award className="text-yellow-500 mx-auto" size={48} />
                ) : (
                  <Lock className="text-gray-400 mx-auto" size={48} />
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {category.name}
              </h2>
              <p className="text-gray-600">
                {category.enabled ? "Disponible" : "Próximamente"}
              </p>
              {!category.enabled && (
                <div className="mt-4 text-sm text-gray-500">🔒 Coming Soon</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
