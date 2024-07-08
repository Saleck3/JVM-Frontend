import { createPlayer } from '../../../shared/actions/players';
import { getToken } from '../../../../lib/sessionUtils';
import { parseFormData } from '../../../../lib/sessionUtils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

jest.mock('../../../../lib/sessionUtils', () => ({
	getToken: jest.fn(),
	parseFormData: jest.fn(),
}));

jest.mock('next/cache', () => ({
	revalidatePath: jest.fn(),
}));

jest.mock('next/navigation', () => ({
	redirect: jest.fn(),
}));

global.fetch = jest.fn();

class URL {
	constructor(url) {
		this.url = url;
	}
}

global.URL = URL;

describe('createPlayer action', () => {
	const mockToken = { value: 'mockToken' };
	const mockParsedData = {
		fieldValues: { playerName: 'John Doe', birthDate: '2000-01-01' },
		fieldErrors: null,
	};
	const mockError = 'Network error';

	beforeEach(() => {
		fetch.mockClear();
		getToken.mockClear();
		parseFormData.mockClear();
		revalidatePath.mockClear();
		redirect.mockClear();
	});

	it('should handle successful player creation', async () => {
		setSuccessfulCreationMocks();

		const formData = new FormData();
		formData.append('playerName', 'John Doe');
		formData.append('birthDate', '2000-01-01');

		await createPlayer({}, formData);

		checkIfFetchWasCalled();
	});

	it('should handle field validation errors', async () => {
		parseFormData.mockReturnValueOnce({
			fieldErrors: { playerName: ['Error'] },
		});

		const formData = new FormData();
		formData.append('playerName', '');
		formData.append('birthDate', '2000-01-01');

		checkIfRequestWasNotMade();
	});

	it('should handle fetch errors', async () => {
		setSuccessfulCreationMocks();
		fetch.mockRejectedValueOnce(new Error(mockError));

		const formData = new FormData();
		formData.append('playerName', 'John Doe');
		formData.append('birthDate', '2000-01-01');

		checkIfRequestWasNotMade();
	});

	it('should handle fetch response errors', async () => {
		setSuccessfulCreationMocks();
		fetch.mockResolvedValueOnce({
			ok: false,
			statusText: 'Internal Server Error',
		});

		const formData = new FormData();
		formData.append('playerName', 'John Doe');
		formData.append('birthDate', '2000-01-01');

		checkIfRequestWasNotMade();
	});

	const setSuccessfulCreationMocks = () => {
		fetch.mockResolvedValueOnce({ ok: true });
		getToken.mockResolvedValueOnce(mockToken);
		parseFormData.mockReturnValueOnce(mockParsedData);
	};

	const checkIfFetchWasCalled = () => {
		expect(fetch).toHaveBeenCalledWith(expect.any(URL), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${mockToken.value}`,
			},
			body: JSON.stringify({
				playerName: 'John Doe',
				birthDate: '2000-01-01',
			}),
		});
	};

	const checkIfRevalidateAndRedirectHappened = () => {
		expect(revalidatePath).toHaveBeenCalledWith('/players');
		expect(redirect).toHaveBeenCalledWith('/players');
	};

	const checkIfRequestWasNotMade = () => {
		expect(fetch).not.toHaveBeenCalled();
		expect(revalidatePath).not.toHaveBeenCalled();
		expect(redirect).not.toHaveBeenCalled();
	};
});
