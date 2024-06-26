import Link from 'next/link';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type Props = {
	links: {
		name: string;
		href: string;
	}[];
};

export function Breadcrumbs({ links }: Props) {
	return (
		<Breadcrumb className="">
			<BreadcrumbList className="justify-center">
				{links.map((link, index) => (
					<BreadcrumbItem key={index}>
						<BreadcrumbLink>
							<Link href={link.href} className="text-lg">
								{link.name}
							</Link>
						</BreadcrumbLink>
						{index < links.length - 1 && (
							<BreadcrumbSeparator>/</BreadcrumbSeparator>
						)}
					</BreadcrumbItem>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
