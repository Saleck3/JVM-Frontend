import { appleType } from "../types/apple.type";

function adaptApples(datosBack: any): appleType[] {
	const applesArray: appleType[] = datosBack.map((appleBack: any) =>
		(adaptApple(appleBack)));
	return applesArray;
}

function adaptApple(unformattedApple: any): appleType {
	const apple = {
		id: unformattedApple.id,
		name: unformattedApple.name,
		stars: unformattedApple.stars
	}
	return apple;
}

export { adaptApple, adaptApples };