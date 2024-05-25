import Link from 'next/link';
import React from 'react';

export default function page() {
	return (
		<div className="flex">
			<Link href="/games/select" className="bg-red-200 p-2">
				Seleccion palabra
			</Link>
		</div>
	);
}
