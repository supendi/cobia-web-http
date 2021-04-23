/**
 * Represents a single field error
 */
export interface FieldError {
    code: string;
    fieldName: string;
    fieldValue: any;
    rule: string;
    message: string;
    subErrors: RowFieldError[];
}
/**
 * Represents a field error that has a row index
 */
export interface RowFieldError extends FieldError {
    index: number;
}
/**
 * Represents the errors from server response
 */
export interface ServerError {
    message: string,
    errors: FieldError[]
}
