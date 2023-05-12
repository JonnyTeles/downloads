import DarkMode from "@/hooks/darkMode";
import { iInput } from "@/interfaces/input.interface";
import { useState, useEffect } from "react";

export default function Input(props: iInput) {
  const { darkMode } = DarkMode();
  const [style, setStyle] = useState("");
  useEffect(() => {
    setStyle(
      darkMode
        ? "  focus:bg-gray-900 focus:outline-none bg-gray-800 px-4 py-2 text-white"
        : " focus:outline-none bg-gray-100 px-4 py-2 focus:bg-gray-200 text-black"
    );
  }, [darkMode]);
  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={props.value}
        required
        onKeyUp={props.handleKeyPress}
        onChange={(e) => props.changeValue?.(e.target.value)}
        placeholder={props.placeholder || ""}
        className={`
            border border-purple-500 rounded-lg
           ${style}
            `}
      />
    </div>
  );
}
