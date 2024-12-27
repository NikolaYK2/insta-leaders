import React, {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  forwardRef,
  MouseEvent,
} from "react";

/**
 * Component for загрузки Image on app :)
 */
type Props = {
  handleFileChange: ChangeEventHandler<HTMLInputElement> | undefined;
} & ComponentPropsWithoutRef<"input">;
export const ImageUploader = forwardRef<HTMLInputElement, Props>(
  ({ handleFileChange, ...props }, ref) => {
    const handleClick = (e: MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
    };
    return (
      <input
        ref={ref}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
        onClick={handleClick}
        {...props}
      />
    );
  },
);
ImageUploader.displayName = "ImageUploader";
