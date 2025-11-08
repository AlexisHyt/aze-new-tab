interface Props {
  text: string;
}

export function PopupHelper({ text }: Props) {
  return <p className="text-gray-600">{text}</p>;
}
