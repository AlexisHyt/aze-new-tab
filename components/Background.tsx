import { useStorage } from "@plasmohq/storage/hook";
import { BACKGROUND_KEY__DEFAULT } from "~scripts/defaultValues";
import { BACKGROUND_KEY } from "~scripts/storage";

export function Background() {
  const [background, _] = useStorage(BACKGROUND_KEY, BACKGROUND_KEY__DEFAULT);

  return (
    <div
      className="fixed inset-0 -z-50"
      style={{
        backgroundImage: background ? `url(${background})` : "none",
        backgroundColor: background ? "transparent" : "white",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}
