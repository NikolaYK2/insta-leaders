import React from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { DataType, InputDataPicker, TextFieldProps } from '@nikolajk2/lib-insta-leaders'

type ControllerInputDataPickerProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    Omit<TextFieldProps, 'id' | 'onChange'> & {
      selected: DataType
      label: string
    }

export const ControllerInputDataPicker = <TFieldValues extends FieldValues>({
  control,
  name,
  selected,
  label,
}: ControllerInputDataPickerProps<TFieldValues>) => {
  const {
    field: { onChange },
  } = useController({
    control,
    name,
  })
  return <InputDataPicker selected={selected} onSelect={onChange} labelInput={label} />
}