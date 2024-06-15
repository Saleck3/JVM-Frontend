export const pathBgsStyle: Record<number, React.CSSProperties> = {
	1: {
		background:
			'linear-gradient(white 0%, #FAB1A6 30%, #FAB1A6 50%, #FAB1A6 70%, white 100%)',
	},
	2: {
		background:
			'linear-gradient(white 0%, #C5EF9A 30%, #C5EF9A 50%, #C5EF9A 70%, white 100%)',
	},
	3: {
		background:
			'linear-gradient(white 0%, #CFFAF0 30%, #CFFAF0 50%, #CFFAF0 70%, white 100%)',
	},
};

export const appleColors: Record<number, { front: string; back: string }> = {
	1: {
		front: '#EC5A45',
		back: '#BD230D',
	},
	2: {
		front: '#96E448',
		back: '#65BD0D',
	},
	3: {
		front: '#A0FAD9',
		back: '#69CAB3',
	},
};

export const getAppleImageStyle = (i: number): React.CSSProperties => {
	return {
		position: 'absolute',
		left: i % 2 === 0 ? 'calc(50% + 50px)' : 'calc(50% - 150px)',
		top: i === 0 ? '300px' : `${300 + 532 * i}px`,
	};
};

export const getPathAxisPositions = (totalApples: number): string[] => {
	const initialPositions = [0, -45, -70, -45, 0, 45, 70, 45];
	const positions = [];

	let i = 0;
	let j = 0;

	while (i < totalApples) {
		positions.push(`${initialPositions[j]}px`);

		i++;
		j++;

		if (j === initialPositions.length) j = 0;
	}

	return positions;
};

export const getPathImagesAmount = (totalApples: number): number => {
	return Math.floor(totalApples / 4) || 1;
};

export const getPathImageNumber = (index: number): number => {
	const totalImages = 3;
	let i = index + 1;

	while (i > totalImages) {
		i -= totalImages;
	}

	return i;
};
