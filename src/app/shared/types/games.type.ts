/*
- Pueden llegar letras o palabras y solo hay que ordenarlas
- Si se clickea la imagen, debe hacer el sonido de la palabra (TTS)

Vale por 2
- La imagen es un boton de play (Sin ayuda)
- La imagen es una ayuda de la palabra (EJ: la imagen es una abeja)
*/
export type letterOrdering = {
    options: string[];
    correctAnswer: string;
    image?: string;
};

/*
Se muestra una imagen y se selecciona la palabra correcta de una lista
Si se clickea la imagen, debe hacer el sonido de la palabra (TTS)

Si recibe label se tiene que mostrar entremedio de la imagen y la seleccion
Ej: la palabra es muñeca el label es "__ÑECA" y las opciones "MU", "MA", "ME"
*/
export type imageSelection = {
    options: string[];
    label?: string; //Pista
    correctAnswer: string;
    image?: string;
};

/*
Se muestra una imagen y se escribe por teclado la palabra
Puede o no tener letras pre-completadas
Si se clickea la imagen, debe hacer el sonido de la palabra (TTS)

Vale por 3
- La imagen es una ayuda de la palabra (EJ: la imagen es una abeja)
- La imagen es el texto de la palabra (EJ: la imagen es "MA")
- La imagen es un boton de play (Sin ayuda)
*/
export type imageWriting = {
    correctAnswer: string;
    preSelectedLetters: preSelectedLetter[];
    image?: string;
};

type preSelectedLetter = {
    letter: string;
    index: number;
}

/*
Reproduce un video
Sin puntaje
*/
export type video = {
    image: string;
};

/** IA **/

/*  
Recibe la palabre, se lee por TTS y hay que grabar un audio repitiendo
*/
export type audioRepeating = {
    correctAnswer: string;
};

/*
Se recibe solo la palabra, se muestra en pantalla y hay que grabar un audio leyendo
*/
export type textRead = {
    correctAnswer: string;
};


/*
Ficha caligrafica, solo descarga
*/
export type worksheets = {
    image: string;
};