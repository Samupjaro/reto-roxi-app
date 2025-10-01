export const initialChallenges = [
  { id: 1, type: 'code', prompt: 'Cual fue el Primer peluche que te regale?', code: 'ballena', revealedTile: [0, 0] },
  { id: 2, type: 'quiz', prompt: 'Cuantos pantalones tengo?', options: ['2', '3', '1'], correct: 0, revealedTile: [0, 1] },
  { id: 3, type: 'code', prompt: 'Si tienes 4 labiales de $20.000 y los vendes todos al mismo precio con cuanto dinero quedas?', code: '$80.000', revealedTile: [0, 2] },
  { id: 4, type: 'quiz', prompt: 'Normal Mente Cuantos AROS trae la bolsa que vendo?', options: ['40', '50', '30'], correct: 2, revealedTile: [0, 3] },
  { id: 5, type: 'code', prompt: 'Contraseña del celu de samu y el tuyo juntos', code: '070412007', revealedTile: [1, 0] },
  { id: 6, type: 'quiz', prompt: 'Cual es mi pelicula favorita aparte la de tinkerbell', options: ['jurassic world', 'cars', 'spider man '], correct: 0, revealedTile: [1, 1] },
  { id: 7, type: 'code', prompt: 'Si me tumbas, soy todo. Si me cortas por la cintura, me quedo en nada. ¿Qué soy?', code: '8', revealedTile: [1, 2] },
  { id: 8, type: 'quiz', prompt: 'Cuando Cumple Salomon?', options: ['15 de septiembre', '15 de julio', '15 de marzo'], correct: 2, revealedTile: [1, 3] },
  { id: 9, type: 'code', prompt: 'mi comida preferida es?', code: 'spaguetis', revealedTile: [2, 0] },
  { id: 10, type: 'quiz', prompt: '¿Número de piezas?', options: ['12', '16', '20'], correct: 1, revealedTile: [2, 1] },
  { id: 11, type: 'code', prompt: 'Persona muy especial', code: 'roxi', revealedTile: [2, 2] },
  { id: 12, type: 'quiz', prompt: 'la respuesta en mi bio de tik tok', options: ['hola', '⚽', '...'], correct: 2, revealedTile: [2, 3] },
  { id: 13, type: 'code', prompt: 'respuesta #1', code: 'ballena', revealedTile: [3, 0] },
  { id: 14, type: 'quiz', prompt: 'en cartagena vivo en?', options: ['boca grande', 'san jose', 'colombia'], correct: 1, revealedTile: [3, 1] },
  { id: 15, type: 'code', prompt: 'Cuantos sapos tiene una lombris', code: '8', revealedTile: [3, 2] },
  { id: 16, type: 'quiz', prompt: '¡Ganaste!', options: ['Siii', 'si'], correct: 0, revealedTile: [3, 3] },
];

export const gameConfig = {
  gridSize: 4,
  totalTiles: 16,
  backgroundImage: '/images/roxi.png' // Pon tu imagen aquí en /public/images/
};