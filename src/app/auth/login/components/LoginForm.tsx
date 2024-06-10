import { Button } from '@/components/ui/button';
import { FaSpinner } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Props = {
	handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
	isFetching: boolean;
};

export default function LoginForm({ handleLogin, isFetching }: Props) {
	const error = useSearchParams().get('error');

	return (
		<form className="space-y-6" onSubmit={handleLogin} method="POST">
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
				<Label htmlFor="password">Your email address</Label>
				<Input
					name="password"
					type="password"
					placeholder="superpassword123"
					required
				/>
			</div>
			<Button type="submit" className="w-full" disabled={isFetching}>
				{isFetching ? (
					<FaSpinner className="animate-spin text-xl" />
				) : (
					'Iniciar sesión'
				)}
			</Button>
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-sm">
					Email o Password incorrecto
				</div>
			)}
			<Link
				href="/auth/register"
				className="font-semibold text-primary inline-block"
			>
				¿No tenes cuenta? Registrate!
			</Link>
		</form>
	);
}
