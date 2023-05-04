import { iSpinner } from "@/interfaces/spinner.interface";
import { CSSProperties } from "react";
import { MoonLoader } from "react-spinners";

export default function Spinner(props: iSpinner) {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: props.color,
  };

  return (
    <div className="sweet-loading">
      <MoonLoader
        color={props.color}
        cssOverride={override}
        size={120}
        speedMultiplier={0.7}
      />
      <div className="flex justify-center">
        <p className="ml-2 text-2xl font-bold text-purple-600"> {props.text} </p>
      </div>
    </div>
  );
}
