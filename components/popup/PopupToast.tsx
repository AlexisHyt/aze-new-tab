import { useStorage } from "@plasmohq/storage/hook";
import { useEffect, useState } from "react";
import {
  LuCircleAlert,
  LuCircleCheck,
  LuCirclePlay,
  LuCircleX,
} from "react-icons/lu";

export interface ToastData {
  type: "export" | "success" | "error" | "warning" | "info" | null;
  text: string | null;
}

export function PopupToast() {
  const [toastData, setToastData] = useStorage("toastData", {} as ToastData);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  const getClassesAndIcon = (type: string) => {
    switch (type) {
      case "export":
        return {
          classes: "bg-purple-500 border-b-2 border-purple-700",
          icon: <LuCirclePlay className={`size-4`} />,
        };
      case "success":
        return {
          classes: "bg-green-500 border-b-2 border-green-700",
          icon: <LuCircleCheck className={`size-4`} />,
        };
      case "error":
        return {
          classes: "bg-red-500 border-b-2 border-red-700",
          icon: <LuCircleX className={`size-4`} />,
        };
      case "warning":
        return {
          classes: "bg-yellow-500 border-b-2 border-yellow-700",
          icon: <LuCircleAlert className={`size-4`} />,
        };
      default:
        return {
          classes: "bg-blue-500 border-b-2 border-blue-700",
          icon: <LuCirclePlay className={`size-4`} />,
        };
    }
  };

  useEffect(() => {
    if (toastData.text) {
      setText(toastData.text);
      setType(toastData.type);

      setShow(true);
      setToastData({ text: null, type: null });

      setTimeout(() => {
        setShow(false);
      }, 4000);
    }
  }, [toastData, setToastData]);

  return (
    <div
      className={`fixed top-5 right-5 flex items-center gap-4 p-4 rounded shadow-lg ${getClassesAndIcon(type).classes} text-white text-md font-semibold transition-opacity duration-300 ${show ? "opacity-1" : "opacity-0"}`}
    >
      {getClassesAndIcon(type).icon}
      {text}
    </div>
  );
}
