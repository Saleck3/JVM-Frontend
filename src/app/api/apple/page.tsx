'use client'; 

import React from 'react';
import ButtonApple from './components/buttonApple';
import ButtonNote from './components/buttonNote/buttonNote';



const alphabet = 'AEIOUMPBVSLNTRYFKDHJVZCGWX';


const ApplePath: React.FC = () => {
  const handleClick = (letter: string) => {
    console.log(`Clicked on apple with letter ${letter}`);
    // Aquí puedes manejar la lógica de lo que sucede cuando se hace clic en una manzana
  };

  const alphabet = 'AEIOUMPBVSLNTRYFKDHJVZCGWX';

  const sequence = (alphabet: string): (string | null)[][] => {
    const result: (string | null)[][] = [];
    const length = alphabet.length;
    let index = 0;

    while (index < length) {
      // Primera fila: ButtonApple en la primera columna
      if (index < length) {
        result.push([alphabet[index], null, null]);
        index++;
      }

      // Segunda fila: ButtonNote en la segunda columna
      if (index < length) {
        result.push([null, 'note', null]);
      }

      // Tercera fila: ButtonApple en la tercera columna
      if (index < length) {
        result.push([null, null, alphabet[index]]);
        index++;
      }

       // Segunda fila: ButtonNote en la segunda columna
       if (index < length) {
        result.push([null, 'note', null]);
      }
    }

    return result;
  };

  return (
    <div className="flex justify-center">
      <div className="grid gap-4" style={{ maxWidth: '600px' }}>
        {sequence(alphabet).map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-4">
            {row.map((item, colIndex) => (
              <div key={colIndex} className="flex justify-center">
                {item !== null && item !== 'note' && (
                  <ButtonApple letter={item} onClick={() => handleClick(item)} />
                )}
                {item === 'note' && <ButtonNote onClick={() => {}} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplePath;