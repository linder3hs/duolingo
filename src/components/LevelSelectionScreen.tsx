import { ArrowLeft, Play } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../App";

/**
 * Componente para la pantalla de selección de niveles.
 * Muestra los 12 niveles de la categoría seleccionada.
 */
export const LevelSelectionScreen = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const { categoriesData } = useAppContext();

  if (!categoryId || !categoriesData[categoryId]) {
    return <div>Categoría no encontrada</div>;
  }

  const category = categoriesData[categoryId];
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 screen-enter">
      <div className="max-w-4xl mx-auto">
        {/* Header con botón de volver */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Volver a categorías"
            >
              <ArrowLeft size={24} />
              <span>Volver</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {category.name}
              </h1>
              <p className="text-gray-600">Selecciona un nivel para comenzar</p>
            </div>
          </div>
        </div>

        {/* Niveles */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {category.levels.map((level, index) => (
            <button
              key={level.id}
              onClick={() => navigate("/level/" + categoryId + "/" + level.id)}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-left hover:scale-105"
              aria-label={`Seleccionar ${level.title}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-800">
                  {level.title}
                </h3>
                <Play className="text-blue-500" size={24} />
              </div>
              <p className="text-gray-600">{level.description}</p>
              <div className="mt-4 text-sm text-gray-500">
                Nivel {index + 1}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
