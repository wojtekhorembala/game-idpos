import { catchError, Observable, OperatorFunction, throwError } from "rxjs";

export function handleError<T>(): OperatorFunction<T, T> {
    return (source: Observable<T>) => source.pipe(
        catchError(error => throwError(() => `Error`)),
    );
};
