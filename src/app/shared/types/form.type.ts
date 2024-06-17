export type FieldErrors = Record<string, string[]>;

export type FormState = {
	fieldErrors?: FieldErrors;
	reqError?: string;
	fieldValues?: Record<string, string>;
};

export type ParsedFormData = {
	fieldErrors?: FieldErrors;
	fieldValues: Record<string, string>;
};
