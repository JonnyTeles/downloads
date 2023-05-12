import { iLayout } from "@/interfaces/layout.interface";
import Title from "../components/Title";
import DarkMode from "./../../hooks/darkMode";
import { useState, useEffect } from "react";
import Background from "./Background";
import Button from "../components/Button";
import Icon from "../components/Icons";

export default function Layout(props: iLayout) {
  const { darkMode, handleDarkMode } = DarkMode();
  const [background, setBackground] = useState(
    "bg-gradient-to-r from-blue-500 to-blue-800"
  );
  useEffect(() => {
    setBackground(
      darkMode
        ? "bg-gradient-to-r from-blue-900 to-blue-950"
        : "bg-gradient-to-r from-blue-500 to-blue-800"
    );
  }, [darkMode]);

  const [layout, setLayout] = useState("bg-white text-gray-800");
  useEffect(() => {
    setLayout(
      darkMode ? "bg-gray-900 text-gray-800" : " bg-white text-gray-800"
    );
  }, [darkMode]);

  const [buttonIcon, setButtonIcon] = useState(Icon())
  useEffect(() => {
    setButtonIcon(
      darkMode ? Icon("sun") : Icon("moon")
    );
  }, [darkMode]);

  const [buttonText, setbuttonText] = useState("Modo Escuro");
  useEffect(() => {
    setbuttonText(darkMode ? "Modo Claro" : "Modo Escuro");
  }, [darkMode]);

  return (
    <Background
      className={`flex justify-center items-center min-h-screen
      text-white h-auto
      ${background}
      `}
    >
      <div
        className={`
      flex flex-col w-2/3
      rounded-md
      ${layout}
      `}
      >
        <Title> {props.title} </Title>
        <div className="p-6 ">{props.children}</div>
      </div>
      <div className="fixed top-0 right-0 m-4">
        <Button
          onClick={handleDarkMode}
          color="purple"
          className="hover:bg-purple-500"
          icon={buttonIcon}
        >
          {buttonText}
        </Button>
      </div>
    </Background>
  );
}
