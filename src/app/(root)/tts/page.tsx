'use client'

import Image from 'next/image';
import useTextToSpeech from "@/app/shared/hooks/useTextToSpeech";

export default function TTS() {

    const [play] = useTextToSpeech('Para complepletar complepletar con la letra "A" en tu teclado')

    return (
        <div className=" w-full bg-white rounded-lg p-6">
            <div className="mb-6 text-center">
                <Image
                    src="/img/icons/play-icon.svg"
                    alt="Play button"
                    className="object-cover mx-auto mb-6"
                    height={300}
                    width={200}
                    onClick={play}
                />
            </div>
        </div>
    );
}
