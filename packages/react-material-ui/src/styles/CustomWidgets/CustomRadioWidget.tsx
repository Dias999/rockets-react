import React, { FC } from 'react';
import RadioGroup from '../../components/RadioGroup';
import { RadioOptions } from '../../components/RadioGroup/RadioGroup';
import { WidgetProps } from '@rjsf/core';

const CustomRadioWidget: FC<WidgetProps> = (props) => {
  const { id, schema, options, value, required, disabled, label, onChange } =
    props;
  const { enumOptions } = options;

  const _onChange = (_: any, value: any) => {
    onChange(schema.type == 'boolean' ? value !== 'false' : value);
  };

  const row = options ? options.inline : false;

  return (
    <>
      {label || schema.title}
      {required && ' *'}

      <RadioGroup
        id={id}
        options={enumOptions as RadioOptions[]}
        onChange={_onChange}
        row={row as boolean}
        value={value}
        disabled={disabled}
      />
    </>
  );
};

export default CustomRadioWidget;