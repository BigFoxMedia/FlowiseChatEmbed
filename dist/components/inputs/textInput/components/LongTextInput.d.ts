import { JSX } from 'solid-js/jsx-runtime';
type LongTextInput = {
    onInput: (value: string) => void;
    fontSize?: number;
    disabled?: boolean;
    rows?: number;
} & Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onInput'> & {
    ref?: (el: HTMLTextAreaElement) => void;
};
export declare const LongTextInput: (props: LongTextInput) => JSX.Element;
export {};
//# sourceMappingURL=LongTextInput.d.ts.map