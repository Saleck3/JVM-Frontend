'use client';

import React from 'react';
import Image from 'next/image';
import noteImage from "@/../public/img/apples/nota.png";

interface NoteProps {
    onClick: () => void;
    className?: string;
}

const ButtonNote: React.FC<NoteProps> = ({ onClick }) => {
    return (
        <div
            className="relative w-12 h-12 m-1 cursor-pointer"
            onClick={onClick}
        >
            <Image
                src={noteImage}
                alt="Apple"
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg z-10">
            </div>
        </div>
    );
};

export default ButtonNote;
