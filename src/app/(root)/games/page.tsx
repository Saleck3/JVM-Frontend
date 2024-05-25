import Link from 'next/link';
import React from 'react';

export default function page() {
	return (
		<div className="flex">
			<Link href="/games/select" className="bg-red-200 p-2 m-2">
				Seleccion palabra
			</Link>
			<Link href="/games/write" className="bg-red-200 p-2 m-2">
				Escribir palabra
			</Link>
		</div>
	);
}
