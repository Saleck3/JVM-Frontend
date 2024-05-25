import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
	'w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
	{
		variants: {
			variant: {
				default: 'w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',		
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

export interface CheckboxProps
 extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof checkboxVariants>{
	asChild?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ className, variant, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'input';
		return (
			<Comp
				className={cn(checkboxVariants({ variant, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Checkbox.displayName = 'Checkbox';
export { Checkbox, checkboxVariants };