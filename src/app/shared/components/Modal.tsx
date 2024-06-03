import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

interface Props {
	triggerButton: React.ReactNode;
	description?: string;
	children?: React.ReactNode;
	footer?: React.ReactNode;
	title?: string;
}

export function Modal(props: Props) {
	const { triggerButton, description, title, children, footer } = props;

	return (
		<Dialog>
			<DialogTrigger asChild>{triggerButton}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
				<DialogFooter>{footer}</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
