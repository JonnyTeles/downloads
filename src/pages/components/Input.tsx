import { iInput } from "@/interfaces/input.interface";

export default function Input(props: iInput) {
  return (
    <div className="flex flex-col">
      <label className="mb-2">{props.texto}</label>
      <input
        type="text"
        value={props.value}
        required
        onChange={(e) => props.changeValue?.(e.target.value)}
        className={`
            border border-purple-500 rounded-lg
            focus:outline-none bg-gray-100 px-4 py-2
            text-black
            `}
      />
    </div>
  );
}
