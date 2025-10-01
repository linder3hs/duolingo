import type { Exercise } from "../types";

export interface Basico1ExerciseData {
  subLevel: string;
  title: string;
  exercises: Exercise[];
}

export const basico1ExercisesData: Basico1ExerciseData[] = [
  {
    subLevel: "1.1",
    title: "NIVEL 1.1 - PRONOMBRES Y VERBO TO BE",
    exercises: [
      {
        type: "multiple",
        question: "Completa: ___ am a student",
        options: ["I", "You", "He", "She"],
        correct: 0,
        audio: "I am a student",
      },
      {
        type: "multiple",
        question: "Completa: ___ is my friend",
        options: ["I", "You", "He", "She"],
        correct: 2,
        audio: "He is my friend",
      },
      {
        type: "multiple",
        question: "Completa: ___ are teachers",
        options: ["I", "You", "We", "They"],
        correct: 3,
        audio: "They are teachers",
      },
      {
        type: "translate",
        question: "Traduce: Él es doctor",
        correct: "he is a doctor",
        alternatives: ["he is doctor", "he's a doctor"],
        audio: "He is a doctor",
      },
      {
        type: "translate",
        question: "Traduce: Somos estudiantes",
        correct: "we are students",
        alternatives: ["we are student", "we're students"],
        audio: "We are students",
      },
      {
        type: "build",
        question: "Ordena: is / She / a / nurse",
        words: ["She", "is", "a", "nurse"],
        correct: "She is a nurse",
        audio: "She is a nurse",
      },
    ],
  },
  {
    subLevel: "1.2",
    title: "NIVEL 1.2 - AUXILIARES BÁSICOS (DO/DOES)",
    exercises: [
      {
        type: "multiple",
        question: "¿Cuál es la pregunta correcta?",
        options: [
          "Do you like pizza?",
          "Does you like pizza?",
          "Do he like pizza?",
          "Does he like pizza?",
        ],
        correct: 0,
        audio: "Do you like pizza?",
      },
      {
        type: "multiple",
        question: "¿Cuál es la pregunta correcta?",
        options: [
          "Does she work here?",
          "Do she work here?",
          "Does she works here?",
          "Do she works here?",
        ],
        correct: 0,
        audio: "Does she work here?",
      },
      {
        type: "translate",
        question: "Traduce: ¿Dónde vives?",
        correct: "where do you live",
        alternatives: ["where you live", "do you live where"],
        audio: "Where do you live?",
      },
      {
        type: "translate",
        question: "Traduce: ¿Qué hace él?",
        correct: "what does he do",
        alternatives: ["what he does", "what he do"],
        audio: "What does he do?",
      },
      {
        type: "build",
        question: "Ordena: Do / you / speak / English?",
        words: ["Do", "you", "speak", "English", "?"],
        correct: "Do you speak English?",
        audio: "Do you speak English?",
      },
      {
        type: "build",
        question: "Ordena: Does / she / like / music?",
        words: ["Does", "she", "like", "music", "?"],
        correct: "Does she like music?",
        audio: "Does she like music?",
      },
    ],
  },
  {
    subLevel: "1.3",
    title: "NIVEL 1.3 - PLURALES Y CONJUGACIONES",
    exercises: [
      {
        type: "multiple",
        question: "¿Cuál es el plural correcto?",
        options: ["books", "bookes", "bookies", "book"],
        correct: 0,
        audio: "books",
      },
      {
        type: "multiple",
        question: "¿Cuál es el plural correcto?",
        options: ["families", "familys", "familyes", "family"],
        correct: 0,
        audio: "families",
      },
      {
        type: "translate",
        question: "Forma el plural: child",
        correct: "children",
        alternatives: [],
        audio: "children",
      },
      {
        type: "translate",
        question: "Conjuga: He ___ (work)",
        correct: "works",
        alternatives: ["working", "worked"],
        audio: "works",
      },
      {
        type: "build",
        question: "Ordena: They / live / in / cities",
        words: ["They", "live", "in", "cities"],
        correct: "They live in cities",
        audio: "They live in cities",
      },
      {
        type: "build",
        question: "Ordena: She / watches / TV",
        words: ["She", "watches", "TV"],
        correct: "She watches TV",
        audio: "She watches TV",
      },
    ],
  },
  {
    subLevel: "1.4",
    title: "NIVEL 1.4 - VOCABULARIO TEMÁTICO",
    exercises: [
      {
        type: "multiple",
        question: "¿Cómo se dice 'hermana' en inglés?",
        options: ["Brother", "Sister", "Mother", "Father"],
        correct: 1,
        audio: "Sister",
      },
      {
        type: "multiple",
        question: "¿Cuál es la nacionalidad de alguien de México?",
        options: ["Mexican", "American", "Spanish", "Italian"],
        correct: 0,
        audio: "Mexican",
      },
      {
        type: "translate",
        question: "Traduce: Mi abuelo",
        correct: "my grandfather",
        alternatives: ["my grandpa", "my granddad"],
        audio: "My grandfather",
      },
      {
        type: "translate",
        question: "Traduce: Soy de Italia",
        correct: "i am from italy",
        alternatives: ["i'm from italy", "i am italian"],
        audio: "I am from Italy",
      },
      {
        type: "build",
        question: "Ordena: My / brother / is / a / doctor",
        words: ["My", "brother", "is", "a", "doctor"],
        correct: "My brother is a doctor",
        audio: "My brother is a doctor",
      },
      {
        type: "build",
        question: "Ordena: She / speaks / Chinese",
        words: ["She", "speaks", "Chinese"],
        correct: "She speaks Chinese",
        audio: "She speaks Chinese",
      },
    ],
  },
  {
    subLevel: "1.5",
    title: "NIVEL 1.5 - ADVERBIOS DE FRECUENCIA Y TIEMPO",
    exercises: [
      {
        type: "multiple",
        question: "¿Cuál es el adverbio correcto?",
        options: ["Always", "Usually", "Often", "Sometimes"],
        correct: 0,
        audio: "Always",
      },
      {
        type: "multiple",
        question: "¿Qué hora es? 3:15",
        options: [
          "Quarter past three",
          "Quarter to three",
          "Half past three",
          "Three fifteen",
        ],
        correct: 0,
        audio: "Quarter past three",
      },
      {
        type: "translate",
        question: "Traduce: Siempre estudio inglés",
        correct: "i always study english",
        alternatives: ["i study always english", "always i study english"],
        audio: "I always study English",
      },
      {
        type: "translate",
        question: "Traduce: ¿Qué hora es? Son las 9:30",
        correct: "what time is it? it is half past nine",
        alternatives: ["what time is it? it's nine thirty"],
        audio: "What time is it? It is half past nine",
      },
      {
        type: "build",
        question: "Ordena: I / usually / eat / breakfast / at / 8",
        words: ["I", "usually", "eat", "breakfast", "at", "8"],
        correct: "I usually eat breakfast at 8",
        audio: "I usually eat breakfast at 8",
      },
      {
        type: "build",
        question: "Ordena: She / often / goes / to / school",
        words: ["She", "often", "goes", "to", "school"],
        correct: "She often goes to school",
        audio: "She often goes to school",
      },
    ],
  },
];
