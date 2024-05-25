import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { Star } from 'lucide-react';

type AppleProps = {
    letter: string;
    playerNick: string;
    appleId: number;
    stars: number;
}

export default function ButtonApple({ letter, playerNick, appleId, stars }: AppleProps): JSX.Element {
    let starsDiv;
    if (stars && stars != 0) {
        starsDiv =
            [...Array(stars)].map((e, i) => (
                <span key={"star" + stars} id={"star" + stars} > {'⭐'}</span>
            ))
    } else {
        starsDiv = "";
    }


    return (
        <Link className="apple-item w-full" href={`/${playerNick}/apple/${appleId}/1`} >
            <li className="apple-wrapper" >
                <Image src={'/img/modules/apple.svg'} alt={"Apple_" + appleId} height={400} width={400} />
                <div className='apple-overlay'>
                    {letter}
                </div>
            </li>
            <div className='flex justify-center'>
                {starsDiv}
            </div>
        </Link >
    );
};