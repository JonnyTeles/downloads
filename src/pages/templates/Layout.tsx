import { iLayout } from "@/interfaces/layout.interface";
import Title from "../components/Title";

export default function Layout(props: iLayout) {
  return (
    <div
      className={`
      flex flex-col w-2/3
      bg-white text-gray-800
      rounded-md
      `}
    >
      <Title> {props.title} </Title>
      <div className="p-6 ">{props.children}</div>
    </div>
  );
}
