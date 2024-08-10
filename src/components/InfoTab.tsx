import { useRecoilState, useRecoilValue } from "recoil";
import { clientConfig, isDarkMode, players, socketConfigAtom } from "../states";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import FormatColorFillRoundedIcon from "@mui/icons-material/FormatColorFillRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import PlayerList from "./PlayerList";
import { FormControl, MenuItem, Select } from "@mui/material";

function InfoTab() {
  const playerList = useRecoilValue(players);
  const [clientConfigState, setConfig] = useRecoilState(clientConfig);
  const [socketConfig, setSocketConfig] = useRecoilState(socketConfigAtom);
  const darkMode = useRecoilValue(isDarkMode);

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
    // setConfig((prevConfig) => ({
    //   ...prevConfig,
    //   downloading: !clientConfigState.downloading,
    // }));
  };

  const clearCanvas = () => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      erased: !clientConfigState.erased,
    }));
  };

  const fillCanvas = (e: any) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      backgroundColor: clientConfigState.strokeStyle,
    }));
  };

  return (
    <div
      className={`flex flex-col items-center justify-between border-r p-4 dark:bg-black w-fit bg-white dark:text-white text-black`}
    >
      <div>
        <div class={`w-full p-4 border `}>
          Room code: {socketConfig.roomCode}
        </div>
        <PlayerList playerList={playerList} />
      </div>
      <div id="menu" className="w-max h-fit p-4 grid grid-cols-2 gap-2">
        <div
          className="menu-item hidden md:flex col-span-2 justify-center"
          id="width-input-div"
          title="Thickness: 1"
        >
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={clientConfigState.strokeWidth}
              label="Thickness"
              onChange={changeWidth}
              title={`Thickness`}
              sx={{ color: `${darkMode ? `white` : `black`}`, width: "100%" }}
            >
              <MenuItem
                value={1}
                sx={{ color: `${!darkMode ? `white` : `black`}` }}
              >
                1
              </MenuItem>
              <MenuItem
                value={10}
                sx={{ color: `${!darkMode ? `white` : `black`}` }}
              >
                10
              </MenuItem>
              <MenuItem
                value={20}
                sx={{ color: `${!darkMode ? `white` : `black`}` }}
              >
                20
              </MenuItem>
              <MenuItem
                value={30}
                sx={{ color: `${!darkMode ? `white` : `black`}` }}
              >
                30
              </MenuItem>
              <MenuItem
                value={40}
                sx={{ color: `${!darkMode ? `white` : `black`}` }}
              >
                40
              </MenuItem>
              <MenuItem
                value={50}
                sx={{ color: `${!darkMode ? `white` : `black`}` }}
              >
                50
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div
          className="menu-item hidden md:flex col-span-2 justify-center"
          title="Choose color"
        >
          <input
            id="color-input"
            type="color"
            height="200px"
            width="300px"
            defaultValue={isDarkMode ? `white` : `black`}
            onChange={changeColor}
          />
        </div>

        <div className="menu-item hidden md:flex ">
          <button
            id="clear-button"
            title="Clear fullscreen"
            className="p-1 border rounded w-fit h-fit"
            onClick={clearCanvas}
          >
            <DeleteOutlineRoundedIcon
              sx={{ color: `${darkMode ? `white` : `black`}` }}
            />
          </button>
        </div>
        <div className="menu-item hidden md:flex">
          <button
            id="fill-button"
            title="Fill fullscreen"
            className="p-1 border rounded w-fit h-fit"
            onClick={fillCanvas}
          >
            <FormatColorFillRoundedIcon
              sx={{ color: `${darkMode ? `white` : `black`}` }}
            />
          </button>
        </div>
        <div className="menu-item hidden md:flex">
          <button
            id="save-button"
            title="Download"
            className="p-1 border rounded w-fit h-fit"
            onClick={saveImage}
          >
            <DownloadRoundedIcon
              sx={{ color: `${darkMode ? `white` : `black`}` }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoTab;
