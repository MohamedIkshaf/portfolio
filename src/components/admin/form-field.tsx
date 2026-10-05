import React from "react";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  error,
  helpText,
  required,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={htmlFor}
          className="block text-xs font-semibold text-slate-700"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {helpText && (
          <span className="text-[10px] text-slate-400">{helpText}</span>
        )}
      </div>

      {children}

      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}
