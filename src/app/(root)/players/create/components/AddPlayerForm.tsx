'use client';
import { useFormState } from 'react-dom';
import { createPlayer } from '../../../../shared/actions/players';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FormSubmitButton from '../../../../shared/components/FormSubmitButton';

const initialState = {
	fieldValues: { playerName: '', birthDate: '' },
};

export default function AddPlayerForm() {
	const [formState, formAction] = useFormState(createPlayer, initialState);

	return (
		<form action={formAction} className="space-y-6">
			{formState?.reqError && (
				<ErrorMessage message={formState.reqError} key={formState.reqError} />
			)}

			<div>
				<Label htmlFor="playerName">Nombre del jugador</Label>
				<Input
					id="playerName"
					name="playerName"
					placeholder="Nombre del jugador"
					defaultValue={formState.fieldValues?.playerName}
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
					defaultValue={formState.fieldValues?.birthDate}
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
