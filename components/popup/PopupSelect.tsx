interface Props {
  id: string;
  name: string;
  options: Array<{ label: string; value: string }>;
  selectedValue?: string;
}

export function PopupSelect({ id, name, options, selectedValue }: Props) {
  return (
    <select
      id={id}
      name={name}
      className={`p-2 border-none text-sm w-full ring-1 ring-gray-300 focus:ring-blue-500`}
    >
      {options.map((option) => (
        <option
          key={option.label}
          value={option.value}
          selected={option.value === selectedValue}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
