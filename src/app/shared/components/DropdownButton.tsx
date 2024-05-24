import { Button } from '@/components/ui/button';
import {
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenu,
} from '@/components/ui/dropdown-menu';
import React from 'react';

type Props = {
	label?: string | null;
	title?: string;
	items: {
		label: string;
		onClick?: () => void;
		className?: string;
		hasSeparatorStart?: boolean;
		hasSeparatorEnd?: boolean;
	}[];
};

export default function DropdownButton({ label, title, items }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">{label}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>{title}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{items.map((item, i) => {
					return (
						<React.Fragment key={item.label}>
							{item.hasSeparatorStart && <DropdownMenuSeparator />}
							<DropdownMenuItem
								className={`cursor-pointer ${item.className}`}
								onClick={item.onClick ? item.onClick : () => {}}
							>
								{item.label}
							</DropdownMenuItem>
							{item.hasSeparatorEnd && <DropdownMenuSeparator />}
						</React.Fragment>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
