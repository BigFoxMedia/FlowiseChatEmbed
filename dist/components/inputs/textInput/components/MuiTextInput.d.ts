import { JSX } from 'solid-js/jsx-runtime';
type ShortTextInputProps = {
    onInput: (value: string) => void;
    fontSize?: number;
    disabled?: boolean;
    rows?: number;
} & Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onInput'> & {
    ref?: (el: HTMLTextAreaElement) => void;
};
export declare const ShortTextInput: (props: ShortTextInputProps) => JSX.Element;
export {};
//# sourceMappingURL=MuiTextInput.d.ts.map