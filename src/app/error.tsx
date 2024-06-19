'use client';

import Image from 'next/image';

export default function error({ error }: { error: Error }) {
	return (
		<div>
			<ul>
				<li>{error.name}</li>
				<li>{error.message}</li>
			</ul>
			<Image
				className="animate-spin"
				src="/img/hero-bgless.svg"
				alt="Error"
				width={250}
				height={250}
			/>
		</div>
	);
}
