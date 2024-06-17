import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { FaSpinner } from 'react-icons/fa6';

export default function FormSubmitButton(props: any) {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" {...props} disabled={pending}>
			{pending ? (
				<FaSpinner className="animate-spin text-xl" />
			) : (
				props.children
			)}
		</Button>
	);
}
