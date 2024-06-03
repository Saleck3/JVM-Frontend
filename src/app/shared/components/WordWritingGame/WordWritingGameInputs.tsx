import { PreSelectedLetter } from '../../types/games.type';

type Props = {
	word: string;
	preSelectedLetters: PreSelectedLetter[];
	onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function WordWritingGameInputs(props: Props) {
	const { word, preSelectedLetters, onKeyUp } = props;

	const inputCommonClasses = `m-2 uppercase text-center border-b-4 border-secondary bg-gray focus:outline-none
		focus:bg-gray-200 rounded-sm h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20 text-4xl lg:text-5xl`;

	return (
		<div className="flex justify-center flex-wrap">
			{word.split('').map((letter, i) => {
				const preselectedLetter = preSelectedLetters.find(
					(pl) => pl.index === i
				);

				if (preselectedLetter) {
					return (
						<input
							key={letter + i}
							className={`${inputCommonClasses} bg-green-200`}
							value={preselectedLetter.letter}
							disabled
						/>
					);
				} else {
					return (
						<input
							className={inputCommonClasses}
							type="text"
							key={letter + i}
							maxLength={1}
							onKeyUp={onKeyUp}
						/>
					);
				}
			})}
		</div>
	);
}
