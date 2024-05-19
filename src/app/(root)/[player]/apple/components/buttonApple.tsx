import React from 'react';
import Image from "next/image";
import Link from 'next/link';

type AppleProps = {
  letter: string;
  playerNick: string;
  appleId: number;
}

export default function ButtonApple({ letter, playerNick, appleId }: AppleProps):
  JSX.Element {
  return (
    <Link className="apple-item w-full" href={`/${playerNick}/apple/${appleId}`} >
      <li className="apple-wrapper" >
        <Image src={'/img/apples/apple.svg'} alt={"Apple_" + appleId} height={400} width={400} />
        <div className='apple-overlay'>
          {letter}
        </div>
      </li>
    </Link>
  );
};