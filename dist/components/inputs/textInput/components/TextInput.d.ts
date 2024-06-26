import { Setter } from 'solid-js';
import { FileEvent, UploadsConfig } from '@/components/Bot';
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
    setPreviews: Setter<Preview[]>;
    onMicrophoneClicked: () => void;
    handleFileChange: (event: FileEvent<HTMLInputElement>) => void;
    rows?: number;
};
export declare const TextInput: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=TextInput.d.ts.map