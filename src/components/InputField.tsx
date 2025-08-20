import React, { useRef } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  clearable?: boolean;
  showPasswordToggle?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  value = "",
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable,
  showPasswordToggle,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputType =
    showPasswordToggle && type === "password"
      ? showPassword ? "text" : "password"
      : type;

  const sizeClass =
    size === "sm"
      ? "py-1 px-2 text-sm"
      : size === "lg"
      ? "py-3 px-4 text-lg"
      : "py-2 px-3 text-base";

  const variantClass =
    variant === "filled"
      ? "bg-gray-200 border border-gray-300"
      : variant === "ghost"
      ? "bg-transparent border border-gray-300"
      : "bg-white border border-gray-400";

  const invalidClass = invalid ? "border-red-500" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-medium mb-1">{label}</label>}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`rounded w-full transition ${sizeClass} ${variantClass} ${invalidClass} ${disabledClass} pr-16`}
        />
        {loading && (
          <span className="absolute right-2 animate-spin text-gray-400">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.2"/>
              <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4"/>
            </svg>
          </span>
        )}
        {clearable && value && !disabled && !loading && (
          <button
            type="button"
            className="absolute right-8 text-gray-400 hover:text-gray-600"
            onClick={() => {
              if (onChange) onChange({ target: { value: "" } } as any);
              inputRef.current?.focus();
            }}
            tabIndex={-1}
            aria-label="Clear input"
          >
            ×
          </button>
        )}
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            className="absolute right-14 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {helperText && !invalid && (
        <span className="text-xs text-gray-500">{helperText}</span>
      )}
      {invalid && errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};