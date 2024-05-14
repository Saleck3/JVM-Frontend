import React from 'react';
import Image from "next/image";

function WordImage() {
    const lionImage = require('/public/img/games/lion.svg');

    return (
        <Image
            src={lionImage}
            alt="leon"
            width={500}
            height={500}
        />
    );
}

export default WordImage;
