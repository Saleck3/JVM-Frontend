import React from 'react';
import Image from "next/image";
import noteImage from '/public/img/nota.png'; // Importa la imagen de la manzana
import afterNote from "/public/img/afterNote.png";
import beforeNote from "/public/img/Stone2.png";
// Definimos la interfaz para las propiedades de la manzana
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
        <div className="flex items-center">
            <Image src={beforeNote} alt="Before" className="w-6 h-6 mr-2" />
          <Image
              src={noteImage}
              alt="Apple"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg z-10">
          <Image src= {afterNote} alt="afterNote" className="w-6 h-6 ml-2" />
          </div>
          </div>
      </div>
  );
};

export default ButtonNote;