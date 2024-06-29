import { login } from '../auth';
import { createLectiData, setLectiData } from '../../../../lib/sessionUtils';
import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';

jest.mock('../../../../lib/sessionUtils', () => ({
	createLectiData: jest.fn(),
	setLectiData: jest.fn(),
	removeLectiData: jest.fn(),
}));

jest.mock('jwt-decode', () => ({
	jwtDecode: jest.fn(),
}));

jest.mock('next/navigation', () => ({
	redirect: jest.fn(),
}));

global.fetch = jest.fn();

describe('login action', () => {
	const mockToken = 'mockToken';
	const mockPlayers = [{ id: 1, name: 'Player 1' }];
	const mockDecodedToken = { sub: 'userId', exp: 1234567890 };

	beforeEach(() => {
		fetch.mockClear();
		createLectiData.mockClear();
		setLectiData.mockClear();
		redirect.mockClear();
		jwtDecode.mockClear();
	});

	it('should handle successful login', async () => {
		setSuccessfulLoginMocks();

		const formData = new FormData();
		formData.append('email', 'test@example.com');
		formData.append('password', 'password');

		await login(formData);

		checkIfFetchWasCalled();
		checkIfDataWasSet();
	});

	it('should handle login failure', async () => {
		fetch.mockResolvedValueOnce({
			ok: false,
			statusText: 'Unauthorized',
		});

		const formData = new FormData();
		formData.append('email', 'test@example.com');
		formData.append('password', 'password');

		const result = await login(formData);

		checkIfFailureWasHandled(result);
	});

	it('should handle fetch error', async () => {
		fetch.mockRejectedValueOnce(new Error('Network error'));

		const formData = new FormData();
		formData.append('email', 'test@example.com');
		formData.append('password', 'password');

		const result = await login(formData);

		checkIfFetchErrorWasHandled(result);
	});

	const setSuccessfulLoginMocks = () => {
		fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({ token: mockToken, players: mockPlayers }),
		});
		jwtDecode.mockReturnValueOnce(mockDecodedToken);
		createLectiData.mockResolvedValueOnce('userData');
	};

	const checkIfFetchWasCalled = () => {
		expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
	};

	const checkIfDataWasSet = () => {
		expect(createLectiData).toHaveBeenCalledWith(
			'userId',
			mockPlayers,
			mockToken,
			1234567890
		);
		expect(setLectiData).toHaveBeenCalledWith('userData');
		expect(redirect).toHaveBeenCalledWith('/players');
	};

	const checkIfFailureWasHandled = (result) => {
		expect(result).toEqual({ error: 'Email o contraseña incorrecta' });
		expect(redirect).not.toHaveBeenCalled();
	};

	const checkIfFetchErrorWasHandled = (result) => {
		expect(result).toEqual({ error: 'Error al iniciar sesión' });
		expect(redirect).not.toHaveBeenCalled();
	};
});
