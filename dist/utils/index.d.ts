export declare const isNotDefined: <T>(value: T | undefined | null) => value is null | undefined;
export declare const isDefined: <T>(value: T | undefined | null) => value is NonNullable<T>;
export declare const isEmpty: (value: string | undefined | null) => value is undefined;
export declare const isNotEmpty: (value: string | undefined | null) => value is string;
export declare const sendRequest: <ResponseData>(params: {
    url: string;
    method: string;
    body?: Record<string, unknown> | FormData;
    type?: string;
} | string) => Promise<{
    data?: ResponseData;
    error?: Error;
}>;
//# sourceMappingURL=index.d.ts.map