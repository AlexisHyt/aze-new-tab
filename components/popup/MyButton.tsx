interface Props {
	type: "button" | "reset" | "submit";
	text: string;
	bgColor?: string;
	hoverBgColor?: string;
}

export function MyButton({
	type,
	text,
	bgColor = null,
	hoverBgColor = null,
}: Props) {
	return (
		<button
			type={type}
			className={`px-2.5 py-2 border-none text-sm 
        cursor-pointer transition-colors 
        text-white whitespace-nowrap 
        ${bgColor ?? `bg-blue-500`} ${hoverBgColor || `hover:bg-blue-600`}`}
		>
			{text}
		</button>
	);
}
