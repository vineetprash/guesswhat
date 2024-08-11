import { atom, RecoilState } from "recoil";
import { PlayerType } from "../types";

export const isDarkMode = atom({
  key: "isDarkMode",
  default: true,
});

const list: PlayerType[] = [
  { id: "1", name: "Player 1", score: 25 },
  { id: "2", name: "Player 2", score: 30 },
  { id: "3", name: "Player 3", score: 35 },
  { id: "3", name: "Player 4", score: 35 },
  { id: "3", name: "Player 5", score: 35 },
  { id: "3", name: "Player 6", score: 35 },
  { id: "3", name: "Player 7", score: 35 },
  { id: "3", name: "Player 8", score: 35 },
];
export const players: RecoilState<PlayerType[]> = atom({
  key: "players",
  default: list,
});

export const roomCode = atom({
  key: "roomCode",
  default: "0000",
});

export const clientConfig = atom({
  key: "clientConfig",
  default: {
    strokeWidth: 1,
    strokeStyle: "#ffffff",
    backgroundColor: "#000000",
    erased: false,
    downloading: false,
  },
});

export const socketConfigAtom = atom({
  key: "socketConfig",
  default: {
    roomCode: "0000",
  },
});
