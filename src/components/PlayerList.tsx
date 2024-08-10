import { PlayerType } from "../types";

function PlayerList({ playerList }: { playerList: PlayerType[] }) {
  return (
    <div>
      {playerList.map((item, _index) => (
        <div className={`flex p-4`} key={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default PlayerList;
