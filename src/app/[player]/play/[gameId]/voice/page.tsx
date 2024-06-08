'use client';

import VoiceRecognitionGame from '@/app/shared/components/VoiceRecognitionGame';
import { useParams } from 'next/navigation';

export default function VoiceGame() {
	const { player, gameId } = useParams();

	const mockPlayerId = '1';

	return (
		<div className="bg-gray h-screen flex flex-col items-center justify-center gap-8 p-10">
			<VoiceRecognitionGame playerId={mockPlayerId} gameId={gameId as string} />
		</div>
	);
}
