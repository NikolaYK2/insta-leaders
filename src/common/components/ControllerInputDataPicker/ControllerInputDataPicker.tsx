import React from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { DataType, InputDataPicker, TextFieldProps } from '@nikolajk2/lib-insta-leaders'
import { useDebounceValueHandler } from '@/common/hooks'

type ControllerInputDataPickerProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    Omit<TextFieldProps, 'id' | 'onChange' | 'value'> & {
      error?: React.ReactNode
      selected: DataType
      label: string
    }

export const ControllerInputDataPicker = <TFieldValues extends FieldValues>({
  control,
  name,
  selected,
  label,
  error,
  disabled,
  defaultValue,
}: ControllerInputDataPickerProps<TFieldValues>) => {
  const {
    field: { onChange },
  } = useController({
    control,
    name,
  })

  const { valueDebounce, handleSelect } = useDebounceValueHandler({
    initialValue: selected,
    onChange,
    delay: 500,
  })

  return (
    <InputDataPicker
      selected={valueDebounce} // Мгновенное обновление UI с локальным состоянием
      onSelect={handleSelect}
      labelInput={label}
      defaultValue={defaultValue}
      error={error}
      disabled={disabled}
    />
  )
}
