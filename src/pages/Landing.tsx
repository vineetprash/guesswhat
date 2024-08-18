import { useNavigate } from "react-router-dom";
import DottedButton from "../components/DottedButton";

function Landing() {
  const navigate = useNavigate();
  function practiseRoute() {
    navigate("/practise");
  }
  function createRoomRoute() {
    navigate("/room");
  }
  function joinRoomRoute() {
    navigate("/practise");
  }

  return (
    <div
      class={`min-h-screen w-full bg-black flex flex-col justify-center items-center gap-5`}
    >
      <DottedButton onClick={practiseRoute}>Practise</DottedButton>
      <DottedButton onClick={joinRoomRoute}>Join room</DottedButton>
      <DottedButton onClick={createRoomRoute}>Create new room</DottedButton>
    </div>
  );
}

export default Landing;
