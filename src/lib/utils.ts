import { LectiData } from '@/app/shared/types/auth.type';
import { ParsedFormData } from '@/app/shared/types/form.type';
import { Player } from '@/app/shared/types/user.type';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZodObject } from 'zod';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const parseFormData = (
	formData: FormData,
	schema: ZodObject<any>
): ParsedFormData | any => {
	const data = Object.fromEntries(formData.entries());
	const parsedData = schema.safeParse(data);

	if (parsedData.error) {
		return {
			fieldValues: data,
			fieldErrors: parsedData.error.flatten().fieldErrors,
		};
	}

	return { fieldValues: parsedData.data };
};
