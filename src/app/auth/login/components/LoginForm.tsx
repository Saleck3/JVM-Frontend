import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import FormSubmitButton from '@/app/shared/components/FormSubmitButton';
import { useState } from 'react';
import { login } from '@/app/shared/actions/auth';

export default function LoginForm() {
	const [error, setError] = useState<string>();

	const handleSubmit = async (formData: FormData) => {
		const data = await login(formData);
		setError(data?.error);
	};

	return (
		<form className="space-y-6" action={handleSubmit} data-testid="form">
			<div>
				<Label htmlFor="email">Email</Label>
				<Input
					name="email"
					type="email"
					placeholder="juani@gmail.com"
					required
				/>
			</div>
			<div>
				<Label htmlFor="password">Clave</Label>
				<Input
					name="password"
					type="password"
					placeholder="superpassword123"
					required
				/>
			</div>
			<FormSubmitButton className="w-full">Iniciar sesión</FormSubmitButton>
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-sm text-center">
					{error}
				</div>
			)}
			<Link
				href="/auth/register"
				className="font-semibold text-primary inline-block"
			>
				¿No tenés cuenta? ¡Regístrate!
			</Link>
		</form>
	);
}
