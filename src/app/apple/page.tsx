'use client'; 

import React from 'react';
import ButtonApple from './components/buttonApple';

const ApplePath: React.FC = () => {
  const handleClick = (letter: string) => {
    console.log(`Clicked on apple with letter ${letter}`);
    // Aquí puedes manejar la lógica de lo que sucede cuando se hace clic en una manzana
  };


  const alphabet = 'AEIOUMPBVSLNTRYFKDHJVZCGWX';
                   
  return (
    
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      {alphabet.split('').map((letter, index) => (
        <ButtonApple key={index} letter={letter} onClick={() => handleClick(letter)} />
      ))}
    </div>
   
  );
};
export default ApplePath;