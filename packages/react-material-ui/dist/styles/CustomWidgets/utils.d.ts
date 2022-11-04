import { WidgetProps } from '@rjsf/core';
export declare const filterProps: (props: WidgetProps) => {
    id: string;
    value: any;
    required: boolean;
    disabled: boolean;
    readonly: boolean;
    autofocus: boolean;
    placeholder: string;
    onChange: (value: any) => void;
    label: string;
    maxLength: any;
    type: any;
};
