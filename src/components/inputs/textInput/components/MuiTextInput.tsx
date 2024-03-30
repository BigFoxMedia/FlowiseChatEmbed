import { splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

type ShortTextInputProps = {
  onInput: (value: string) => void;
  fontSize?: number;
  disabled?: boolean;
  rows?: number;
} & Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onInput'> & {
    ref?: (el: HTMLTextAreaElement) => void;
  };

export const ShortTextInput = (props: ShortTextInputProps) => {
  const [local, others] = splitProps(props, ['onInput', 'fontSize', 'disabled', 'rows', 'ref']);

  return (
    <textarea
      ref={props.ref}
      class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100"
      disabled={props.disabled}
      style={{ 'font-size': props.fontSize ? `${props.fontSize}px` : '16px' }}
      onInput={(e) => local.onInput(e.currentTarget.value)}
      rows={props.rows}
      {...others}
    />
  );
};
