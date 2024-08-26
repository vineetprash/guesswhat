import { useRecoilValue } from "recoil";
import { DarkModeToggle } from "./DarkModeToggle";
import { isDarkMode } from "../states";

function Navbar() {
  const darkMode = useRecoilValue(isDarkMode);
  return (
    <div
      class={`${
        darkMode ? `bg-slate-600 border-slate-400` : `bg-yellow-400`
      } fixed top-0 left-0 w-full h-16 transition-all duration-500 opacity-75  border-b-2 p-4`}
    >
      <div className={`flex justify-center items-center w-full h-full m-0`}>
        <DarkModeToggle />
        <div className={`${darkMode ? `text-white` : `text-black`} text-xl`}>
          Guesswhat{" "}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
