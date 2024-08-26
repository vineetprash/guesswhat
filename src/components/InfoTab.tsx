import { useRecoilState, useRecoilValue } from "recoil";
import {
  clientConfig,
  isDarkMode,
  players,
  roomCode,
  socketConfigAtom,
} from "../states";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import FormatColorFillRoundedIcon from "@mui/icons-material/FormatColorFillRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import PlayerList from "./PlayerList";
import { useRef } from "preact/hooks";
import DottedButton from "./DottedButton";
import { useSocket } from "../states/socket";
import { useNavigate } from "react-router-dom";

function InfoTab() {
  const playerList = useRecoilValue(players);
  const [clientConfigState, setConfig] = useRecoilState(clientConfig);
  const socketConfig = useRecoilValue(socketConfigAtom);
  const darkMode = useRecoilValue(isDarkMode);
  const roomCodeRef = useRef(null);
  const socket = useSocket();
  const navigate = useNavigate();

  const changeColor = (event: any) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      strokeStyle: event.target.value,
    }));
  };

  const changeWidth = (event: any) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      strokeWidth: event.target.value,
    }));
    console.log(event.target.value);
  };

  const saveImage = () => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      downloading: !clientConfigState.downloading,
    }));
  };

  const clearCanvas = () => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      erased: !clientConfigState.erased,
    }));
  };

  const fillCanvas = () => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      backgroundColor: clientConfigState.strokeStyle,
    }));
  };

  return (
    <div
      className={`${
        darkMode ? `bg-black text-white` : `bg-white text-black`
      } gap-2 flex flex-col items-start md:items-center justify-between border-r border-l border-slate-500 shadow-sm p-4 w-screen lg:w-fit lg:max-w-60 h-full  transition-all duration-500`}
    >
      <div
        id="menu"
        className="w-full  h-fit p-4 flex flex-col items-center mx-auto gap-2 border rounded-xl border-dashed "
      >
        <div className={`flex gap-2`}>
          <div
            className="menu-item flex col-span-2 lg:col-span-1 justify-center  "
            id="width-input-div"
            title="Thickness: 1"
          >
            <select
              label="Thickness"
              onChange={changeWidth}
              title={`Thickness`}
              className={`${
                darkMode
                  ? `bg-black text-white  border-slate-300  `
                  : `bg-white text-black border-slate-950 `
              }   border rounded `}
            >
              <option value={1}>1</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div
            className="menu-item flex col-span-2 lg:col-span-2 justify-center w-full px-0 "
            title="Choose color"
          >
            <input
              id="color-input"
              type="color"
              height="200px"
              width="300px"
              className={``}
              defaultValue={clientConfigState.strokeStyle}
              onChange={changeColor}
            />
          </div>
        </div>
        <div className={`flex`}>
          <div className="menu-item flex col-span-1 mx-auto">
            <button
              id="clear-button"
              title="Clear fullscreen"
              className="p-1 border rounded w-fit h-fit bg-transparent"
              onClick={clearCanvas}
            >
              <DeleteOutlineRoundedIcon
                sx={{ color: `${darkMode ? `white` : `black`}` }}
              />
            </button>
          </div>
          <div className="menu-item flex col-span-1 mx-auto">
            <button
              id="fill-button"
              title="Fill fullscreen"
              className="p-1 border rounded w-fit h-fit bg-transparent"
              onClick={fillCanvas}
            >
              <FormatColorFillRoundedIcon
                sx={{ color: `${darkMode ? `white` : `black`}` }}
              />
            </button>
          </div>
          <div className="menu-item flex col-span-1 mx-auto">
            <button
              id="save-button"
              title="Download"
              className="p-1 border rounded w-fit h-fit bg-transparent"
              onClick={saveImage}
            >
              <DownloadRoundedIcon
                sx={{ color: `${darkMode ? `white` : `black`}` }}
              />
            </button>
          </div>
        </div>
      </div>
      <div class={`flex flex-col justify-center items-center gap-3`}>
        <DottedButton
          className={`w-full p-4 border items-center flex   ${
            darkMode
              ? `black hover:bg-slate-900  text-white`
              : `bg-yellow-300 hover:bg-yellow-400 border-black  text-black`
          }`}
          onClick={() => {
            // @ts-ignore
            navigator.clipboard.writeText(roomCodeRef?.current?.innerText);
            // @ts-ignore
            alert("Copied code: " + roomCodeRef?.current?.innerText);
          }}
        >
          <>
            Room code:
            <div
              class={`rounded ${
                darkMode
                  ? `black hover:bg-slate-700  text-white`
                  : `bg-yellow-300 hover:bg-yellow-600 border-black text-black`
              } flex p-1 m-1`}
              ref={roomCodeRef}
            >
              {socketConfig.roomCode}
            </div>
          </>
        </DottedButton>
        <DottedButton
          className={`w-fit border border-dashed ${
            darkMode
              ? `black hover:bg-slate-900  text-white`
              : `bg-yellow-300 hover:bg-yellow-400 border-black text-black`
          }`}
          onClick={() => {
            socket?.emit("leave-room", roomCode);
            navigate("/");
          }}
        >
          Leave Room
        </DottedButton>
        <PlayerList playerList={playerList} />
      </div>
    </div>
  );
}

export default InfoTab;
