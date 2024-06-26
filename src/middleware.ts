import { NextRequest, NextResponse } from 'next/server';

const RESOURCE_PATHS = ['_next', '/favicon.ico', '/img', '/api'];
const PUBLIC_PATHS = ['/auth/login', '/auth/register', '/test'];
const FORBIDDEN_WHEN_LOGGED_IN_PATHS = [
	'/auth/login',
	'/auth/register',
	'/test',
];

export const middleware = async (
	req: NextRequest,
	res: NextResponse,
	options: any
) => {
	const pathName = req.nextUrl.pathname;

	if (isResourcePath(pathName)) return NextResponse.next();

	if (isLoggedIn(req.cookies)) {
		if (isForbiddenWhenLoggedInPath(pathName)) {
			return NextResponse.redirect(new URL('/', req.url));
		}
	} else if (!isPublicPath(pathName)) {
		return NextResponse.redirect(new URL('/auth/login', req.url));
	}

	return NextResponse.next();
};

const isResourcePath = (path: string): boolean => {
	return RESOURCE_PATHS.some((resourcePath) => path.includes(resourcePath));
};

const isPublicPath = (path: string): boolean => {
	return (
		PUBLIC_PATHS.some((allowedPath) => path.includes(allowedPath)) ||
		path === '/'
	);
};

const isForbiddenWhenLoggedInPath = (path: string): boolean => {
	return FORBIDDEN_WHEN_LOGGED_IN_PATHS.some((allowedPath) =>
		path.includes(allowedPath)
	);
};

const isLoggedIn = (cookies: any): boolean => {
	const lectiCookie = cookies.get('lecti-data');
	const lectiData = lectiCookie?.value ? JSON.parse(lectiCookie.value) : null;

	return Boolean(lectiData);
};
