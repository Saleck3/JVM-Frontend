import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { Star } from 'lucide-react';

type Props = {
    name: string;
    playerAlias: string;
    appleId: number;
    stars: number;
}

export default function ButtonApple({ name, playerAlias, appleId, stars }: Props): JSX.Element {

    return (

        <Link className="relative w-full pt-[100%] overflow-hidden" href={`/${playerAlias}/apple/${appleId}/1`} >
            <li className="absolute top-0 h-full m-[5px] cursor-pointer">
                <Image
                    className="max-w-full max-h-full object-cover rounded-lg"
                    src={'/img/modules/apple.svg'}
                    alt={"Apple_" + name}
                    height={400}
                    width={400} />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[calc(4vw+4vh+2vmin)] font-bold '>
                    {name}
                </div>
            </li>
            <div className='flex justify-center text-2xl mt-4'>
                {'⭐'.repeat(stars)}
            </div>
        </Link >
    );
};