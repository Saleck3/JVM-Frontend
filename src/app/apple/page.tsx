"use client"
// ApplePath.tsx
import React from 'react';
import ButtonApple from './components/buttonApple';
import NoteImage from './components/buttonNote';

const ApplePath: React.FC = () => {
    const handleClick = (letter: string) => {
        console.log(`Clicked on apple with letter ${letter}`);
    };

    const sequence: (string | null)[][] = [
        ["A", null, null],
        [null, "N", null],
        [null, null, "E"],
        [null, "N", null],
        ["I", null, null],
        [null, "N", null],
        [null, null, "O"],
        [null, "N", null],
        ["U", null, null],
        [null, "N", null]
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '200px' }}>
                {sequence.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {row.map((item, colIndex) => (
                            <div key={colIndex}>
                                {item === "A" && <ButtonApple letter={item} onClick={() => handleClick(item)} />}
                                {item === "N" && <NoteImage onClick={() => {}} />}
                                {item === "E" && <ButtonApple letter={item} onClick={() => handleClick(item)} />}
                                {item === "I" && <ButtonApple letter={item} onClick={() => handleClick(item)} />}
                                {item === "O" && <ButtonApple letter={item} onClick={() => handleClick(item)} />}
                                {item === "U" && <ButtonApple letter={item} onClick={() => handleClick(item)} />}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApplePath;
