import { useState, useEffect } from "react";
import { Volume2, Heart, Star, Award, Flame } from "lucide-react";

// TypeScript interfaces
interface Exercise {
  type: string;
  question: string;
  options?: string[];
  correct: string | number;
  alternatives?: string[];
  words?: string[];
  audio: string;
}

interface Lesson {
  id: string;
  title: string;
  exercises: Exercise[];
}

interface ProgressData {
  completed: boolean;
  score: number;
  hearts: number;
}

interface CurrentLesson extends Lesson {
  unitKey: string;
  lessonIndex: number;
}

interface Feedback {
  type: "correct" | "incorrect";
  message: string;
}

interface AppData {
  progress: Record<string, Record<string, ProgressData>>;
  xp: number;
  streak: number;
  lastVisit: string;
}

// Datos de las lecciones
const lessonsData = {
  unit1: {
    title: "Saludos y Presentaciones",
    color: "bg-green-500",
    lessons: [
      {
        id: "u1l1",
        title: "Saludos Formales e Informales",
        exercises: [
          {
            type: "multiple",
            question: "¿Cuál es un saludo formal?",
            options: ["Good morning", "Hey", "What's up", "Yo"],
            correct: 0,
            audio: "Good morning",
          },
          {
            type: "translate",
            question: "Traduce: Encantado de conocerle (formal)",
            correct: "pleased to meet you",
            alternatives: ["nice to meet you"],
            audio: "Pleased to meet you",
          },
          {
            type: "build",
            question: "Ordena: ¿Cómo ha estado?",
            words: ["How", "have", "you", "been", "?"],
            correct: "How have you been?",
            audio: "How have you been?",
          },
          {
            type: "multiple",
            question: "Respuesta informal a 'What's up?'",
            options: [
              "Not much",
              "Good morning",
              "Pleased to meet you",
              "Goodbye",
            ],
            correct: 0,
            audio: "Not much",
          },
          {
            type: "translate",
            question: "Traduce: Que tenga un buen día",
            correct: "have a nice day",
            alternatives: ["have a good day"],
            audio: "Have a nice day",
          },
          {
            type: "build",
            question: "Ordena: Me alegro de verte",
            words: ["Nice", "to", "see", "you"],
            correct: "Nice to see you",
            audio: "Nice to see you",
          },
          {
            type: "multiple",
            question: "¿Cómo despedirte formalmente?",
            options: ["Take care", "See ya", "Bye", "Later"],
            correct: 0,
            audio: "Take care",
          },
          {
            type: "translate",
            question: "Traduce: Hasta pronto",
            correct: "see you soon",
            alternatives: [],
            audio: "See you soon",
          },
        ],
      },
      {
        id: "u1l2",
        title: "Información Personal",
        exercises: [
          {
            type: "build",
            question: "Ordena: ¿De dónde eres?",
            words: ["Where", "are", "you", "from", "?"],
            correct: "Where are you from?",
            audio: "Where are you from?",
          },
          {
            type: "translate",
            question: "Traduce: Soy de España",
            correct: "i am from spain",
            alternatives: ["i'm from spain"],
            audio: "I am from Spain",
          },
          {
            type: "multiple",
            question: "¿Cómo preguntar la edad?",
            options: [
              "How old are you?",
              "What age you have?",
              "How many years?",
              "What is your age?",
            ],
            correct: 0,
            audio: "How old are you?",
          },
          {
            type: "translate",
            question: "Traduce: Tengo 25 años",
            correct: "i am 25 years old",
            alternatives: ["i'm 25 years old", "i am 25"],
            audio: "I am 25 years old",
          },
          {
            type: "build",
            question: "Ordena: ¿A qué te dedicas?",
            words: ["What", "do", "you", "do", "?"],
            correct: "What do you do?",
            audio: "What do you do?",
          },
          {
            type: "multiple",
            question: "Respuesta: I work as a...",
            options: ["teacher", "teaching", "to teach", "taught"],
            correct: 0,
            audio: "teacher",
          },
          {
            type: "translate",
            question: "Traduce: Soy estudiante",
            correct: "i am a student",
            alternatives: ["i'm a student"],
            audio: "I am a student",
          },
          {
            type: "build",
            question: "Ordena: ¿Cuál es tu número de teléfono?",
            words: ["What", "is", "your", "phone", "number", "?"],
            correct: "What is your phone number?",
            audio: "What is your phone number?",
          },
        ],
      },
    ],
  },
  unit2: {
    title: "Familia y Relaciones",
    color: "bg-blue-500",
    lessons: [
      {
        id: "u2l1",
        title: "Miembros de la Familia",
        exercises: [
          {
            type: "multiple",
            question: "¿Cómo se dice 'padres' (ambos)?",
            options: ["Parents", "Fathers", "Mothers", "Family"],
            correct: 0,
            audio: "Parents",
          },
          {
            type: "translate",
            question: "Traduce: Mi hermana mayor",
            correct: "my older sister",
            alternatives: ["my elder sister", "my big sister"],
            audio: "My older sister",
          },
          {
            type: "build",
            question: "Ordena: Tengo dos hermanos",
            words: ["I", "have", "two", "brothers"],
            correct: "I have two brothers",
            audio: "I have two brothers",
          },
          {
            type: "multiple",
            question: "¿Qué es un 'nephew'?",
            options: ["Sobrino", "Tío", "Primo", "Abuelo"],
            correct: 0,
            audio: "Nephew",
          },
          {
            type: "translate",
            question: "Traduce: Mis abuelos",
            correct: "my grandparents",
            alternatives: [],
            audio: "My grandparents",
          },
          {
            type: "build",
            question: "Ordena: Ella es mi tía",
            words: ["She", "is", "my", "aunt"],
            correct: "She is my aunt",
            audio: "She is my aunt",
          },
          {
            type: "multiple",
            question: "¿Cómo se dice 'hijo único'?",
            options: ["Only child", "Single son", "One child", "Alone son"],
            correct: 0,
            audio: "Only child",
          },
          {
            type: "translate",
            question: "Traduce: Mi esposa",
            correct: "my wife",
            alternatives: [],
            audio: "My wife",
          },
        ],
      },
      {
        id: "u2l2",
        title: "Relaciones y Estados",
        exercises: [
          {
            type: "multiple",
            question: "¿Cómo se dice 'comprometido/a'?",
            options: ["Engaged", "Married", "Dating", "Single"],
            correct: 0,
            audio: "Engaged",
          },
          {
            type: "translate",
            question: "Traduce: Estoy casado",
            correct: "i am married",
            alternatives: ["i'm married"],
            audio: "I am married",
          },
          {
            type: "build",
            question: "Ordena: Él es mi mejor amigo",
            words: ["He", "is", "my", "best", "friend"],
            correct: "He is my best friend",
            audio: "He is my best friend",
          },
          {
            type: "multiple",
            question: "¿Qué significa 'single'?",
            options: ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a"],
            correct: 0,
            audio: "Single",
          },
          {
            type: "translate",
            question: "Traduce: Mi novio",
            correct: "my boyfriend",
            alternatives: [],
            audio: "My boyfriend",
          },
          {
            type: "build",
            question: "Ordena: Tenemos una relación cercana",
            words: ["We", "have", "a", "close", "relationship"],
            correct: "We have a close relationship",
            audio: "We have a close relationship",
          },
          {
            type: "multiple",
            question: "¿Cómo se dice 'ex pareja'?",
            options: [
              "Ex-partner",
              "Old partner",
              "Before partner",
              "Last partner",
            ],
            correct: 0,
            audio: "Ex-partner",
          },
          {
            type: "translate",
            question: "Traduce: Somos pareja",
            correct: "we are a couple",
            alternatives: ["we are partners"],
            audio: "We are a couple",
          },
        ],
      },
    ],
  },
  unit3: {
    title: "Comida y Restaurantes",
    color: "bg-yellow-500",
    lessons: [
      {
        id: "u3l1",
        title: "Alimentos Comunes",
        exercises: [
          {
            type: "multiple",
            question: "¿Qué es 'beef'?",
            options: ["Carne de res", "Pollo", "Cerdo", "Pescado"],
            correct: 0,
            audio: "Beef",
          },
          {
            type: "translate",
            question: "Traduce: Me gusta el pollo",
            correct: "i like chicken",
            alternatives: [],
            audio: "I like chicken",
          },
          {
            type: "build",
            question: "Ordena: ¿Quieres pan?",
            words: ["Do", "you", "want", "bread", "?"],
            correct: "Do you want bread?",
            audio: "Do you want bread?",
          },
          {
            type: "multiple",
            question: "¿Cómo se dice 'verduras'?",
            options: ["Vegetables", "Fruits", "Greens", "Plants"],
            correct: 0,
            audio: "Vegetables",
          },
          {
            type: "translate",
            question: "Traduce: Necesito leche y huevos",
            correct: "i need milk and eggs",
            alternatives: [],
            audio: "I need milk and eggs",
          },
          {
            type: "build",
            question: "Ordena: El queso es delicioso",
            words: ["The", "cheese", "is", "delicious"],
            correct: "The cheese is delicious",
            audio: "The cheese is delicious",
          },
          {
            type: "multiple",
            question: "¿Qué son 'beverages'?",
            options: ["Bebidas", "Comidas", "Postres", "Aperitivos"],
            correct: 0,
            audio: "Beverages",
          },
          {
            type: "translate",
            question: "Traduce: Agua fría",
            correct: "cold water",
            alternatives: [],
            audio: "Cold water",
          },
        ],
      },
      {
        id: "u3l2",
        title: "En el Restaurante",
        exercises: [
          {
            type: "build",
            question: "Ordena: ¿Puedo ver el menú?",
            words: ["Can", "I", "see", "the", "menu", "?"],
            correct: "Can I see the menu?",
            audio: "Can I see the menu?",
          },
          {
            type: "multiple",
            question: "Para pedir comida dices:",
            options: [
              "I'd like to order",
              "I want buy",
              "Give me food",
              "I need eat",
            ],
            correct: 0,
            audio: "I'd like to order",
          },
          {
            type: "translate",
            question: "Traduce: La cuenta, por favor",
            correct: "the check please",
            alternatives: ["the bill please"],
            audio: "The check please",
          },
          {
            type: "build",
            question: "Ordena: ¿Qué recomiendas?",
            words: ["What", "do", "you", "recommend", "?"],
            correct: "What do you recommend?",
            audio: "What do you recommend?",
          },
          {
            type: "multiple",
            question: "¿Cómo pides la comida 'para llevar'?",
            options: ["To go", "For carry", "Take away only", "Out food"],
            correct: 0,
            audio: "To go",
          },
          {
            type: "translate",
            question: "Traduce: Está delicioso",
            correct: "it is delicious",
            alternatives: ["it's delicious", "this is delicious"],
            audio: "It is delicious",
          },
          {
            type: "build",
            question: "Ordena: ¿Tienen opciones vegetarianas?",
            words: ["Do", "you", "have", "vegetarian", "options", "?"],
            correct: "Do you have vegetarian options?",
            audio: "Do you have vegetarian options?",
          },
          {
            type: "multiple",
            question: "Para decir que estás lleno:",
            options: [
              "I'm full",
              "I'm complete",
              "I'm finish",
              "I'm done eating",
            ],
            correct: 0,
            audio: "I'm full",
          },
        ],
      },
    ],
  },
  unit4: {
    title: "Trabajo y Profesiones",
    color: "bg-purple-500",
    lessons: [
      {
        id: "u4l1",
        title: "Profesiones Comunes",
        exercises: [
          {
            type: "multiple",
            question: "¿Qué hace un 'lawyer'?",
            options: ["Abogado", "Doctor", "Ingeniero", "Profesor"],
            correct: 0,
            audio: "Lawyer",
          },
          {
            type: "translate",
            question: "Traduce: Soy ingeniero de software",
            correct: "i am a software engineer",
            alternatives: ["i'm a software engineer"],
            audio: "I am a software engineer",
          },
          {
            type: "build",
            question: "Ordena: Ella trabaja como doctora",
            words: ["She", "works", "as", "a", "doctor"],
            correct: "She works as a doctor",
            audio: "She works as a doctor",
          },
          {
            type: "multiple",
            question: "¿Cómo se dice 'enfermero/a'?",
            options: ["Nurse", "Medic", "Helper", "Assistant"],
            correct: 0,
            audio: "Nurse",
          },
          {
            type: "translate",
            question: "Traduce: Mi hermano es chef",
            correct: "my brother is a chef",
            alternatives: [],
            audio: "My brother is a chef",
          },
          {
            type: "build",
            question: "Ordena: ¿Dónde trabajas?",
            words: ["Where", "do", "you", "work", "?"],
            correct: "Where do you work?",
            audio: "Where do you work?",
          },
          {
            type: "multiple",
            question: "Un 'accountant' es:",
            options: ["Contador", "Vendedor", "Gerente", "Secretario"],
            correct: 0,
            audio: "Accountant",
          },
          {
            type: "translate",
            question: "Traduce: Trabajo desde casa",
            correct: "i work from home",
            alternatives: [],
            audio: "I work from home",
          },
        ],
      },
      {
        id: "u4l2",
        title: "En la Oficina",
        exercises: [
          {
            type: "build",
            question: "Ordena: Tengo una reunión a las 3",
            words: ["I", "have", "a", "meeting", "at", "3"],
            correct: "I have a meeting at 3",
            audio: "I have a meeting at 3",
          },
          {
            type: "multiple",
            question: "¿Cómo se dice 'fecha límite'?",
            options: ["Deadline", "Time limit", "Final date", "End time"],
            correct: 0,
            audio: "Deadline",
          },
          {
            type: "translate",
            question: "Traduce: Necesito terminar este proyecto",
            correct: "i need to finish this project",
            alternatives: ["i need to complete this project"],
            audio: "I need to finish this project",
          },
          {
            type: "build",
            question: "Ordena: ¿Puedes enviarme el informe?",
            words: ["Can", "you", "send", "me", "the", "report", "?"],
            correct: "Can you send me the report?",
            audio: "Can you send me the report?",
          },
          {
            type: "multiple",
            question: "Tu 'boss' es tu:",
            options: ["Jefe", "Colega", "Cliente", "Empleado"],
            correct: 0,
            audio: "Boss",
          },
          {
            type: "translate",
            question: "Traduce: Trabajo a tiempo completo",
            correct: "i work full time",
            alternatives: ["i work full-time"],
            audio: "I work full time",
          },
          {
            type: "build",
            question: "Ordena: Ella consiguió un ascenso",
            words: ["She", "got", "a", "promotion"],
            correct: "She got a promotion",
            audio: "She got a promotion",
          },
          {
            type: "multiple",
            question: "¿Qué es un 'salary'?",
            options: ["Salario", "Trabajo", "Oficina", "Horario"],
            correct: 0,
            audio: "Salary",
          },
        ],
      },
    ],
  },
  unit5: {
    title: "Viajes y Transporte",
    color: "bg-red-500",
    lessons: [
      {
        id: "u5l1",
        title: "Medios de Transporte",
        exercises: [
          {
            type: "multiple",
            question: "¿Cómo se dice 'avión'?",
            options: ["Airplane", "Train", "Bus", "Car"],
            correct: 0,
            audio: "Airplane",
          },
          {
            type: "translate",
            question: "Traduce: Voy en metro",
            correct: "i go by subway",
            alternatives: ["i take the subway", "i go by metro"],
            audio: "I go by subway",
          },
          {
            type: "build",
            question: "Ordena: ¿Cómo llegas al trabajo?",
            words: ["How", "do", "you", "get", "to", "work", "?"],
            correct: "How do you get to work?",
            audio: "How do you get to work?",
          },
          {
            type: "multiple",
            question: "Para viajar entre países usas:",
            options: ["Passport", "License", "Card", "Ticket"],
            correct: 0,
            audio: "Passport",
          },
          {
            type: "translate",
            question: "Traduce: Perdí mi vuelo",
            correct: "i missed my flight",
            alternatives: [],
            audio: "I missed my flight",
          },
          {
            type: "build",
            question: "Ordena: ¿Dónde está la estación de tren?",
            words: ["Where", "is", "the", "train", "station", "?"],
            correct: "Where is the train station?",
            audio: "Where is the train station?",
          },
          {
            type: "multiple",
            question: "¿Qué es 'luggage'?",
            options: ["Equipaje", "Boleto", "Asiento", "Maleta"],
            correct: 0,
            audio: "Luggage",
          },
          {
            type: "translate",
            question: "Traduce: Alquilo un carro",
            correct: "i rent a car",
            alternatives: ["i'm renting a car"],
            audio: "I rent a car",
          },
        ],
      },
      {
        id: "u5l2",
        title: "En el Hotel",
        exercises: [
          {
            type: "build",
            question: "Ordena: Tengo una reserva",
            words: ["I", "have", "a", "reservation"],
            correct: "I have a reservation",
            audio: "I have a reservation",
          },
          {
            type: "multiple",
            question: "Para pedir la llave dices:",
            options: ["Room key", "Door key", "Hotel key", "Bedroom key"],
            correct: 0,
            audio: "Room key",
          },
          {
            type: "translate",
            question: "Traduce: ¿A qué hora es el check-out?",
            correct: "what time is check out",
            alternatives: ["what time is checkout", "when is check out"],
            audio: "What time is check out?",
          },
          {
            type: "build",
            question: "Ordena: ¿Incluye desayuno?",
            words: ["Does", "it", "include", "breakfast", "?"],
            correct: "Does it include breakfast?",
            audio: "Does it include breakfast?",
          },
          {
            type: "multiple",
            question: "¿Cómo pides toallas extras?",
            options: [
              "Extra towels",
              "More towels",
              "Additional towels",
              "Other towels",
            ],
            correct: 0,
            audio: "Extra towels",
          },
          {
            type: "translate",
            question: "Traduce: El aire acondicionado no funciona",
            correct: "the air conditioning doesn't work",
            alternatives: ["the ac doesn't work"],
            audio: "The air conditioning doesn't work",
          },
          {
            type: "build",
            question: "Ordena: ¿Hay wifi gratis?",
            words: ["Is", "there", "free", "wifi", "?"],
            correct: "Is there free wifi?",
            audio: "Is there free wifi?",
          },
          {
            type: "multiple",
            question: "La persona que limpia es:",
            options: ["Housekeeper", "Cleaner", "Maid", "All of the above"],
            correct: 3,
            audio: "Housekeeper",
          },
        ],
      },
    ],
  },
  unit6: {
    title: "Compras y Dinero",
    color: "bg-pink-500",
    lessons: [
      {
        id: "u6l1",
        title: "De Compras",
        exercises: [
          {
            type: "multiple",
            question: "¿Cómo preguntas el precio?",
            options: [
              "How much is it?",
              "What costs?",
              "How price?",
              "What money?",
            ],
            correct: 0,
            audio: "How much is it?",
          },
          {
            type: "translate",
            question: "Traduce: Es demasiado caro",
            correct: "it is too expensive",
            alternatives: ["it's too expensive"],
            audio: "It is too expensive",
          },
          {
            type: "build",
            question: "Ordena: ¿Tienen descuento?",
            words: ["Do", "you", "have", "a", "discount", "?"],
            correct: "Do you have a discount?",
            audio: "Do you have a discount?",
          },
          {
            type: "multiple",
            question: "Para pagar con tarjeta:",
            options: ["Credit card", "Money card", "Pay card", "Bank card"],
            correct: 0,
            audio: "Credit card",
          },
          {
            type: "translate",
            question: "Traduce: ¿Puedo probármelo?",
            correct: "can i try it on",
            alternatives: ["may i try it on"],
            audio: "Can I try it on?",
          },
          {
            type: "build",
            question: "Ordena: ¿Aceptan efectivo?",
            words: ["Do", "you", "accept", "cash", "?"],
            correct: "Do you accept cash?",
            audio: "Do you accept cash?",
          },
          {
            type: "multiple",
            question: "¿Qué es un 'receipt'?",
            options: ["Recibo", "Cambio", "Descuento", "Precio"],
            correct: 0,
            audio: "Receipt",
          },
          {
            type: "translate",
            question: "Traduce: Está en oferta",
            correct: "it is on sale",
            alternatives: ["it's on sale"],
            audio: "It is on sale",
          },
        ],
      },
      {
        id: "u6l2",
        title: "Ropa y Tallas",
        exercises: [
          {
            type: "build",
            question: "Ordena: ¿Qué talla usas?",
            words: ["What", "size", "do", "you", "wear", "?"],
            correct: "What size do you wear?",
            audio: "What size do you wear?",
          },
          {
            type: "multiple",
            question: "¿Cómo se dice 'camisa'?",
            options: ["Shirt", "Shoes", "Pants", "Dress"],
            correct: 0,
            audio: "Shirt",
          },
          {
            type: "translate",
            question: "Traduce: Me queda grande",
            correct: "it is too big",
            alternatives: ["it's too big", "it fits big"],
            audio: "It is too big",
          },
          {
            type: "build",
            question: "Ordena: ¿Tienen esto en azul?",
            words: ["Do", "you", "have", "this", "in", "blue", "?"],
            correct: "Do you have this in blue?",
            audio: "Do you have this in blue?",
          },
          {
            type: "multiple",
            question: "¿Qué son 'sneakers'?",
            options: ["Zapatillas", "Calcetines", "Pantalones", "Chaqueta"],
            correct: 0,
            audio: "Sneakers",
          },
          {
            type: "translate",
            question: "Traduce: Necesito una talla más pequeña",
            correct: "i need a smaller size",
            alternatives: [],
            audio: "I need a smaller size",
          },
          {
            type: "build",
            question: "Ordena: ¿Dónde está el probador?",
            words: ["Where", "is", "the", "fitting", "room", "?"],
            correct: "Where is the fitting room?",
            audio: "Where is the fitting room?",
          },
          {
            type: "multiple",
            question: "Para decir que algo te queda bien:",
            options: [
              "It fits perfectly",
              "It's good size",
              "It wears well",
              "It's correct",
            ],
            correct: 0,
            audio: "It fits perfectly",
          },
        ],
      },
    ],
  },
  unit7: {
    title: "Tiempo y Clima",
    color: "bg-cyan-500",
    lessons: [
      {
        id: "u7l1",
        title: "El Clima",
        exercises: [
          {
            type: "multiple",
            question: "¿Cómo se dice 'soleado'?",
            options: ["Sunny", "Rainy", "Cloudy", "Windy"],
            correct: 0,
            audio: "Sunny",
          },
          {
            type: "translate",
            question: "Traduce: Está lloviendo",
            correct: "it is raining",
            alternatives: ["it's raining"],
            audio: "It is raining",
          },
          {
            type: "build",
            question: "Ordena: ¿Qué temperatura hace?",
            words: ["What", "is", "the", "temperature", "?"],
            correct: "What is the temperature?",
            audio: "What is the temperature?",
          },
          {
            type: "multiple",
            question: "Cuando hay mucho viento está:",
            options: ["Windy", "Sunny", "Hot", "Cold"],
            correct: 0,
            audio: "Windy",
          },
          {
            type: "translate",
            question: "Traduce: Hace frío afuera",
            correct: "it is cold outside",
            alternatives: ["it's cold outside"],
            audio: "It is cold outside",
          },
          {
            type: "build",
            question: "Ordena: Va a nevar mañana",
            words: ["It", "will", "snow", "tomorrow"],
            correct: "It will snow tomorrow",
            audio: "It will snow tomorrow",
          },
          {
            type: "multiple",
            question: "¿Qué es 'thunder'?",
            options: ["Trueno", "Relámpago", "Lluvia", "Nieve"],
            correct: 0,
            audio: "Thunder",
          },
          {
            type: "translate",
            question: "Traduce: Está nublado hoy",
            correct: "it is cloudy today",
            alternatives: ["it's cloudy today"],
            audio: "It is cloudy today",
          },
        ],
      },
      {
        id: "u7l2",
        title: "Días y Estaciones",
        exercises: [
          {
            type: "build",
            question: "Ordena: ¿Qué día es hoy?",
            words: ["What", "day", "is", "it", "today", "?"],
            correct: "What day is it today?",
            audio: "What day is it today?",
          },
          {
            type: "multiple",
            question: "¿Cómo se dice 'primavera'?",
            options: ["Spring", "Summer", "Fall", "Winter"],
            correct: 0,
            audio: "Spring",
          },
          {
            type: "translate",
            question: "Traduce: Mi estación favorita es el verano",
            correct: "my favorite season is summer",
            alternatives: [],
            audio: "My favorite season is summer",
          },
          {
            type: "build",
            question: "Ordena: Hoy es lunes",
            words: ["Today", "is", "Monday"],
            correct: "Today is Monday",
            audio: "Today is Monday",
          },
          {
            type: "multiple",
            question: "El fin de semana incluye:",
            options: [
              "Saturday and Sunday",
              "Monday and Friday",
              "All week",
              "Five days",
            ],
            correct: 0,
            audio: "Saturday and Sunday",
          },
          {
            type: "translate",
            question: "Traduce: Nos vemos el viernes",
            correct: "see you on friday",
            alternatives: ["i'll see you on friday"],
            audio: "See you on Friday",
          },
          {
            type: "build",
            question: "Ordena: ¿Cuál es tu mes favorito?",
            words: ["What", "is", "your", "favorite", "month", "?"],
            correct: "What is your favorite month?",
            audio: "What is your favorite month?",
          },
          {
            type: "multiple",
            question: "Diciembre es en:",
            options: ["Winter", "Summer", "Spring", "Fall"],
            correct: 0,
            audio: "Winter",
          },
        ],
      },
    ],
  },
  unit8: {
    title: "Salud y Cuerpo",
    color: "bg-teal-500",
    lessons: [
      {
        id: "u8l1",
        title: "Partes del Cuerpo",
        exercises: [
          {
            type: "multiple",
            question: "¿Cómo se dice 'cabeza'?",
            options: ["Head", "Hair", "Face", "Neck"],
            correct: 0,
            audio: "Head",
          },
          {
            type: "translate",
            question: "Traduce: Me duele el estómago",
            correct: "my stomach hurts",
            alternatives: ["i have a stomachache"],
            audio: "My stomach hurts",
          },
          {
            type: "build",
            question: "Ordena: Tengo dolor de cabeza",
            words: ["I", "have", "a", "headache"],
            correct: "I have a headache",
            audio: "I have a headache",
          },
          {
            type: "multiple",
            question: "¿Qué son los 'fingers'?",
            options: ["Dedos", "Manos", "Brazos", "Piernas"],
            correct: 0,
            audio: "Fingers",
          },
          {
            type: "translate",
            question: "Traduce: Me rompí el brazo",
            correct: "i broke my arm",
            alternatives: [],
            audio: "I broke my arm",
          },
          {
            type: "build",
            question: "Ordena: Ella tiene los ojos azules",
            words: ["She", "has", "blue", "eyes"],
            correct: "She has blue eyes",
            audio: "She has blue eyes",
          },
          {
            type: "multiple",
            question: "El 'knee' es:",
            options: ["Rodilla", "Codo", "Tobillo", "Muñeca"],
            correct: 0,
            audio: "Knee",
          },
          {
            type: "translate",
            question: "Traduce: Necesito ir al dentista",
            correct: "i need to go to the dentist",
            alternatives: [],
            audio: "I need to go to the dentist",
          },
        ],
      },
      {
        id: "u8l2",
        title: "En el Doctor",
        exercises: [
          {
            type: "build",
            question: "Ordena: No me siento bien",
            words: ["I", "don't", "feel", "well"],
            correct: "I don't feel well",
            audio: "I don't feel well",
          },
          {
            type: "multiple",
            question: "¿Cómo se dice 'fiebre'?",
            options: ["Fever", "Cold", "Cough", "Pain"],
            correct: 0,
            audio: "Fever",
          },
          {
            type: "translate",
            question: "Traduce: Necesito una receta médica",
            correct: "i need a prescription",
            alternatives: [],
            audio: "I need a prescription",
          },
          {
            type: "build",
            question: "Ordena: ¿Dónde te duele?",
            words: ["Where", "does", "it", "hurt", "?"],
            correct: "Where does it hurt?",
            audio: "Where does it hurt?",
          },
          {
            type: "multiple",
            question: "Para decir que estás enfermo:",
            options: ["I'm sick", "I'm illness", "I'm disease", "I'm bad"],
            correct: 0,
            audio: "I'm sick",
          },
          {
            type: "translate",
            question: "Traduce: Estoy resfriado",
            correct: "i have a cold",
            alternatives: ["i'm sick with a cold"],
            audio: "I have a cold",
          },
          {
            type: "build",
            question: "Ordena: ¿Cuándo fue tu última visita?",
            words: ["When", "was", "your", "last", "visit", "?"],
            correct: "When was your last visit?",
            audio: "When was your last visit?",
          },
          {
            type: "multiple",
            question: "¿Qué es 'medicine'?",
            options: ["Medicina", "Doctor", "Hospital", "Enfermedad"],
            correct: 0,
            audio: "Medicine",
          },
        ],
      },
    ],
  },
  unit9: {
    title: "Hobbies y Tiempo Libre",
    color: "bg-indigo-500",
    lessons: [
      {
        id: "u9l1",
        title: "Deportes y Actividades",
        exercises: [
          {
            type: "multiple",
            question: "¿Cómo se dice 'nadar'?",
            options: ["Swim", "Run", "Jump", "Walk"],
            correct: 0,
            audio: "Swim",
          },
          {
            type: "translate",
            question: "Traduce: Me gusta jugar fútbol",
            correct: "i like to play soccer",
            alternatives: ["i like playing soccer", "i like to play football"],
            audio: "I like to play soccer",
          },
          {
            type: "build",
            question: "Ordena: ¿Practicas algún deporte?",
            words: ["Do", "you", "play", "any", "sports", "?"],
            correct: "Do you play any sports?",
            audio: "Do you play any sports?",
          },
          {
            type: "multiple",
            question: "Para ir de excursión dices:",
            options: ["Go hiking", "Go walking", "Go camping", "Go running"],
            correct: 0,
            audio: "Go hiking",
          },
          {
            type: "translate",
            question: "Traduce: Voy al gimnasio tres veces por semana",
            correct: "i go to the gym three times a week",
            alternatives: [],
            audio: "I go to the gym three times a week",
          },
          {
            type: "build",
            question: "Ordena: Ella corre todos los días",
            words: ["She", "runs", "every", "day"],
            correct: "She runs every day",
            audio: "She runs every day",
          },
          {
            type: "multiple",
            question: "¿Qué es 'cycling'?",
            options: ["Ciclismo", "Natación", "Atletismo", "Gimnasia"],
            correct: 0,
            audio: "Cycling",
          },
          {
            type: "translate",
            question: "Traduce: Juego baloncesto los fines de semana",
            correct: "i play basketball on weekends",
            alternatives: [],
            audio: "I play basketball on weekends",
          },
        ],
      },
      {
        id: "u9l2",
        title: "Entretenimiento",
        exercises: [
          {
            type: "build",
            question: "Ordena: ¿Qué haces en tu tiempo libre?",
            words: [
              "What",
              "do",
              "you",
              "do",
              "in",
              "your",
              "free",
              "time",
              "?",
            ],
            correct: "What do you do in your free time?",
            audio: "What do you do in your free time?",
          },
          {
            type: "multiple",
            question: "¿Cómo se dice 'leer'?",
            options: ["Read", "Write", "Watch", "Listen"],
            correct: 0,
            audio: "Read",
          },
          {
            type: "translate",
            question: "Traduce: Me encanta ver películas",
            correct: "i love watching movies",
            alternatives: ["i love to watch movies"],
            audio: "I love watching movies",
          },
          {
            type: "build",
            question: "Ordena: Toco la guitarra",
            words: ["I", "play", "the", "guitar"],
            correct: "I play the guitar",
            audio: "I play the guitar",
          },
          {
            type: "multiple",
            question: "Para decir que vas al cine:",
            options: [
              "Go to the movies",
              "Go to cinema",
              "Watch films",
              "See movies",
            ],
            correct: 0,
            audio: "Go to the movies",
          },
          {
            type: "translate",
            question: "Traduce: Escucho música todos los días",
            correct: "i listen to music every day",
            alternatives: [],
            audio: "I listen to music every day",
          },
          {
            type: "build",
            question: "Ordena: ¿Te gusta bailar?",
            words: ["Do", "you", "like", "dancing", "?"],
            correct: "Do you like dancing?",
            audio: "Do you like dancing?",
          },
          {
            type: "multiple",
            question: "¿Qué es 'painting'?",
            options: ["Pintura", "Dibujo", "Escultura", "Fotografía"],
            correct: 0,
            audio: "Painting",
          },
        ],
      },
    ],
  },
  unit10: {
    title: "Tecnología y Comunicación",
    color: "bg-violet-500",
    lessons: [
      {
        id: "u10l1",
        title: "Dispositivos y Tecnología",
        exercises: [
          {
            type: "multiple",
            question: "¿Cómo se dice 'computadora portátil'?",
            options: ["Laptop", "Desktop", "Tablet", "Phone"],
            correct: 0,
            audio: "Laptop",
          },
          {
            type: "translate",
            question: "Traduce: Mi teléfono no funciona",
            correct: "my phone doesn't work",
            alternatives: ["my phone isn't working"],
            audio: "My phone doesn't work",
          },
          {
            type: "build",
            question: "Ordena: ¿Tienes wifi?",
            words: ["Do", "you", "have", "wifi", "?"],
            correct: "Do you have wifi?",
            audio: "Do you have wifi?",
          },
          {
            type: "multiple",
            question: "Para cargar tu teléfono necesitas:",
            options: ["Charger", "Battery", "Cable", "Power"],
            correct: 0,
            audio: "Charger",
          },
          {
            type: "translate",
            question: "Traduce: Necesito actualizar mi software",
            correct: "i need to update my software",
            alternatives: [],
            audio: "I need to update my software",
          },
          {
            type: "build",
            question: "Ordena: ¿Cuál es la contraseña?",
            words: ["What", "is", "the", "password", "?"],
            correct: "What is the password?",
            audio: "What is the password?",
          },
          {
            type: "multiple",
            question: "¿Qué es 'keyboard'?",
            options: ["Teclado", "Ratón", "Pantalla", "Altavoz"],
            correct: 0,
            audio: "Keyboard",
          },
          {
            type: "translate",
            question: "Traduce: Mi batería está baja",
            correct: "my battery is low",
            alternatives: [],
            audio: "My battery is low",
          },
        ],
      },
      {
        id: "u10l2",
        title: "Comunicación Digital",
        exercises: [
          {
            type: "build",
            question: "Ordena: ¿Puedes enviarme un email?",
            words: ["Can", "you", "send", "me", "an", "email", "?"],
            correct: "Can you send me an email?",
            audio: "Can you send me an email?",
          },
          {
            type: "multiple",
            question: "¿Cómo se dice 'descargar'?",
            options: ["Download", "Upload", "Install", "Delete"],
            correct: 0,
            audio: "Download",
          },
          {
            type: "translate",
            question: "Traduce: Voy a subir una foto",
            correct: "i'm going to upload a photo",
            alternatives: ["i will upload a photo"],
            audio: "I'm going to upload a photo",
          },
          {
            type: "build",
            question: "Ordena: ¿Tienes redes sociales?",
            words: ["Do", "you", "have", "social", "media", "?"],
            correct: "Do you have social media?",
            audio: "Do you have social media?",
          },
          {
            type: "multiple",
            question: "Para hacer una videollamada usas:",
            options: ["Video call", "Phone call", "Message", "Email"],
            correct: 0,
            audio: "Video call",
          },
          {
            type: "translate",
            question: "Traduce: Envíame un mensaje de texto",
            correct: "send me a text message",
            alternatives: ["text me"],
            audio: "Send me a text message",
          },
          {
            type: "build",
            question: "Ordena: ¿Cuál es tu nombre de usuario?",
            words: ["What", "is", "your", "username", "?"],
            correct: "What is your username?",
            audio: "What is your username?",
          },
          {
            type: "multiple",
            question: "¿Qué es 'browser'?",
            options: ["Navegador", "Buscador", "Archivo", "Programa"],
            correct: 0,
            audio: "Browser",
          },
        ],
      },
    ],
  },
};

// Componente principal
export default function EnglishLearningApp() {
  const [screen, setScreen] = useState("home");
  const [currentLesson, setCurrentLesson] = useState<CurrentLesson | null>(
    null
  );
  const [currentExercise, setCurrentExercise] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [hearts, setHearts] = useState(5);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState<
    Record<string, Record<string, ProgressData>>
  >({});
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [builtSentence, setBuiltSentence] = useState<string[]>([]);

  // Cargar datos del localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("englishAppData");
    if (savedData) {
      const data = JSON.parse(savedData);
      setProgress(data.progress || {});
      setXp(data.xp || 0);
      setStreak(data.streak || 0);
    }
  }, []);

  // Guardar datos en localStorage
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

  // Reproducir audio usando Web Speech API
  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  // Iniciar lección
  const startLesson = (unitKey: string, lessonIndex: number) => {
    const lesson =
      lessonsData[unitKey as keyof typeof lessonsData].lessons[lessonIndex];
    setCurrentLesson({ ...lesson, unitKey, lessonIndex });
    setCurrentExercise(0);
    setHearts(5);
    setScore(0);
    setScreen("lesson");
    setFeedback(null);
    setAnswer("");
    setBuiltSentence([]);
  };

  // Verificar respuesta
  const checkAnswer = () => {
    if (!currentLesson) return;

    const exercise = currentLesson.exercises[currentExercise];
    let isCorrect = false;

    if (exercise.type === "multiple") {
      isCorrect = parseInt(answer) === exercise.correct;
    } else if (exercise.type === "translate") {
      const userAnswer = answer.toLowerCase().trim();
      isCorrect =
        userAnswer === exercise.correct ||
        (exercise.alternatives?.includes(userAnswer) ?? false);
    } else if (exercise.type === "build") {
      const builtAnswer = builtSentence.join(" ");
      isCorrect = builtAnswer === exercise.correct;
    }

    if (isCorrect) {
      setFeedback({ type: "correct", message: "¡Correcto! 🎉" });
      setScore(score + 1);
      setXp(xp + 10);
      playAudio(exercise.audio);
    } else {
      setFeedback({
        type: "incorrect",
        message: `Incorrecto. La respuesta correcta es: ${
          exercise.type === "build"
            ? exercise.correct
            : exercise.type === "multiple"
            ? exercise.options?.[exercise.correct as number] ?? exercise.correct
            : exercise.correct
        }`,
      });
      setHearts(hearts - 1);

      if (hearts <= 1) {
        setTimeout(() => endLesson(false), 2000);
        return;
      }
    }
  };

  // Siguiente ejercicio
  const nextExercise = () => {
    if (!currentLesson) return;

    if (currentExercise + 1 < currentLesson.exercises.length) {
      setCurrentExercise(currentExercise + 1);
      setFeedback(null);
      setAnswer("");
      setBuiltSentence([]);
    } else {
      endLesson(true);
    }
  };

  // Finalizar lección
  const endLesson = (completed: boolean) => {
    if (completed && currentLesson) {
      const newProgress = { ...progress };
      if (!newProgress[currentLesson.unitKey]) {
        newProgress[currentLesson.unitKey] = {};
      }
      newProgress[currentLesson.unitKey][currentLesson.id] = {
        completed: true,
        score: Math.round((score / currentLesson.exercises.length) * 100),
        hearts: hearts,
      };
      setProgress(newProgress);
      saveProgress(newProgress, xp);
    }
    setScreen("result");
  };

  // Renderizar ejercicio según tipo
  const renderExercise = () => {
    if (!currentLesson) return null;

    const exercise = currentLesson.exercises[currentExercise];

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
          onKeyPress={(e) => e.key === "Enter" && !feedback && checkAnswer()}
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
  };

  // Pantalla de inicio
  if (screen === "home") {
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
                  <span className="font-bold text-orange-600">
                    {streak} días
                  </span>
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
                      onClick={() => !isLocked && startLesson(unitKey, idx)}
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
  }

  // Pantalla de lección
  if (screen === "lesson") {
    if (!currentLesson) return null;

    const exercise = currentLesson.exercises[currentExercise];
    const progressPercent =
      ((currentExercise + 1) / currentLesson.exercises.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setScreen("home")}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              ← Salir
            </button>
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
          </div>

          {/* Progress bar */}
          <div className="bg-gray-200 h-3 rounded-full mb-8">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Ejercicio */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {exercise.question}
              </h2>
              <button
                onClick={() => playAudio(exercise.audio)}
                className="p-3 bg-blue-100 rounded-full hover:bg-blue-200"
              >
                <Volume2 className="text-blue-600" size={24} />
              </button>
            </div>

            {renderExercise()}

            {/* Feedback */}
            {feedback && (
              <div
                className={`mt-6 p-4 rounded-xl ${
                  feedback.type === "correct"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {feedback.message}
              </div>
            )}

            {/* Botones */}
            <div className="mt-6 flex gap-4">
              {!feedback ? (
                <button
                  onClick={checkAnswer}
                  disabled={
                    (exercise.type === "translate" && !answer) ||
                    (exercise.type === "multiple" && answer === "") ||
                    (exercise.type === "build" && builtSentence.length === 0)
                  }
                  className="w-full py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Verificar
                </button>
              ) : (
                <button
                  onClick={nextExercise}
                  className="w-full py-4 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600"
                >
                  Continuar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de resultados
  if (screen === "result") {
    if (!currentLesson) return null;

    const finalScore = Math.round(
      (score / currentLesson.exercises.length) * 100
    );
    const passed = finalScore >= 60;

    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">{passed ? "🎉" : "😔"}</div>
          <h2 className="text-3xl font-bold mb-4">
            {passed ? "¡Lección Completada!" : "Inténtalo de nuevo"}
          </h2>
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Puntuación</span>
              <span className="text-2xl font-bold">{finalScore}%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Respuestas correctas</span>
              <span className="text-2xl font-bold">
                {score}/{currentLesson.exercises.length}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
              <span className="text-gray-600">XP Ganados</span>
              <span className="text-2xl font-bold text-yellow-600">
                +{score * 10} XP
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setScreen("home")}
              className="flex-1 py-3 bg-gray-200 rounded-xl font-bold hover:bg-gray-300"
            >
              Volver
            </button>
            <button
              onClick={() =>
                startLesson(currentLesson.unitKey, currentLesson.lessonIndex)
              }
              className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600"
            >
              Repetir
            </button>
          </div>
        </div>
      </div>
    );
  }
}
