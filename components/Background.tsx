import { useStorage } from "@plasmohq/storage/hook";

export function Background() {
  const [background, _] = useStorage("background", "");

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
