import { Textarea, TextareaProps } from "@nikolajk2/lib-insta-leaders";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

export type FormTextareaProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextareaProps, "onBlur" | "onChange" | "value">;

/**
 * A controlled Textarea component integrated with react-hook-form.
 * @example
 * // Example usage of FormTextarea component
 * <FormTextarea
 *     control={control}
 *     name={"comments"}
 *     placeholder={"Leave your comments here"}
 * />
 */
export const FormTextarea = <T extends FieldValues>({
  control,
  name,
  disabled,
  ...restProps
}: FormTextareaProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    disabled,
  });
  return <Textarea {...restProps} {...field} errorMessage={error?.message} />;
};
