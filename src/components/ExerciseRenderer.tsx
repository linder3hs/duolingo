import type { Exercise } from "../types";

/**
 * Componente para renderizar diferentes tipos de ejercicios.
 * Maneja la lógica de renderizado para multiple choice, translate y build exercises.
 */
interface ExerciseRendererProps {
  exercise: Exercise;
  answer: string;
  setAnswer: (answer: string) => void;
  builtSentence: string[];
  setBuiltSentence: (sentence: string[]) => void;
}

export const ExerciseRenderer = ({
  exercise,
  answer,
  setAnswer,
  builtSentence,
  setBuiltSentence,
}: ExerciseRendererProps) => {
  if (exercise.type === "multiple") {
    return (
      <div className="space-y-4">
        {exercise.options?.map((option: string, idx: number) => (
          <button
            key={idx}
            onClick={() => setAnswer(idx.toString())}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              answer === idx.toString()
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }

  if (exercise.type === "translate") {
    return (
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Escribe tu respuesta..."
        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
        onKeyPress={(e) => e.key === "Enter" && !answer && setAnswer("")}
      />
    );
  }

  if (exercise.type === "build") {
    return (
      <div className="space-y-6">
        <div className="min-h-[80px] p-4 border-2 border-dashed border-gray-300 rounded-xl flex flex-wrap gap-2">
          {builtSentence.map((word: string, idx: number) => (
            <button
              key={idx}
              onClick={() =>
                setBuiltSentence(builtSentence.filter((_, i) => i !== idx))
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {word}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {exercise.words?.map(
            (word: string, idx: number) =>
              !builtSentence.includes(word) && (
                <button
                  key={idx}
                  onClick={() => setBuiltSentence([...builtSentence, word])}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  {word}
                </button>
              )
          )}
        </div>
      </div>
    );
  }

  return null;
};
