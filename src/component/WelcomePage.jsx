import { useRef } from "react";
import welcomeIcon from "../assets/welcome.svg";

export default function WelcomePage({ setName }) {
  const name = useRef();

  function handleSubmit() {
    name.current.value.trim() !== ""
      ? setName(name.current.value)
      : name.current.focus();
  }

  return (
    <div className="relative min-h-screen text-[#373737]">
      <div className="ml-36 w-[600px] text-center pt-32">
        <div className="text-5xl font-bold">Welcome to the Quiz!</div>
        <div className="mt-9 text-[18px] text-[#e18300]">
          Get ready! You'll answer <strong>multiple-choice questions</strong> to{" "}
          <br /> test your <strong>React.js</strong> knowledge. Pick the best
          option for each one.
        </div>
        <div className="mt-16 font-bold text-[17px] text-[#373737]">
          ENTER YOUR NAME
        </div>
        <input
          ref={name}
          className="bg-[#fff8f2] mt-3 text-xl py-3 px-6 rounded-md w-64 border border-[#ccc] focus:border-[#f3b040] focus:ring-2 focus:ring-[#f3b040] focus:outline-none"
        />
        <br />
        <button
          onClick={handleSubmit}
          className="bg-[#e18300] hover:bg-[#f3b040] tracking-wider text-white px-4 py-2 rounded mt-6 font-semibold">
          SUBMIT
        </button>
      </div>
      <div className="absolute bottom-0 right-0">
        <img src={welcomeIcon} width={600} />
      </div>
    </div>
  );
}
