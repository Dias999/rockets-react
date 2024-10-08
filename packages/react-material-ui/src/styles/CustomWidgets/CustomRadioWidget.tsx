import React from 'react';
import { RadioGroup, RadioOptions } from '../../components/RadioGroup';
import { WidgetProps } from '@rjsf/utils';

const CustomRadioWidget = (props: WidgetProps) => {
  const { id, schema, options, value, required, disabled, label, onChange } =
    props;
  const { enumOptions } = options;

  const _onChange = (_: any, value: any) => {
    onChange(schema.type == 'boolean' ? value !== 'false' : value);
  };

  const row = options ? options.inline : false;

  return (
    <RadioGroup
      id={id}
      options={enumOptions as RadioOptions[]}
      onChange={_onChange}
      row={row as boolean}
      value={value}
      disabled={disabled}
      required={required}
      label={label}
    />
  );
};

export default CustomRadioWidget;
