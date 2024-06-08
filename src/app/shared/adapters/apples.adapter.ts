import { Apple } from '../types/apple.type';

function adaptApples(apples: any): Apple[] {
	const formattedApples: Apple[] = apples.map((appleBack: any) =>
		adaptApple(appleBack)
	);

	return formattedApples;
}

function adaptApple(unformattedApple: any): Apple {
	const apple = {
		id: unformattedApple.id,
		name: unformattedApple.name,
		stars: unformattedApple.score,
		type: unformattedApple.appleType,
	};
	return apple;
}

export { adaptApple, adaptApples };
