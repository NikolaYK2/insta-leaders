import React from "react";
import {
  Control,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { Selector } from "@nikolajk2/lib-insta-leaders";
import { SelectProps } from "@radix-ui/react-select";

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  "rules" | "shouldUnregister"
> &
  SelectProps & {
    control: Control<T>;
    className?: string;
    placeholder?: string;
    label?: string;
    labelColor?: string;
  };

export const ControllerSelect = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  children,
  className,
  placeholder,
  ...props
}: Props<T>) => {
  const {
    field: { value, name: nameSelect, onChange },
  } = useController({ control, name, defaultValue });
  return (
    <Selector
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
      name={nameSelect}
      placeholder={placeholder}
      {...props}
      className={className}
    >
      {children}
    </Selector>
  );
};
