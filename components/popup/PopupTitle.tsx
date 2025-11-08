interface Props {
  text: string;
}

export function PopupTitle({ text }: Props) {
  return <h2 className="block text-xl font-bold mb-1 text-black">{text}</h2>;
}
