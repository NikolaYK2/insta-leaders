import { ComponentPropsWithoutRef } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import { Checkbox } from '@nikolajk2/lib-insta-leaders'

type Props<T extends FieldValues> = ComponentPropsWithoutRef<typeof Checkbox> & {
  control: Control<T>
  name: FieldPath<T>
}

export const FormCheckbox = <T extends FieldValues>({ control, name, ...props }: Props<T>) => {
  const {
    field: { onChange, value, ...field },
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return <Checkbox {...props} onCheckedChange={onChange} checked={value} {...field} />
}
