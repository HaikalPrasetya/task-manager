import { ClassValue } from "clsx";

import { cn } from "@/lib/utils";
import { SetStateAction } from "react";

type Props = {
  className?: ClassValue;
  value: string;
  setValue: React.Dispatch<
    SetStateAction<{
      email: string;
      password: string;
      confirmPassword: string | undefined;
    }>
  >;
  placeholder?: string;
  name: string;
  type: string;
};

export default function AuthInput({
  className,
  value,
  setValue,
  placeholder,
  name,
  type,
}: Props) {
  return (
    <input
      className={cn(
        "rounded-base bg-white border-2 border-border dark:border-darkBorder p-[10px] font-base ring-offset-white focus-visible:outline-none focus:ring-1 focus:ring-black outline-none",
        className
      )}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      }}
      aria-label={placeholder}
    />
  );
}
