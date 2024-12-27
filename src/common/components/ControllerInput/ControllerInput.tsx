import { FieldValues, UseControllerProps, useController, Control } from 'react-hook-form'
import { ComponentPropsWithoutRef } from 'react'
import { TextField, TextFieldProps } from '@nikolajk2/lib-insta-leaders'

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'shouldUnregister' | 'rules' | 'control' | 'defaultValue'
> &
  Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'value' | 'onBlur' | 'onTouch'> &
  TextFieldProps & {
    control: Control<T>
  }

export function FormInput<T extends FieldValues>({
  control,
  name,
  disabled,
  ...restProps
}: Props<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    disabled,
  })

  return <TextField errorMessage={error?.message} {...field} {...restProps} />
}
