import { iInput } from "@/interfaces/input.interface";

export default function Input(props: iInput) {
  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={props.value}
        required
        onKeyUp={props.handleKeyPress}
        onChange={(e) => props.changeValue?.(e.target.value)}
        placeholder={props.placeholder  || ''}
        className={`
            border border-purple-500 rounded-lg
            focus:outline-none bg-gray-100 px-4 py-2
            focus:bg-gray-200
            text-black
            `}
      />
    </div>
  );
}
