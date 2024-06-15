type Games = 'WordOrderingGame' | 'WordSelectionGame' | 'WordWritingGame';

export const gameInstructions: Record<Games, string> = {
	WordOrderingGame:
		'Ordená las partes y apretá Comprobar.',
	WordSelectionGame:
		'Seleccioná la sílaba que falta y apretá comprobar.',
	WordWritingGame:
		'Escribí la palabra y apretá comprobar',
};
