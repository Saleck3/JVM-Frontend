import { Apple } from '../types/apple.type';

function adaptApples(datosBack: any): Apple[] {
	const applesArray: Apple[] = datosBack.map((appleBack: any) =>
		adaptApple(appleBack)
	);
	return applesArray;
}

function adaptApple(unformattedApple: any): Apple {
	const apple = {
		id: unformattedApple.id,
		name: unformattedApple.name,
		stars: unformattedApple.stars,
	};
	return apple;
}

export { adaptApple, adaptApples };
