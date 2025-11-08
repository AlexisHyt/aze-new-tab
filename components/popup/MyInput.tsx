import React from "react";

interface Props {
  type: "text" | "number" | "url" | "file";
  name: string;
  id?: string;
  placeholder?: string;
  value?: string;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function MyInput({ type, id, name, placeholder, value, accept, onChange }: Props) {
  return (
    <input
      type={type}
      className={`p-2 border-none text-sm w-full ring-1 ring-gray-300 focus:ring-blue-500`}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      accept={accept}
      onChange={onChange}
    />
  );
}