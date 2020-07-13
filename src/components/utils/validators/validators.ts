export type FieldValidatorType = (value: string) => string | undefined;

export const required: FieldValidatorType = (value) => {
    if (value) return undefined;
    return "Field is required";
}

export const maxLengthCreator = (max: number): FieldValidatorType => {
    return (value) => {
        if (value.trim().length > max) return `Max length is ${max}`;
        return undefined;
    }
}
