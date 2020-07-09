export interface ErrorModel {
    errors: Error[];
}

export interface Error {
    message: string;
    code:    number;
}
