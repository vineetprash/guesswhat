// @ts-ignore
import { useEffect, useState } from "preact/hooks";

function MainCanvas() {
  const URL = "https://guess-what-ixoj.onrender.com";
  let [ctx, setCtx] = useState();
  let [isDrawing, setIsDrawing] = useState(false);
  let [intervalId, setIntervalId] = useState(0);
  useEffect(() => {
    let canvas = document.getElementById("canvas-mobile");
    if (screen.availWidth > 768) {
      canvas = document.getElementById("canvas-desktop");
    }
    const colorInput = document.getElementById("color-input");
    const colorDisplay = document.getElementById("stroke-color");
    const widthInput = document.getElementById("width-input");
    const widthDisplay = document.getElementById("width-input-div");
    const saveButton = document.getElementById("save-button");
    const clearButton = document.getElementById("clear-button");
    const fillButton = document.getElementById("fill-button");
    const guessDiv = document.getElementById("ai-guess");
    setCtx(canvas?.getContext("2d"));

    let boundings = canvas?.getBoundingClientRect();
    let intervalId: number | undefined;
    // desktop
    canvas?.addEventListener("mousedown", (e) => handleMouseDown(e));
    window.addEventListener("mouseup", (e) => handleMouseUp(e));
    canvas?.addEventListener("mousemove", (e) => handleDrawing(e));
    // touch
    canvas?.addEventListener("touchstart", (e) => handleMouseDown(e));
    window.addEventListener("touchend", (e) => handleMouseUp(e));
    canvas?.addEventListener("touchmove", (e) => handleDrawing(e));

    // window.addEventListener("resize", handleResize);
    colorInput?.addEventListener("change", (e) => changeColor(e));
    widthInput?.addEventListener("input", (e) => changeWidth(e));
    saveButton?.addEventListener("click", saveImage);
    clearButton?.addEventListener("click", clearCanvas);
    fillButton?.addEventListener("click", fillCanvas);

    ctx.strokeStyle = colorInput?.value;
    let isDrawing = false;
    setInterval(() => (boundings = canvas?.getBoundingClientRect()), 1000);
  }, []);

  // function handleResize() {
  //     if (canvas?.classList.contains("hidden")) {
  //         canvas =
  //             canvas?.id === "canvas-desktop"
  //                 ? (canvas = document.getElementById("canvas-mobile"))
  //                 : document.getElementById("canvas-desktop");
  //     }
  // }
  function handleMouseDown(event: MouseEvent | TouchEvent) {
    console.log("down");
    clearTimeout(intervalId);
    let { x, y } = decodeCoords(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  }
  function handleMouseUp() {
    if (isDrawing) {
      let id = setTimeout(async () => {
        guessDiv.innerHTML = await guessWhatsThat();
      }, 1000);
      setIntervalId(id);
    }

    ctx.closePath();
    setIsDrawing(false);
  }
  function handleDrawing(event) {
    if (isDrawing) {
      let { x, y } = decodeCoords(event);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  function decodeCoords(event) {
    let coords;
    if (!event.touches) {
      coords = getMouseCoords(event);
    } else {
      coords = getTouchCoords(event);
    }
    let x = coords.x;
    let y = coords.y;
    return { x, y };
  }
  function getMouseCoords(event) {
    let x = event.clientX - boundings.left;
    let y = event.clientY - boundings.top;
    return { x, y };
  }
  function getTouchCoords(event) {
    let x = event.touches[0].clientX - boundings.left;
    let y = event.touches[0].clientY - boundings.top;
    return { x, y };
  }
  function changeColor(event) {
    ctx.strokeStyle = event.target.value;
    colorDisplay.innerHTML = event.target.value;
  }
  function changeWidth(event) {
    ctx.lineWidth = event.target.value;
    widthDisplay.title = `Thickness: ${event.target.value}`;
  }

  function saveImage() {
    const canvasDataURL = canvas?.toDataURL();
    const a = document.createElement("a");
    a.href = canvasDataURL;
    a.download = "MyPainting";
    a.click();
  }

  async function guessWhatsThat() {
    const canvasDataURL = canvas?.toDataURL();
    guessDiv.innerHTML = "thinking...";
    const res = await fetch(`${URL}/imageToText`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blob: `${canvasDataURL.slice(22)}` }),
    });
    const data = await res.json();
    if (data.success) {
      return data.message;
    }
    return "I dont know what that is...";
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas?.width, canvas?.height);
  }

  function fillCanvas() {
    ctx.fillStyle = colorInput?.value;
    ctx.fillRect(0, 0, canvas?.width, canvas?.height);
  }

  return (
    <div class={`dark:bg-black bg-white w-full h-full min-h-screen`}>
      <div
        id="canvas-container "
        className={`h-fit w-fit p-4 border rounded flex flex-col justify-center`}
      >
        <div
          id="ai-guess"
          class="prompt-text text-sm md:text-lg dark:text-white text-black "
        >
          Draw something, i'll guess what it is :)
        </div>
        <div class="container flex-col md:flex-row m-4 border border-t flex w-fit">
          <div id="menu" class="w-44 h-full p-4">
            <div
              class="menu-item hidden md:flex items-center p-4 w-full "
              title="Choose color"
            >
              <input
                id="color-input"
                type="color"
                height="200px"
                width="200px"
                value="#ffffff"
              />
            </div>
            <div
              class="menu-item hidden md:flex items-center p-4 w-full"
              id="width-input-div"
              title="Thickness: 1"
            >
              <input
                id="width-input"
                type="range"
                min="1"
                max="50"
                height="200px"
                width="200px"
                value="1"
              />
            </div>
            <div class="menu-item hidden md:flex items-center p-4 w-full">
              <button
                id="clear-button"
                title="Clear fullscreen"
                class="p-4 border rounded w-fit h-12 cursor-pointer "
              >
                <svg
                  fill="#ffffff"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  stroke="#ffffff"
                  class="svgIcon"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <g>
                        <path d="M345.397,81.27V0H166.603v81.27H28.444v48.762h48.762V512h357.587V130.032h48.762V81.27H345.397z M215.365,446.984 h-48.762V154.413h48.762V446.984z M215.365,48.762h81.27V81.27h-81.27V48.762z M345.397,446.984h-48.762V154.413h48.762V446.984z"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
            <div class="menu-item hidden md:flex items-center p-4 w-full">
              <button
                id="fill-button"
                title="Fill fullscreen"
                class="p-4 border rounded w-fit h-12"
              >
                <svg
                  stroke="#ffffff"
                  class="svgIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  fill="#ffffff"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlSpace="preserve"
                  style="
                                    fill-rule: evenodd;
                                    clip-rule: evenodd;
                                    stroke-linejoin: round;
                                    stroke-miterlimit: 2;
                                "
                >
                  <path d="M4,29.987l24,0c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.827 -0.672,-1.5 -1.5,-1.5l-24,0c-0.828,0 -1.5,0.673 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5Z" />
                  <path d="M9.138,22.244c1.323,0.328 2.775,0.118 3.995,-0.702l9.873,-6.712c0.458,-0.308 0.58,-0.929 0.273,-1.388l-6.717,-10c-0.308,-0.458 -0.929,-0.58 -1.388,-0.272c0,-0 -6.027,4.048 -9.961,6.691c-2.293,1.539 -2.903,4.646 -1.363,6.938c0.725,1.08 1.53,2.279 2.256,3.359c0.738,1.099 1.836,1.812 3.032,2.086Zm11.448,-9.223l-15.418,0c0.207,-0.591 0.599,-1.124 1.16,-1.5c-0,-0 9.131,-6.133 9.131,-6.133l5.127,7.633Z" />
                  <path d="M26.339,15.455c-0.185,-0.284 -0.5,-0.455 -0.839,-0.455c-0.339,-0 -0.654,0.171 -0.839,0.455c0,0 -1.274,1.965 -2.039,3.732c-0.379,0.876 -0.622,1.717 -0.622,2.313c-0,1.932 1.568,3.5 3.5,3.5c1.932,0 3.5,-1.568 3.5,-3.5c-0,-0.596 -0.243,-1.437 -0.622,-2.313c-0.765,-1.767 -2.039,-3.732 -2.039,-3.732Z" />
                </svg>
              </button>
            </div>
            <div class="menu-item hidden md:flex items-center p-4 w-full">
              <button
                id="save-button"
                title="Download"
                class="p-4 border rounded w-fit h-12"
              >
                <svg
                  stroke="#ffffff"
                  class="svgIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                >
                  <path
                    d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z"
                    fill="#ffffff"
                  />
                  <path
                    d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z"
                    fill="#ffffff"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="w-fit p-4 flex-col justify-center items-center">
            <canvas
              class="hidden md:flex md:desktop"
              id="canvas-desktop"
              height="400px"
              width="600px"
            ></canvas>

            <canvas
              class="flex md:hidden mobile"
              id="canvas-mobile"
              height="400px"
              width="300px"
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainCanvas;
