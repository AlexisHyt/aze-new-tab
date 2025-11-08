import type React from "react";

interface Props {
	height?: string;
	width?: string;
	color?: string;
	margin?: string;
	className?: string;
	style?: React.CSSProperties;
}

export function VerticalSeparator({
	height = "100%",
	width = "1px",
	color = "#ccc",
	margin = "0 10px",
	className = "",
	style = {},
}: Props) {
	const separatorStyle = {
		display: "inline-block",
		height,
		width,
		backgroundColor: color,
		margin,
		...style,
	};

	return <div className={className} style={separatorStyle} />;
}
