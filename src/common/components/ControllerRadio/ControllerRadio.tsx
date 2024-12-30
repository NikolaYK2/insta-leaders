import React from "react";
import {
  Control,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import {
  RadioGroupComponent,
  RadioGroupPropsType,
} from "@nikolajk2/lib-insta-leaders";

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  "rules" | "shouldUnregister"
> &
  RadioGroupPropsType & {
    control: Control<T>;
  };
export const ControllerRadio = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  children,
  ...props
}: Props<T>) => {
  const {
    field: { value, name: nameRadio, onChange },
  } = useController({ control, name, defaultValue });
  return (
    <RadioGroupComponent
      {...props}
      value={value}
      name={nameRadio}
      onValueChange={onChange}
    >
      {children}
    </RadioGroupComponent>
  );
};
