import TextToSpeech from "@/app/shared/components/TextToSpeech";

export default function TTS() {
    return (
        <div className=" w-full bg-white rounded-lg p-6">
            <TextToSpeech
                texto='Para completar este juego, tenés que completar con la letra "A" en tu teclado'
            />
        </div>
    );
}
