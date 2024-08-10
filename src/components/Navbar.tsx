import { DarkModeToggle } from "./DarkModeToggle";

function Navbar() {
  return (
    <div
      class={`fixed top-0 left-0 w-full h-16 dark:bg-slate-600 bg-yellow-300 opacity-75  border-b-2 p-4`}
    >
      <div className={`flex justify-center items-center w-full h-full m-0`}>
        <DarkModeToggle />
        <div className={`text-xl dark:text-white text-black `}>Guesswhat </div>
      </div>
    </div>
  );
}

export default Navbar;
