import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { RiUserVoiceFill } from 'react-icons/ri';

type Props = {
	onclick: () => void;
};

export default function GameInstructionsButton({ onclick }: Props) {
	return (
		<Button onClick={onclick} className="p-0 bg-transparent">
			<RiUserVoiceFill />
		</Button>
	);
}
