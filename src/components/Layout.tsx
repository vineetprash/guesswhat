import InfoTab from "./InfoTab";
import { Canvas } from "./Canvas";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div
      className={`flex dark:bg-black bg-white transition-all w-full min-h-screen m-0 overflow-hidden duration-500 `}
    >
      <Navbar />
      <div
        class={`flex justify-end items-center flex-col-reverse sm:items-start sm:justify-center sm:flex-row w-full min-h-screen pt-16 m-0 overflow-hidden`}
      >
        <InfoTab />
        <Canvas />
      </div>
    </div>
  );
}

export default Layout;
