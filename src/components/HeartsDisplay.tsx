import { Heart } from "lucide-react";

/**
 * Componente para mostrar los corazones (vidas) del usuario.
 * Muestra corazones llenos o vacíos según la cantidad de vidas restantes.
 */
interface HeartsDisplayProps {
  hearts: number;
}

export const HeartsDisplay = ({ hearts }: HeartsDisplayProps) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, idx) => (
        <Heart
          key={idx}
          size={28}
          className={
            idx < hearts ? "text-red-500 fill-red-500" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
};
