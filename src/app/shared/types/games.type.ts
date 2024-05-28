/*
- Pueden llegar letras o palabras y solo hay que ordenarlas
- Si se clickea la imagen, debe hacer el sonido de la palabra (TTS)

Vale por 2
- La imagen es un boton de play (Sin ayuda)
- La imagen es una ayuda de la palabra (EJ: la imagen es una abeja)
*/
export type letter_ordering = {
    words: string[];
    correctWord: string;
    url: string;
};

/*
Se muestra una imagen y se selecciona la palabra correcta de una lista
Si se clickea la imagen, debe hacer el sonido de la palabra (TTS)

Si recibe label se tiene que mostrar entremedio de la imagen y la seleccion
Ej: la palabra es muñeca el label es "__ÑECA" y las opciones "MU", "MA", "ME"
*/
export type image_selection = {
    words: string[];
    label: string;
    correctWord: string;
    url: string;
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
export type image_writing = {
    correctWord: string;
    preSelectedLetters: string[];
    url: string;
};

/*
Reproduce un video
Sin puntaje
*/
export type video = {
    url: string;
};

/** IA **/

/*  
Recibe la palabre, se lee por TTS y hay que grabar un audio repitiendo
*/
export type audio_repeating = {
    correctWord: string;
};

/*
Se recibe solo la palabra, se muestra en pantalla y hay que grabar un audio leyendo
*/
export type text_read = {
    correctWord: string;
};


/*
Ficha caligrafica, solo descarga
*/
export type worksheets = {
    url: string;
};