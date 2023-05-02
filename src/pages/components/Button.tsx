import { iButton } from "@/interfaces/button.interface";

export default function Button(props: iButton) {
  const color = props.color ?? "blue"
  return (
    <button
      onClick={props.onClick}
      className={`
      bg-gradient-to-r from-${color}-400 to to-${color}-700
        text-white px-4 py-2 rounded-md
        `}
    >
      {props.children}
    </button>
  );
}
