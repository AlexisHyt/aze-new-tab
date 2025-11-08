import React from "react";

interface Props {
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function MyInputFile({ name, value, onChange }: Props) {
  return (
    <input
      type={"file"}
      className={`p-2 border-none text-sm w-full ring-1 ring-gray-300 focus:ring-blue-500`}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}