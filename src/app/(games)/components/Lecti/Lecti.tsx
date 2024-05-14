import Image from 'next/image';

export default function Lecti() {
    return (
        <Image
            src="/img/test-now.svg"
            alt="lombriz haciendo un examen"
            width={500}
            height={500}
            className="mb-8 lg:mb-0 lg:mr-8"
        />
    );
}