'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenu,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import React from 'react';
import { logout } from '../actions/auth';

type Props = {
	label?: string | null;
	title?: string;
	items: {
		label: string;
		href: string;
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
							<DropdownMenuItem className={`cursor-pointer ${item.className}`}>
								<Link href={item.href}>{item.label}</Link>
							</DropdownMenuItem>
							{item.hasSeparatorEnd && <DropdownMenuSeparator />}
						</React.Fragment>
					);
				})}
				<DropdownMenuItem
					className="cursor-pointer text-red-600"
					onClick={() => logout()}
				>
					Cerrar sesión
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
