import InfoTab from "../components/InfoTab";
import { Canvas } from "../components/Canvas";
import Navbar from "../components/Navbar";
import { useRecoilValue } from "recoil";
import { isDarkMode } from "../states";
import { useEffect } from "preact/hooks";
import { useSocket } from "../states/socket";
import { lazy } from "preact/compat";

const game = lazy(() => import("../game_loop"));

function Layout() {
  const darkMode = useRecoilValue(isDarkMode);
  const socket = useSocket();

  useEffect(() => {
    socket?.on("join-ack", () => {
      console.log("Successfully joined the room in backend");
    });
  }, []);
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
