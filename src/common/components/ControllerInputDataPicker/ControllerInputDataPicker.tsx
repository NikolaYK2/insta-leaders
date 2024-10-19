import React, { useEffect, useState } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { DataType, InputDataPicker, TextFieldProps } from '@nikolajk2/lib-insta-leaders'
import { useDebounce } from '@/common/hooks'

type ControllerInputDataPickerProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    Omit<TextFieldProps, 'id' | 'onChange'> & {
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
}: ControllerInputDataPickerProps<TFieldValues>) => {
  const {
    field: { onChange },
  } = useController({
    control,
    name,
  })

  // Локальное состояние для управления выбранной датой
  const [localSelected, setLocalSelected] = useState<DataType>(selected)

  // Используем хук useDebounce, чтобы уменьшить частоту обновлений выбранного значения в форме
  const debouncedSelected = useDebounce(localSelected, 500)

  // Синхронизируем локальное состояние с пропсами, когда они изменяются
  useEffect(() => {
    setLocalSelected(selected)
  }, [selected])

  // Обновляем значение в форме через дебаунс
  useEffect(() => {
    if (debouncedSelected) {
      onChange(debouncedSelected)
    }
  }, [debouncedSelected, onChange])

  // Обработчик изменения выбранной даты, который немедленно обновляет локальное состояние
  const handleSelect = (date: DataType) => {
    setLocalSelected(date)
  }

  return (
    <InputDataPicker
      selected={localSelected} // Мгновенное обновление UI с локальным состоянием
      onSelect={handleSelect}
      labelInput={label}
      error={error}
      disabled={disabled}
    />
  )
}
