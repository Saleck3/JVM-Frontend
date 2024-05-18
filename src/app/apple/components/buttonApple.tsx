'use client';

import React from 'react';
import Image from 'next/image';
import appleImage from "@/../public/img/apples/apple.png";

interface AppleProps {
    letter: string;
    onClick: () => void;
}

const ButtonApple: React.FC<AppleProps> = ({ letter, onClick }) => {
    return (
        <div
            className="relative w-12 h-12 m-1 cursor-pointer"
            onClick={onClick}
        >
            <Image
                src={appleImage}
                alt="Apple"
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg z-10">
                {letter}
            </div>
        </div>
    );
};

export default ButtonApple;
