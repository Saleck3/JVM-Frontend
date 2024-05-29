const mockApple = [
	{
		id: 3,
		exerciseType: 'imageWriting',
		params: {
			correctAnswer: 'Perro',
			preSelectedLetters: [
				{ letter: 'P', index: 0 },
				{ letter: 'R', index: 2 },
				{ letter: 'R', index: 3 },
			],
			image: 'https://i.imgur.com/OPqM4w0.jpeg',
		},
	},
	{
		id: 1,
		exerciseType: 'letterOrdering',
		params: {
			options: ['E', 'P', 'O', 'R', 'R'],
			correctAnswer: 'Perro',
			image: 'https://i.imgur.com/OPqM4w0.jpeg',
		},
	},
	{
		id: 2,
		exerciseType: 'imageSelection',
		params: {
			options: ['Perro', 'Gato', 'Conejo'],
			label: 'Hace woof',
			correctAnswer: 'Perro',
			image: 'https://i.imgur.com/OPqM4w0.jpeg',
		},
	},
];

export default mockApple;
