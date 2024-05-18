import React from 'react';
import Image from "next/image";
import appleImage from '/public/img/apple.png'; // Importa la imagen de la manzana

// Definimos la interfaz para las propiedades de la manzana
interface AppleProps {
  letter: string;
  onClick: () => void;
}

// Componente de Manzana
const ButtonApple: React.FC<AppleProps> = ({ letter, onClick }) => {
  return (
    <div 
    className="apple"
    style={{ 
      position: 'relative', // Añadir position: relative
      width: '50px', 
      height: '50px',
      margin: '5px', 
      cursor: 'pointer' 
    }}
    onClick={onClick}
  >
    <Image src={appleImage} alt="Apple" style={{ width: '100%', height: '100%' }} />
    <div style={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      color: 'white', 
      fontSize: '20px', 
      zIndex: 1 // Asegurar que el texto está por delante
    }}>
      {letter}
    </div>
  </div>
  );
};

export default ButtonApple;