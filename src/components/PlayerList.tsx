import { useRecoilValue } from "recoil";
import { PlayerType } from "../types";
import { isDarkMode } from "../states";

function PlayerList({ playerList }: { playerList: PlayerType[] }) {
  const darkMode = useRecoilValue(isDarkMode);
  return (
    <div
      className={`grid grid-cols-3 lg:flex-col lg:grid-cols-1 justify-center w-fit`}
    >
      {playerList.map((item, _index) => (
        <div
          className={`flex p-1 py-4 justify-center text-lg gap-2 ${
            darkMode ? `hover:bg-slate-800 text-white` : `hover:bg-yellow-400`
          } cursor-pointer`}
          key={item.id}
        >
          {item.name} :<div class={`text-slate-500`}>{item.score}</div>
        </div>
      ))}
    </div>
  );
}

export default PlayerList;
