import React from "react";

interface Props {
	name: string;
	placeholder?: string;
	value?: string;
	rows?: number;
}

export function MyTextarea({ name, placeholder, value, rows = 3 }: Props) {
	return (
		<textarea
			name={name}
			placeholder={placeholder}
			rows={rows}
			className={`p-2 border-none text-sm w-full ring-1 ring-gray-300 focus:ring-blue-500`}
		>
			{value}
		</textarea>
	);
}
