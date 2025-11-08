import { useState } from "react";

interface Props {
  onLabel?: string;
  offLabel?: string;
  initialValue?: boolean;
  onChange?: (value: boolean) => void;
}

export function PopupSwitch({
  onLabel = "On",
  offLabel = "Off",
  initialValue = false,
  onChange,
}: Props) {
  const [isOn, setIsOn] = useState(initialValue);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm ${isOn ? "text-gray-400" : "text-gray-800"}`}>
        {offLabel}
      </span>
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isOn ? "bg-blue-500" : "bg-gray-200"
        }`}
        onClick={handleToggle}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isOn ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <span className={`text-sm ${isOn ? "text-gray-800" : "text-gray-400"}`}>
        {onLabel}
      </span>
    </div>
  );
}
