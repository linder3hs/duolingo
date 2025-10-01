import { useState } from "react";
import { ArrowLeft, Play } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Basico1Exercises } from "./Basico1Exercises";
import { useAppContext } from "../App";

/**
 * Componente para la pantalla de contenido de nivel.
 * Implementa el contenido estructurado del Básico 1.
 */

interface SubLevel {
  id: string;
  title: string;
  content: string;
  examples: string[];
  exercises: string[];
}

const basico1Content: SubLevel[] = [
  {
    id: "1.1",
    title: "NIVEL 1.1 - PRONOMBRES Y VERBO TO BE",
    content:
      "Aprende los pronombres personales y el verbo TO BE en presente: AM, IS, ARE. Diferencia entre HE (masculino), SHE (femenino), IT (objetos/animales).",
    examples: [
      '"He is a student" (Él es un estudiante)',
      '"She works" (Ella trabaja)',
      '"It moves" (Eso se mueve)',
    ],
    exercises: [
      "Completar oraciones con el pronombre correcto",
      "Conjugar el verbo TO BE según el sujeto",
      "Identificar género del pronombre según contexto",
    ],
  },
  {
    id: "1.2",
    title: "NIVEL 1.2 - AUXILIARES BÁSICOS (DO/DOES)",
    content:
      "Uso de DO con: I, YOU, WE, THEY. Uso de DOES con: HE, SHE, IT. Formación de preguntas y negaciones.",
    examples: [
      'DO + sujeto + verbo: "Do you like...?"',
      'DOES + sujeto + verbo: "Does he have...?"',
      'Respuestas: "Yes, I do" / "No, I don\'t"',
    ],
    exercises: [
      "Formar preguntas con DO/DOES",
      "Crear respuestas cortas afirmativas y negativas",
      "Practicar palabras interrogativas: WHO, WHAT, WHERE, WHEN, WHY",
    ],
  },
  {
    id: "1.3",
    title: "NIVEL 1.3 - PLURALES Y CONJUGACIONES",
    content:
      "Aprende a formar plurales de sustantivos y conjugaciones de verbos en tercera persona.",
    examples: [
      "Sustantivos: brush → brushes, family → families, knife → knives",
      "Verbos: work → works, study → studies, watch → watches",
      "Irregulares: man → men, woman → women, child → children",
    ],
    exercises: [
      "Formar plurales de sustantivos",
      "Conjugar verbos en tercera persona",
      "Identificar irregulares comunes",
    ],
  },
  {
    id: "1.4",
    title: "NIVEL 1.4 - VOCABULARIO TEMÁTICO",
    content: "Vocabulario de familia, países, nacionalidades e idiomas.",
    examples: [
      "Familia: son/hija, husband/wife, brother/sister, grandson/granddaughter",
      "Países: Mexico → Mexican → Spanish, USA → American → English",
      "Más países: Italy, China, Vietnam, Turkey, UK, Poland, Pakistan, UAE, France, Greece",
    ],
    exercises: [
      "Completar tablas de familia",
      "Asociar países con nacionalidades e idiomas",
      "Crear frases usando el vocabulario aprendido",
    ],
  },
  {
    id: "1.5",
    title: "NIVEL 1.5 - ADVERBIOS DE FRECUENCIA Y TIEMPO",
    content: "Adverbios de frecuencia y expresiones de tiempo.",
    examples: [
      "Frecuencia: always (100%), usually (80%), often (60%), sometimes (45%), hardly ever (10%), never (0%)",
      "Tiempo: 2:05 → Five past two, 11:30 → Half past eleven, 7:45 → Quarter to eight",
      "Posición: antes del verbo principal o después de TO BE",
    ],
    exercises: [
      "Ordenar adverbios de frecuencia",
      "Leer y decir la hora en inglés",
      "Crear oraciones usando adverbios de frecuencia",
    ],
  },
  {
    id: "1.6",
    title: "NIVEL 1.6 - SALUDOS Y DESPEDIDAS",
    content: "Expresiones básicas para saludar y despedirte en inglés.",
    examples: [
      '"Hello" / "Hi" (Hola)',
      '"Good morning" / "Good afternoon" / "Good evening" (Buenos días/tardes/noches)',
      '"Goodbye" / "Bye" / "See you later" (Adiós / Hasta luego)',
    ],
    exercises: [
      "Practicar saludos en diferentes momentos del día",
      "Crear diálogos de saludo y despedida",
      "Identificar contextos apropiados para cada expresión",
    ],
  },
  {
    id: "1.7",
    title: "NIVEL 1.7 - FAMILIA Y RELACIONES",
    content:
      "Vocabulario y expresiones para hablar de la familia y relaciones personales.",
    examples: [
      "Miembros de la familia: mother/mom, father/dad, brother, sister, grandparents",
      '"This is my family" (Esta es mi familia)',
      '"I have two brothers" (Tengo dos hermanos)',
    ],
    exercises: [
      "Describir tu familia usando vocabulario aprendido",
      "Crear un árbol genealógico en inglés",
      "Practicar preguntas sobre familia: How many...? Who is...?",
    ],
  },
  {
    id: "1.8",
    title: "NIVEL 1.8 - COMIDA Y BEBIDAS",
    content:
      "Vocabulario relacionado con alimentos, bebidas y expresiones culinarias básicas.",
    examples: [
      "Comidas: breakfast, lunch, dinner, sandwich, pizza, salad",
      "Bebidas: water, coffee, tea, juice, milk",
      '"What do you want to eat?" (¿Qué quieres comer?)',
    ],
    exercises: [
      "Nombrar alimentos y bebidas en inglés",
      "Describir tus comidas favoritas",
      "Crear un menú simple en inglés",
    ],
  },
  {
    id: "1.9",
    title: "NIVEL 1.9 - TRABAJO Y PROFESIONES",
    content:
      "Vocabulario de profesiones y expresiones relacionadas con el trabajo.",
    examples: [
      "Profesiones: teacher, doctor, engineer, chef, student",
      '"What do you do?" / "I am a teacher" (¿Qué haces? / Soy profesor)',
      '"Where do you work?" (¿Dónde trabajas?)',
    ],
    exercises: [
      "Describir profesiones y responsabilidades",
      "Crear conversaciones sobre trabajo",
      "Asociar profesiones con lugares de trabajo",
    ],
  },
  {
    id: "1.10",
    title: "NIVEL 1.10 - VIAJES Y TRANSPORTE",
    content: "Vocabulario para hablar de viajes, transporte y direcciones.",
    examples: [
      "Transporte: car, bus, train, plane, bicycle",
      '"How do you go to work?" (¿Cómo vas al trabajo?)',
      '"Where is the airport?" (¿Dónde está el aeropuerto?)',
    ],
    exercises: [
      "Describir medios de transporte",
      "Dar direcciones simples",
      "Crear itinerarios de viaje básicos",
    ],
  },
  {
    id: "1.11",
    title: "NIVEL 1.11 - COMPRAS Y DINERO",
    content: "Expresiones para comprar, precios y vocabulario comercial.",
    examples: [
      '"How much is this?" / "It\'s $10" (¿Cuánto cuesta? / Cuesta $10)',
      '"Can I help you?" / "I want to buy..." (¿Puedo ayudarte? / Quiero comprar...)',
      "Tiendas: supermarket, bookstore, pharmacy",
    ],
    exercises: [
      "Practicar conversaciones de compra",
      "Contar dinero y precios",
      "Describir productos y hacer pedidos",
    ],
  },
  {
    id: "1.12",
    title: "NIVEL 1.12 - TIEMPO Y CLIMA",
    content: "Vocabulario para describir el clima y expresiones temporales.",
    examples: [
      '"It\'s sunny" / "It\'s raining" (Hace sol / Está lloviendo)',
      '"What\'s the weather like?" (¿Qué tiempo hace?)',
      "Estaciones: spring, summer, autumn/fall, winter",
    ],
    exercises: [
      "Describir el clima actual",
      "Hablar de preferencias climáticas",
      "Crear pronósticos del tiempo simples",
    ],
  },
];

export const LevelContentScreen = () => {
  const navigate = useNavigate();
  const { categoryId, levelId } = useParams<{
    categoryId: string;
    levelId: string;
  }>();
  const { categoriesData, playAudio } = useAppContext();
  const [showExercises, setShowExercises] = useState(false);

  if (!categoryId || !levelId || !categoriesData[categoryId]) {
    return <div>Nivel no encontrado</div>;
  }

  const level = categoriesData[categoryId].levels.find((l) => l.id === levelId);
  if (!level) {
    return <div>Nivel no encontrado</div>;
  }

  // Determine sub-level index based on level.id
  const subLevelIndex = level.id.startsWith("b")
    ? parseInt(level.id.slice(1)) - 1
    : 0;
  const subLevel = basico1Content[subLevelIndex];

  // Mostrar ejercicios si están activados
  if (showExercises) {
    return (
      <Basico1Exercises
        subLevel={subLevel.id}
        onBackToContent={() => setShowExercises(false)}
        onPlayAudio={playAudio}
      />
    );
  }

  // Contenido del nivel

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 screen-enter">
      <div className="max-w-4xl mx-auto">
        {/* Header con botón de volver */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/category/" + categoryId)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Volver a niveles"
            >
              <ArrowLeft size={24} />
              <span>Volver</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {level.title}
              </h1>
              <p className="text-gray-600">{level.description}</p>
            </div>
          </div>
        </div>

        {/* Contenido del sub-nivel */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {subLevel.title}
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              {subLevel.content}
            </p>
          </div>

          {/* Ejemplos */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">
              Ejemplos:
            </h4>
            <ul className="space-y-2">
              {subLevel.examples.map((example, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Play
                    className="text-blue-500 mt-1 flex-shrink-0"
                    size={16}
                  />
                  <span className="text-gray-700">{example}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ejercicios */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-green-800 mb-3">
              Ejercicios sugeridos:
            </h4>
            <ul className="space-y-2">
              {subLevel.exercises.map((exercise, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-gray-700">{exercise}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Botón de práctica */}
          <div className="text-center">
            <button
              onClick={() => setShowExercises(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <Play size={20} />
              Comenzar Práctica
            </button>
            <p className="text-sm text-gray-500 mt-2">
              {basico1Content.length} ejercicios interactivos disponibles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
