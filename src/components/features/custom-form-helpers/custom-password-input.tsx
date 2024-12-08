import React from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

interface CustomPasswordInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  icon: IconType | LucideIcon;
  showPassword?: boolean;
}

const CustomPasswordInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  className,
  error,
  onChange,
  icon: Icon,
  showPassword = false,
}: CustomPasswordInputProps<T>) => {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
    // Remove the defaultValue to let React Hook Form handle it
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Always call field.onChange first to update React Hook Form's internal state
    field.onChange(e);
    // Then call any additional onChange prop if provided
    onChange?.(e);
  };

  return (
    <FormItem className="flex flex-col gap-x-0">
      <FormLabel
        htmlFor={`${name}-input`}
        className="text-sm font-medium m-0 -mb-1.5 text-muted-foreground"
      >
        {label}
      </FormLabel>

      <FormControl>
        <div className="relative">
          {Icon && (
            <Icon
              size={20}
              className="absolute top-1/2 transform -translate-y-1/2 left-3 text-muted-foreground"
            />
          )}
          <Input
            id={`${name}-input`}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            // Spread the field props to ensure controlled input
            {...field}
            // Explicitly set value to prevent uncontrolled to controlled warning
            value={field.value ?? ""}
            disabled={disabled}
            className={cn(
              "pr-10 rounded-none border-zinc-500",
              !!Icon && "pl-10",
              className
            )}
            // Use the custom change handler
            onChange={handleChange}
          />
        </div>
      </FormControl>
      <FormMessage>
        {(error || fieldError?.message) && (
          <span className="text-xs text-red-600">
            {error || fieldError?.message}
          </span>
        )}
      </FormMessage>
    </FormItem>
  );
};
export default CustomPasswordInput;
