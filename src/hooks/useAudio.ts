/**
 * Hook personalizado para manejar la reproducción de audio usando Web Speech API.
 * Proporciona una función para reproducir texto como audio.
 */
export const useAudio = () => {
  /**
   * Reproduce el texto dado como audio usando Web Speech API.
   * @param text - El texto a reproducir.
   */
  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  return { playAudio };
};
