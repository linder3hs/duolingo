/**
 * Componente para mostrar la barra de progreso de la lección.
 * Muestra el porcentaje completado visualmente.
 */
interface ProgressBarProps {
  progressPercent: number;
}

export const ProgressBar = ({ progressPercent }: ProgressBarProps) => {
  return (
    <div className="bg-gray-200 h-3 rounded-full mb-8">
      <div
        className="bg-green-500 h-3 rounded-full transition-all"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
};
