import React from "react";

interface Props {
  height?: string;
  width?: string;
  color?: string;
  margin?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function HorizontalSeparator({
  height = '1px',
  width = '100%',
  color = '#ccc',
  margin = '10px 0',
  className = '',
  style = {}
}: Props) {
  const separatorStyle = {
    display: 'block',
    height,
    width,
    backgroundColor: color,
    margin,
    ...style
  };

  return <div className={className} style={separatorStyle} />;
}