import { LongTextInput } from './LongTextInput';
import { isMobile } from '@/utils/isMobileSignal';
import { createSignal, createEffect, onMount, Setter } from 'solid-js';
import { SendButton } from '@/components/buttons/SendButton';
import { FileEvent, UploadsConfig } from '@/components/Bot';
import { ImageUploadButton } from '@/components/buttons/ImageUploadButton';
import { RecordAudioButton } from '@/components/buttons/RecordAudioButton';

type Preview = {
  id: string;
  url: string;
};

type Props = {
  placeholder?: string;
  backgroundColor?: string;
  textColor?: string;
  sendButtonColor?: string;
  defaultValue?: string;
  fontSize?: number;
  disabled?: boolean;
  onSubmit: (value: string) => void;
  uploadsConfig?: Partial<UploadsConfig>;
  // setPreviews: Setter<unknown[]>;
  setPreviews: Setter<Preview[]>;
  onMicrophoneClicked: () => void;
  handleFileChange: (event: FileEvent<HTMLInputElement>) => void;
  rows?: number;
};

const defaultBackgroundColor = '#ffffff';
const defaultTextColor = '#303235';

export const TextInput = (props: Props) => {
  const [inputValue, setInputValue] = createSignal(props.defaultValue ?? '');
  // let inputRef: HTMLInputElement | HTMLTextAreaElement | undefined;
  const [inputRef, setInputRef] = createSignal<HTMLTextAreaElement | null>(null);

  let fileUploadRef: HTMLInputElement | HTMLTextAreaElement | undefined;

  const handleInput = (inputValue: string) => setInputValue(inputValue);

  // const checkIfInputIsValid = () => inputValue() !== '' && inputRef?.reportValidity();
  const checkIfInputIsValid = () => inputValue() !== '' && inputRef()?.reportValidity();

  const submit = () => {
    if (checkIfInputIsValid()) props.onSubmit(inputValue());
    setInputValue('');
  };

  /* const submitWhenEnter = (e: KeyboardEvent) => {
    // Check if IME composition is in progress
    const isIMEComposition = e.isComposing || e.keyCode === 229;
    if (e.key === 'Enter' && !isIMEComposition) submit();
  };*/

  const submitWhenEnter = (e: KeyboardEvent) => {
    const isIMEComposition = e.isComposing || e.keyCode === 229;
    if (e.key === 'Enter' && !isIMEComposition) {
      if (e.shiftKey || e.altKey) {
        // Prevent the default Enter key action when combined with Shift or Alt
        e.preventDefault();

        // Add a line break at the current cursor position in the textarea
        const currentInputRef = inputRef();
        if (currentInputRef) {
          const start = currentInputRef.selectionStart;
          const end = currentInputRef.selectionEnd;
          const text = currentInputRef.value;
          const before = text.substring(0, start);
          const after = text.substring(end, text.length);
          setInputValue(before + '\n' + after);

          // Move the cursor after the inserted line break
          setTimeout(() => {
            currentInputRef.selectionStart = currentInputRef.selectionEnd = start + 1;
          }, 0);
        }
      } else {
        // If just Enter is pressed without Shift or Alt, submit the input
        submit();
      }
    }
  };

  const handleImageUploadClick = () => {
    if (fileUploadRef) fileUploadRef.click();
  };

  createEffect(() => {
    const currentInputRef = inputRef(); // Get the current value of the ref (the DOM element)
    if (!props.disabled && !isMobile() && currentInputRef) {
      currentInputRef.focus();
    }
  });

  onMount(() => {
    const currentInputRef = inputRef(); // Get the current value of the ref (the DOM element)
    if (!isMobile() && currentInputRef) {
      currentInputRef.focus();
    }
  });

  const handleFileChange = (event: FileEvent<HTMLInputElement>) => {
    props.handleFileChange(event);
    // 👇️ reset file input
    if (event.target) event.target.value = '';
  };

  return (
    <div
      class={'flex items-center justify-between chatbot-input border border-[#eeeeee]'}
      data-testid="input"
      style={{
        margin: 'auto',
        'background-color': props.backgroundColor ?? defaultBackgroundColor,
        color: props.textColor ?? defaultTextColor,
      }}
      onKeyDown={submitWhenEnter}
    >
      {props.uploadsConfig?.isImageUploadAllowed ? (
        <>
          <ImageUploadButton buttonColor={props.sendButtonColor} type="button" class="m-0" on:click={handleImageUploadClick}>
            <span style={{ 'font-family': 'Poppins, sans-serif' }}>Image Upload</span>
          </ImageUploadButton>
          <input style={{ display: 'none' }} multiple ref={fileUploadRef as HTMLInputElement} type="file" onChange={handleFileChange} />
        </>
      ) : null}
      <LongTextInput
        // ref={inputRef as HTMLInputElement}
        ref={(el) => setInputRef(el)}
        onInput={handleInput}
        value={inputValue()}
        fontSize={props.fontSize}
        disabled={props.disabled}
        placeholder={props.placeholder ?? 'Type your question'}
        rows={props.rows ?? 1}
      />
      {props.uploadsConfig?.isSpeechToTextEnabled ? (
        <RecordAudioButton buttonColor={props.sendButtonColor} type="button" class="m-0 start-recording-button" on:click={props.onMicrophoneClicked}>
          <span style={{ 'font-family': 'Poppins, sans-serif' }}>Record Audio</span>
        </RecordAudioButton>
      ) : null}
      <SendButton
        sendButtonColor={props.sendButtonColor}
        type="button"
        isDisabled={props.disabled || inputValue() === ''}
        class="m-0"
        on:click={submit}
      >
        <span style={{ 'font-family': 'Poppins, sans-serif' }}>Send</span>
      </SendButton>
    </div>
  );
};
