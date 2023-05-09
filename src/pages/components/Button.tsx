import { iButton } from "@/interfaces/button.interface";

export default function Button(props: iButton) {
  const color = props.color ?? "blue";
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`
      flex justify-center items-center
      bg-${color}-700
     text-white px-4 py-2 rounded-md
        ${props.className}
        `}
    >
      {props.children}
      <div className="ml-2">{props.icon}</div>
    </button>
  );
}
