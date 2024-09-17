import React from 'react'
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Selector } from '@nikolajk2/lib-insta-leaders'
import { SelectProps } from '@radix-ui/react-select'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'shouldUnregister'> &
  SelectProps & {
    control: Control<T>
  }

export const ControllerSelect = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  ...props
}: Props<T>) => {
  const {
    field: { value, name, onChange },
  } = useController({ control, name, defaultValue })
  return <Selector value={value} onValueChange={onChange} name={name} {...props} />
}
