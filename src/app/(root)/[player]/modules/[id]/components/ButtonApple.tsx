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
        <Link className="apple-item w-full" href={`/${playerAlias}/apple/${appleId}/1`} >
            <li className="apple-wrapper" >
                <Image src={'/img/modules/apple.svg'} alt={"Apple_" + name} height={400} width={400} />
                <div className='apple-overlay'>
                    {name}
                </div>
            </li>
            <div className='flex justify-center'>
                {'⭐'.repeat(stars)}
            </div>
        </Link >
    );
};