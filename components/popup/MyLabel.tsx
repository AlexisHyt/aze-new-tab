interface Props {
	text: string;
	htmlFor?: string;
	size?: "lg" | "md" | "sm" | "xs";
}

export function MyLabel({ text, htmlFor, size = "sm" }: Props) {
	return (
		<label
			htmlFor={htmlFor}
			className={`block text-${size} font-semibold mb-1 text-gray-700`}
		>
			{text}
		</label>
	);
}
