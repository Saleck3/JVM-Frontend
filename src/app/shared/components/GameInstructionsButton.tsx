import { Button } from '@/components/ui/button';
import Image from 'next/image';

type Props = {
	onclick: () => void;
};

export default function GameInstructionsButton({ onclick }: Props) {
	return (
		<Button onClick={onclick} className="shrink-0">
			<Image
				src="/img/icons/play-icon-mini.svg"
				alt="tts-instructions"
				height={30}
				width={30}
				className="object-contain"
			/>
		</Button>
	);
}
