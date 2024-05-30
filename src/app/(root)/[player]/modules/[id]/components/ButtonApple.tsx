import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { Star } from 'lucide-react';

type Props = {
    name: string;
    playerAlias: string;
    appleId: number;
    stars: number;
    index: number;
}

export default function ButtonApple({ name, playerAlias, appleId, stars, index }: Props): JSX.Element {

    const horizontalPosition = index % 2 === 0 ? 25 : 55; 
    const verticalPosition = index * 200; // Each apple is 200px apart vertically
    return (

        <Link className="absolute"
            href={`/${playerAlias}/apple/${appleId}/1`}
            style={{ top: `${verticalPosition}px`, left: `${horizontalPosition}%` }}
            >
            <li className="relative w-40 sm:w-60 md:w-80 overflow-hidden">
                                <Image
                    className="max-w-full max-h-full object-cover rounded-lg"
                    src={'/img/modules/apple.svg'}
                    alt={"Manzana_" + name}
                    height={400}
                    width={400} />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[calc(3vw+3vh+2vmin)] font-bold '>
                    {name}
                </div>
            </li>
            <div className='flex justify-center text-2xl mt-4'>
                {'⭐'.repeat(stars)}
            </div>
        </Link >
    );
};