import { useRecoilValue } from "recoil";
import InfoTab from "./InfoTab";
import MainCanvas from "./MainCanvas";
import { Canvas } from "./Canvas";
import { isDarkMode } from "../states";
import Navbar from "./Navbar";

function Layout() {
  const darkMode = useRecoilValue(isDarkMode);
  return (
    <div
      className={`flex dark:bg-black bg-white w-full min-h-screen m-0 overflow-hidden ${
        darkMode ? `dark` : ``
      }`}
    >
      <Navbar />
      <div class={`flex w-full min-h-screen pt-16 m-0 overflow-hidden`}>
        <InfoTab />
        <Canvas />
      </div>
    </div>
  );
}

export default Layout;
