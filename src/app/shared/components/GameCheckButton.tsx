import { Button } from '@/components/ui/button';
import { GoChecklist } from 'react-icons/go';
import { FaRedoAlt } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { MdWatchLater } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';

type Props = {
	onClick: () => void;
	wrongAttempt?: boolean;
	outOfRetries: boolean;
	gameFinished: boolean;
	hasOwnCheckButton?: boolean;
	loading?: boolean;
	disabled?: boolean;
	className?: string;
};

export default function GameCheckButton(props: Props) {
	const {
		onClick,
		wrongAttempt,
		outOfRetries,
		gameFinished,
		hasOwnCheckButton,
		loading,
		disabled,
		className,
	} = props;

	const getButtonContent = () => {
		switch (true) {
			case outOfRetries:
				return (
					<>
						<MdWatchLater className="text-2xl" />
						<span className="inline-block">¡Hagamoslo luego!</span>
					</>
				);
			case gameFinished:
				return (
					<>
						<FaCheck className="text-2xl" />
						<span>Siguiente</span>
					</>
				);
			case loading:
				return (
					<>
						<FaSpinner className="animate-spin text-xl min-w-20" />
					</>
				);
			case wrongAttempt:
				return (
					<>
						<FaRedoAlt className="text-2xl" />
						<span>Reintentar</span>
					</>
				);
			default:
				return (
					<>
						<GoChecklist className="text-2xl" />
						<span>Comprobar</span>
					</>
				);
		}
	};

	const buttonVariant = outOfRetries
		? 'accentWithIcon'
		: gameFinished
		? 'successWithIcon'
		: wrongAttempt
		? 'destructiveWithIcon'
		: 'defaultWithIcon';

	if (!hasOwnCheckButton || gameFinished || outOfRetries) {
		return (
			<Button
				className={`${className} sm:text-lg sm:font-light`}
				onClick={onClick}
				variant={buttonVariant}
				disabled={disabled || loading}
			>
				{getButtonContent()}
			</Button>
		);
	}

	return null;
}
