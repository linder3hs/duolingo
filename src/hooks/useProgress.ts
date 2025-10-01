import { useState, useEffect } from "react";
import type { ProgressData, AppData } from "../types";

/**
 * Hook personalizado para manejar el progreso del usuario.
 * Carga y guarda el progreso en localStorage.
 */
export const useProgress = () => {
  const [progress, setProgress] = useState<
    Record<string, Record<string, ProgressData>>
  >({});
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  // Cargar datos del localStorage al inicializar
  useEffect(() => {
    const savedData = localStorage.getItem("englishAppData");
    if (savedData) {
      const data: AppData = JSON.parse(savedData);
      setProgress(data.progress || {});
      setXp(data.xp || 0);
      setStreak(data.streak || 0);
    }
  }, []);

  /**
   * Guarda el progreso actualizado en localStorage.
   * @param newProgress - El nuevo progreso a guardar.
   * @param newXp - Los nuevos puntos de experiencia.
   */
  const saveProgress = (
    newProgress: Record<string, Record<string, ProgressData>>,
    newXp: number
  ) => {
    const data: AppData = {
      progress: newProgress,
      xp: newXp,
      streak: streak,
      lastVisit: new Date().toISOString(),
    };
    localStorage.setItem("englishAppData", JSON.stringify(data));
  };

  return {
    progress,
    setProgress,
    xp,
    setXp,
    streak,
    setStreak,
    saveProgress,
  };
};
