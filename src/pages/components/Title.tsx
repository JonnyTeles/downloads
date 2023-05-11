import Link from "next/link";
import Button from "../components/Button";
import Icon from "../components/Icons";
import AppBar from "./AppBar";

export default function Title(props: any) {
  return (
    <div className="flex flex-col">
      <AppBar/>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="px-5 py-2 text-2xl font-bold text-purple-700">
            {props.children}
          </h1>
          <h3 className="px-5 text-purple-500 mb-2">
            Em fase de desenvolvimento...{" "}
          </h3>
          <h3 className="px-5 text-purple-500 mb-2">
            {" "}
            <span className="font-bold">OBS:</span> Não tem responsividade para
            mobile ainda
          </h3>
        </div>
      </div>
      <hr className="border-2 border-purple-500" />
    </div>
  );
}
