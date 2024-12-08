import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
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
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import React, { useCallback, useMemo } from "react";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  placeholder?: string;
  icon?: IconType | LucideIcon;
  disabled?: boolean;
  className?: string;
  error?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void> | void;
}

export default function CustomInput<T extends FieldValues>({
  name,
  className,
  error,
  placeholder,
  icon: Icon,
  disabled = false,
  label,
  control,
  type = "text",
  onChange,
}: Readonly<CustomInputProps<T>>) {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name, control });

  // Memoized change handler to prevent unnecessary re-renders
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Directly use react-hook-form's onChange
      field.onChange(e);

      // Call custom onChange if provided
      onChange?.(e);
    },
    [, onChange, field]
  );

  // Memoized input classes
  const inputClasses = useMemo(
    () =>
      cn(
        "w-full pr-10 rounded-md border-zinc-500 focus:ring-2 focus:ring-blue-500",
        !!Icon && "pl-10",
        className
      ),
    [Icon, className]
  );

  // Memoized icon classes
  const iconClasses = useMemo(
    () =>
      "absolute top-1/2 w-10 transform -translate-y-1/2 left-0 text-muted-foreground",
    []
  );

  return (
    <FormItem className="w-full">
      <FormLabel
        htmlFor={`${name}-input`}
        className="text-sm font-medium text-muted-foreground block mb-1"
      >
        {label}
      </FormLabel>

      <FormControl>
        <div className="relative w-full">
          {Icon && <Icon size={20} className={iconClasses} />}

          <Input
            id={`${name}-input`}
            type={type}
            placeholder={placeholder}
            {...field}
            value={field.value || ""} // Ensure controlled input
            onChange={handleChange}
            disabled={disabled}
            className={inputClasses}
            autoComplete="off" // Prevent browser autofill issues
          />
        </div>
      </FormControl>

      <FormMessage className="mt-1 text-xs text-red-600">
        {(error ?? fieldError?.message) && (
          <span>{error ?? fieldError?.message}</span>
        )}
      </FormMessage>
    </FormItem>
  );
}
