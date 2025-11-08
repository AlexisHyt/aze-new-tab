interface Props {
  text: string;
}

export function InputHelper({ text }: Props) {
  return (
    <p
      className="text-gray-600"
    >
      {text}
    </p>
  );
}