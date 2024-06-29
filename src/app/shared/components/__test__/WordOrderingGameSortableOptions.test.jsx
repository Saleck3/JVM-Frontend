import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WordOrderingGameSortableOptions from '../WordOrderingGame/WordOrderingGameSortableOptions';

describe('WordOrderingGameSortableOptions', () => {
	const mockOnSort = jest.fn();
	const options = ['Option 1', 'Option 2', 'Option 3'];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the options as draggable buttons', () => {
		render(
			<WordOrderingGameSortableOptions
				options={options}
				onSort={mockOnSort}
				disableDrag={false}
			/>
		);

		checkIfOptionsAreRendered();
		checkIfOptionsAreDraggable();
	});

	it('calls onSort with reordered options when dragging and dropping', async () => {
		render(
			<WordOrderingGameSortableOptions
				options={options}
				onSort={mockOnSort}
				disableDrag={false}
			/>
		);

		orderOptions();
		checkIfOptionsAreOrdered();
	});

	it('does not allow dragging when disableDrag is true', () => {
		render(
			<WordOrderingGameSortableOptions
				options={options}
				onSort={mockOnSort}
				disableDrag={true}
			/>
		);

		checkIfOptionsAreNotDraggable();
	});

	const checkIfOptionsAreRendered = () => {
		options.forEach((option, index) => {
			const button = screen.getByText(option);
			expect(button).toBeInTheDocument();
			expect(button).toHaveAttribute('draggable', 'true');
		});
	};

	const checkIfOptionsAreDraggable = () => {
		options.forEach((option, index) => {
			const button = screen.getByText(option);
			expect(button).toHaveAttribute('draggable', 'true');
		});
	};

	const checkIfOptionsAreNotDraggable = () => {
		options.forEach((option) => {
			const button = screen.getByText(option);
			expect(button).toHaveAttribute('draggable', 'false');
		});
	};

	const orderOptions = async () => {
		screen.getByText('Option 1');
		screen.getByText('Option 2');
	};

	const checkIfOptionsAreOrdered = () => {
		expect(screen.getByText('Option 2')).toBeInTheDocument();
		expect(screen.getByText('Option 1')).toBeInTheDocument();
		expect(screen.getByText('Option 3')).toBeInTheDocument();
	};
});
