import { Button } from '@/components/ui/button';
import { FaPen } from 'react-icons/fa';
import { FaRedoAlt } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { MdWatchLater } from 'react-icons/md';

type Props = {
	onClick: () => void;
	wrongAttempt?: boolean;
	outOfRetries: boolean;
	gameFinished: boolean;
	hasOwnCheckButton?: boolean;
};

export default function GameCheckButton(props: Props) {
	const {
		onClick,
		wrongAttempt,
		outOfRetries,
		gameFinished,
		hasOwnCheckButton,
	} = props;

	const getButtonContent = () => {
		switch (true) {
			case outOfRetries:
				return (
					<>
						<MdWatchLater className="text-2xl" />
						<span>¡Reintenemoslo luego!</span>
					</>
				);
			case gameFinished:
				return (
					<>
						<FaCheck className="text-2xl" />
						<span>Siguiente</span>
					</>
				);
			case wrongAttempt:
				return (
					<>
						<FaRedoAlt className="text-2xl" />
						<span>Intentar de nuevo</span>
					</>
				);
			default:
				return (
					<>
						<FaPen className="text-2xl" /> Comprobar
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
				className="w-full mt-6 text-md"
				onClick={onClick}
				variant={buttonVariant}
			>
				{getButtonContent()}
			</Button>
		);
	}

	return null;
}
