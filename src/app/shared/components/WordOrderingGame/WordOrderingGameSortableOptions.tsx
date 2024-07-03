import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';

interface Props {
	options: string[];
	disableDrag?: boolean;
	onSort: (options: string[]) => void;
}

export default function WordOrderingGameSortableOptions({
	options,
	onSort,
	disableDrag,
}: Props) {
	const [orderedOptions, setOrderedOptions] = useState<string[]>(options);

	const dragOption = useRef<number>(0);
	const draggedOverOption = useRef<number>(0);

	const handleSort = () => {
		const newOptions = [...orderedOptions];
		const draggedOption = newOptions[dragOption.current];

		newOptions[dragOption.current] = newOptions[draggedOverOption.current];
		newOptions[draggedOverOption.current] = draggedOption;

		setOrderedOptions(newOptions);
		onSort(newOptions);
	};

	const handleTouchMove = (e:any) => {
		const touchLocation = e.targetTouches[0];
		const element = document.elementFromPoint(
			touchLocation.clientX,
			touchLocation.clientY
		);
		const index = parseInt(element?.getAttribute('data-index')!, 10);
		if (!isNaN(index)) {
			draggedOverOption.current = index;
		}
	};

	return (
		<div className="flex justify-around flex-wrap gap-2">
			{orderedOptions?.map((option, i) => {
				return (
					<Button
						key={option + i}
						variant={'secondary'}
						draggable={!disableDrag}
						onDragStart={() => (dragOption.current = i)}
						onDragEnter={() => (draggedOverOption.current = i)}
						onDragEnd={handleSort}
						data-index={i}
						onTouchStart={() => (dragOption.current = i)}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleSort}
						onDragOver={(e) => e.preventDefault()}
						className="cursor-grab active:scale-110 active:cursor-grabbing transition-all uppercase
						flex-grow flex-shrink text-2xl lg:text-3xl"
					>
						{option}
					</Button>
				);
			})}
		</div>
	);
}
