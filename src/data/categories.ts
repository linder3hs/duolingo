import type { CategoriesData } from "../types";

/**
 * Datos de las categorías organizadas por niveles.
 * Cada categoría contiene niveles con contenido futuro.
 */
export const categoriesData: CategoriesData = {
  basico: {
    id: "basico",
    name: "Básico",
    enabled: true,
    levels: [
      {
        id: "b1",
        title: "Nivel 1: Introducción",
        description: "Primeros pasos en inglés",
      },
      { id: "b2", title: "Nivel 2: Saludos", description: "Aprende a saludar" },
      {
        id: "b3",
        title: "Nivel 3: Familia",
        description: "Habla de tu familia",
      },
      { id: "b4", title: "Nivel 4: Comida", description: "Explora la comida" },
      {
        id: "b5",
        title: "Nivel 5: Trabajo",
        description: "Profesiones y oficios",
      },
      { id: "b6", title: "Nivel 6: Viajes", description: "Viaja con inglés" },
      { id: "b7", title: "Nivel 7: Compras", description: "De compras" },
      { id: "b8", title: "Nivel 8: Tiempo", description: "Habla del clima" },
      { id: "b9", title: "Nivel 9: Salud", description: "Cuerpo y salud" },
      { id: "b10", title: "Nivel 10: Hobbies", description: "Tus pasatiempos" },
      {
        id: "b11",
        title: "Nivel 11: Tecnología",
        description: "El mundo digital",
      },
      {
        id: "b12",
        title: "Nivel 12: Avanzado Básico",
        description: "Consolidación",
      },
    ],
  },
  intermedio: {
    id: "intermedio",
    name: "Intermedio",
    enabled: false,
    levels: [
      {
        id: "i1",
        title: "Nivel 1: Conversaciones",
        description: "Próximamente",
      },
      { id: "i2", title: "Nivel 2: Opiniones", description: "Próximamente" },
      { id: "i3", title: "Nivel 3: Narrativas", description: "Próximamente" },
      { id: "i4", title: "Nivel 4: Profesiones", description: "Próximamente" },
      { id: "i5", title: "Nivel 5: Cultura", description: "Próximamente" },
      { id: "i6", title: "Nivel 6: Negocios", description: "Próximamente" },
      {
        id: "i7",
        title: "Nivel 7: Viajes Avanzados",
        description: "Próximamente",
      },
      { id: "i8", title: "Nivel 8: Literatura", description: "Próximamente" },
      { id: "i9", title: "Nivel 9: Ciencia", description: "Próximamente" },
      { id: "i10", title: "Nivel 10: Sociedad", description: "Próximamente" },
      { id: "i11", title: "Nivel 11: Idiomas", description: "Próximamente" },
      {
        id: "i12",
        title: "Nivel 12: Avanzado Intermedio",
        description: "Próximamente",
      },
    ],
  },
  avanzado: {
    id: "avanzado",
    name: "Avanzado",
    enabled: false,
    levels: [
      { id: "a1", title: "Nivel 1: Debate", description: "Próximamente" },
      { id: "a2", title: "Nivel 2: Análisis", description: "Próximamente" },
      {
        id: "a3",
        title: "Nivel 3: Investigación",
        description: "Próximamente",
      },
      { id: "a4", title: "Nivel 4: Creatividad", description: "Próximamente" },
      { id: "a5", title: "Nivel 5: Liderazgo", description: "Próximamente" },
      { id: "a6", title: "Nivel 6: Innovación", description: "Próximamente" },
      {
        id: "a7",
        title: "Nivel 7: Globalización",
        description: "Próximamente",
      },
      { id: "a8", title: "Nivel 8: Filosofía", description: "Próximamente" },
      { id: "a9", title: "Nivel 9: Ética", description: "Próximamente" },
      { id: "a10", title: "Nivel 10: Futuro", description: "Próximamente" },
      { id: "a11", title: "Nivel 11: Maestría", description: "Próximamente" },
      { id: "a12", title: "Nivel 12: Excelencia", description: "Próximamente" },
    ],
  },
};
