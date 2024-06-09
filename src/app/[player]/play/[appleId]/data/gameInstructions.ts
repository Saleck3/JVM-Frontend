type Games = 'WordOrderingGame' | 'WordSelectionGame' | 'WordWritingGame';

export const gameInstructions: Record<Games, string> = {
	WordOrderingGame:
		'Para completar el juego, arrastrá con el mouse las palabras en el orden correcto. Luego, clickeá continuar.',
	WordSelectionGame:
		'Para completar el juego, seleccioná con el mouse lo que falte en la palabra.',
	WordWritingGame:
		'Para completar el juego, escribi la palabra con tu teclado. Luego, clickeá comprobar',
};
