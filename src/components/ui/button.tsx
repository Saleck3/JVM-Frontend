import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const PRIMARY_STYLES = 'bg-primary text-primary-foreground hover:bg-primary/80';
const SECONDARY_STYLES =
	'bg-secondary text-secondary-foreground hover:bg-secondary/80';
const DESTRUCTIVE_STYLES =
	'bg-destructive text-destructive-foreground hover:bg-destructive/90';
const SUCCESS_STYLES = 'bg-green-500 text-white';
const ACCENT_STYLES = 'bg-accent text-accent-foreground hover:bg-accent/80';

const WITH_ICON_STYLES = 'flex items-center gap-2';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: PRIMARY_STYLES,
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline: 'border border-input bg-background hover:text-primary',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				accent: 'bg-accent text-accent-foreground hover:bg-accent/80',
				gray: 'bg-gray text-gray-foreground hover:bg-gray/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				super:
					'bg-gradient-to-r from-primary to-indigo-500 text-primary-foreground hover:bg-primary/80',
				success: 'bg-green-500 text-white',
				defaultWithIcon: `${PRIMARY_STYLES} ${WITH_ICON_STYLES}`,
				destructiveWithIcon: `${DESTRUCTIVE_STYLES} ${WITH_ICON_STYLES}`,
				secondaryWithIcon: `${SECONDARY_STYLES} ${WITH_ICON_STYLES}`,
				successWithIcon: `${SUCCESS_STYLES} ${WITH_ICON_STYLES}`,
				accentWithIcon: `${ACCENT_STYLES} ${WITH_ICON_STYLES}`,
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				xl: 'h-14 rounded-md px-10',
				icon: 'h-10 w-10',
				draggableLetter:
					'h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20',
				playButton: 'h-16 w-16 rounded-full p-2',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
