import { Button } from '@/components/ui/button';
import { FaMicrophone, FaPlayCircle } from 'react-icons/fa';
import { HiSpeakerWave } from 'react-icons/hi2';

type Props = {
	onPlayClick: () => void;
	onRecordClick: () => void;
	onCheckClick: () => void;
	isRecording: boolean;
	recordDisabled: boolean;
	checkDisabled: boolean;
	textOnly?: boolean;
	text?: string;
};

export default function VoiceRecognitionGameButtons(props: Props) {
	const {
		onPlayClick,
		onRecordClick,
		onCheckClick,
		isRecording,
		recordDisabled,
		checkDisabled,
		textOnly,
	} = props;

	return (
		<div className="flex justify-between gap-8">
			{!textOnly && (
				<Button
					data-testid="play-button"
					onClick={onPlayClick}
					className="text-6xl py-12 sm:py-16 flex-1 relative"
					variant={'secondary'}
				>
					<span className="absolute text-lg left-5 top-2">1</span>

					<FaPlayCircle className="text-orange-400" />
				</Button>
			)}

			<div className="flex flex-col justify-between gap-1 sm:gap-2 flex-1">
				<Button
					onClick={onRecordClick}
					className={`sm:p-8 md:px-14 active:scale-110 transition-all relative ${
						isRecording ? 'animate-pulse bg-destructive' : ''
					} `}
					disabled={recordDisabled}
				>
					<span className="sm:hidden	me-1">{textOnly ? '1.' : '2.'}</span>
					<span className="absolute left-5 top-2 text-white hidden sm:block ">
						{textOnly ? '1' : '2'}
					</span>
					<span className="me-2 sm:me-4 sm:text-lg sm:font-light">Grabar</span>
					<FaMicrophone
						className={`text-3xl ${isRecording ? 'animate-ping' : ''}`}
					/>
				</Button>
				<Button
					className="active:scale-110 transition-all sm:p-8 md:px-14 relative"
					disabled={checkDisabled}
					onClick={onCheckClick}
					variant={'accent'}
				>
					<span className="absolute left-5 top-2 hidden sm:block">
						{textOnly ? '2' : '3'}
					</span>
					<span className="sm:hidden me-1">{textOnly ? '2.' : '3.'}</span>
					<span className="me-2 sm:me-4 sm:text-lg sm:font-light">Revisar</span>
					<HiSpeakerWave className="text-3xl" />
				</Button>
			</div>
		</div>
	);
}
