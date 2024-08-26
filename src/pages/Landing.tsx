import { useNavigate } from "react-router-dom";
import DottedButton from "../components/DottedButton";
import { useEffect, useState } from "preact/hooks";
import { useSetRecoilState } from "recoil";
import { socketConfigAtom } from "../states";
import CleanTextInput from "../components/CleanInput";
import { useSocket } from "../states/socket";

function Landing() {
  const navigate = useNavigate();
  const [showRoomPanel, setShowRoomPanel] = useState(false);
  const setSocketConfig = useSetRecoilState(socketConfigAtom);
  const [roomCode, setRoomCode] = useState("");
  const [nickName, setNickName] = useState("");
  const socket = useSocket();
  function practiseRoute() {
    navigate("/practise");
  }

  async function joinRoomRoute() {
    if (roomCode === "" && nickName === "") {
      return;
    }
    setSocketConfig({ roomCode: roomCode, nickname: nickName, avatar: "" });
    const emitData = {
      roomCode: roomCode,
      nickname: nickName,
    };
    // @ts-ignore
    socket?.emit("join-room", emitData);

    navigate(`/room/${roomCode}`);
  }

  useEffect(() => {
    setShowRoomPanel(false);
    return setShowRoomPanel(false);
  }, []);

  return (
    <div
      className={`min-h-screen bg-black w-full  flex gap-3 m-0 justify-center items-center`}
    >
      <div class={`  bg-black flex flex-col justify-center items-center gap-5`}>
        <DottedButton
          className="border-2 shadow-slate-100"
          onClick={practiseRoute}
        >
          Practise
        </DottedButton>
        <DottedButton
          className="border-2 shadow-slate-100"
          onClick={() => setShowRoomPanel((prev) => !prev)}
        >
          Join room
        </DottedButton>
      </div>
      <>
        {showRoomPanel && (
          <div
            className={`border p-4 flex flex-col bg-slate-950  justify-center items-center gap-3 rounded-xl  shadow-md shadow-slate-800 border-slate-500 h-full m-8`}
          >
            <CleanTextInput
              type="text"
              placeholder="Room code: "
              value={roomCode}
              // @ts-ignore
              onInput={(e) => setRoomCode(e.target?.value)}
            />
            <CleanTextInput
              type={`text`}
              placeholder={`Nick name: `}
              value={nickName}
              // @ts-ignore
              onInput={(e) => setNickName(e.target?.value)}
            />

            <DottedButton
              onClick={joinRoomRoute}
              className={`w-fit border-slate-700`}
            >
              Join
            </DottedButton>
          </div>
        )}
      </>
    </div>
  );
}

export default Landing;
