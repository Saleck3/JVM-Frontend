export type FieldErrors = Record<string, string[]>;

export type FormErrors = {
	fieldErrors?: FieldErrors;
	reqError?: string;
};
