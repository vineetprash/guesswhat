import InfoTab from "./InfoTab";
import { Canvas } from "./Canvas";
import Navbar from "./Navbar";
import { useRecoilValue } from "recoil";
import { isDarkMode } from "../states";

function Layout() {
  const darkMode = useRecoilValue(isDarkMode);
  return (
    <div
      className={`flex ${
        darkMode ? `bg-black` : `bg-white`
      } transition-all w-full min-h-screen m-0  duration-500 overflow-x-hidden `}
    >
      <Navbar />
      <div
        class={`flex justify-end items-center flex-col-reverse lg:items-start lg:justify-center lg:flex-row w-full min-h-screen pt-16 m-0 `}
      >
        <InfoTab />
        <Canvas />
      </div>
    </div>
  );
}

export default Layout;
