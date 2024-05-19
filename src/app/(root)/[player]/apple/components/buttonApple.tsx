import React from 'react';
import Image from "next/image";
import appleImage from '/public/img/apple.svg'; // Importa la imagen de la manzana
import Link from 'next/link';

// Definimos la interfaz para las propiedades de la manzana
interface AppleProps {
  letter: string;
  playerNick: string;
  appleId: number;
}

// Componente de Manzana
const ButtonApple: React.FC<AppleProps> = ({ letter, playerNick, appleId }) => {
  return (
    <Link className="apple-item w-full" href={`/${playerNick}/apple/${appleId}`} >
      <li className="apple-wrapper" style={{ margin: '5px', cursor: 'pointer' }}    >
        <Image src={appleImage} alt="Apple" />
        <div className='apple-overlay'>
          {letter}
        </div>
      </li>
    </Link>
  );
};

export default ButtonApple;