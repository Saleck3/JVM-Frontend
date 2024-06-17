'use client';
import useUserData from '@/app/shared/hooks/useUserData';
import { useFormState } from 'react-dom';
import { createPlayer } from '../../../../shared/actions/players';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FormSubmitButton from '../../../../shared/components/FormSubmitButton';

export default function AddPlayerForm() {
	const { token } = useUserData();
	const [formState, formAction] = useFormState(createPlayer, null);

	return (
		<form action={formAction} className="space-y-6">
			<input type="hidden" name="token" value={token} />

			{formState?.reqError && (
				<ErrorMessage message={formState.reqError} key={formState.reqError} />
			)}

			<div>
				<Label htmlFor="playerName">Nombre del jugador</Label>
				<Input
					id="playerName"
					name="playerName"
					placeholder="Nombre del jugador"
				/>
				{formState?.fieldErrors?.playerName &&
					formState.fieldErrors.playerName.map((error) => (
						<ErrorMessage message={error} key={error} />
					))}
			</div>

			<div>
				<Label htmlFor="birthDate">Fecha de nacimiento</Label>
				<Input
					id="birthDate"
					type="date"
					name="birthDate"
					placeholder="Fecha de nacimiento"
				/>
				{formState?.fieldErrors?.birthDate &&
					formState.fieldErrors.birthDate.map((error) => (
						<ErrorMessage message={error} key={error} />
					))}
			</div>

			<FormSubmitButton className="w-full mt-10 link">
				Crear jugador
			</FormSubmitButton>
		</form>
	);
}

function ErrorMessage({ message }: { message: string }) {
	return <p className="text-red-600 text-xs my-1">{message}</p>;
}
