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
};

export default function VoiceRecognitionGameButtons(props: Props) {
	const {
		onPlayClick,
		onRecordClick,
		onCheckClick,
		isRecording,
		recordDisabled,
		checkDisabled,
	} = props;

	return (
		<div className="flex justify-between gap-8">
			<Button
				onClick={onPlayClick}
				className="text-6xl py-12 sm:py-16 flex-1"
				variant={'secondary'}
			>
				<FaPlayCircle className="text-orange-400" />
			</Button>

			<div className="flex flex-col justify-between gap-1 sm:gap-2 flex-1">
				<Button
					onClick={onRecordClick}
					className={`sm:p-8 md:px-14 active:scale-110 transition-all ${
						isRecording ? 'animate-pulse bg-destructive' : ''
					} `}
					disabled={recordDisabled}
				>
					<span className="me-2 sm:me-4 sm:text-lg sm:font-light">Grabar</span>
					<FaMicrophone
						className={`text-3xl ${isRecording ? 'animate-ping' : ''}`}
					/>
				</Button>
				<Button
					className="active:scale-110 transition-all sm:p-8 md:px-14"
					disabled={checkDisabled}
					onClick={onCheckClick}
					variant={'accent'}
				>
					<span className="me-2 sm:me-4 sm:text-lg sm:font-light">Revisar</span>

					<HiSpeakerWave className="text-3xl" />
				</Button>
			</div>
		</div>
	);
}
