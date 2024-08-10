// @ts-nocheck
import { useRef, useState, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { clientConfig } from "../states";

export const Canvas = () => {
  const [clientConfigState] = useRecoilState(clientConfig);
  const URL = "https://guess-what-ixoj.onrender.com";
  const canvasDesktopRef = useRef(null);
  const canvasMobileRef = useRef(null);

  const guessDivRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);
  const [boundings, setBoundings] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const canvas =
      window.screen.availWidth > 768
        ? canvasDesktopRef.current
        : canvasMobileRef.current;
    const context = canvas.getContext("2d");
    setCtx(context);
    setBoundings(canvas.getBoundingClientRect());
    context.strokeStyle = clientConfigState.strokeStyle;

    const updateBoundings = () => {
      setBoundings(canvas.getBoundingClientRect());
    };
    const interval = setInterval(updateBoundings, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (event) => {
    clearTimeout(intervalId);
    const { x, y } = decodeCoords(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      const id = setTimeout(async () => {
        guessDivRef.current.innerHTML = await guessWhatsThat();
      }, 1000);
      setIntervalId(id);
    }
    ctx.closePath();
    setIsDrawing(false);
  };

  const handleDrawing = (event) => {
    if (isDrawing) {
      const { x, y } = decodeCoords(event);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const decodeCoords = (event) => {
    let coords;
    if (!event.touches) {
      coords = getMouseCoords(event);
    } else {
      coords = getTouchCoords(event);
    }
    return { x: coords.x, y: coords.y };
  };

  const getMouseCoords = (event) => {
    return {
      x: event.clientX - boundings.left,
      y: event.clientY - boundings.top,
    };
  };

  const getTouchCoords = (event) => {
    return {
      x: event.touches[0].clientX - boundings.left,
      y: event.touches[0].clientY - boundings.top,
    };
  };

  const changeColor = () => {
    if (ctx) {
      ctx.strokeStyle = clientConfigState.strokeStyle;
    }
  };

  const changeWidth = () => {
    if (ctx) {
      ctx.lineWidth = clientConfigState.strokeWidth;
    }
  };

  const saveImage = () => {
    const canvas =
      window.screen.availWidth > 768
        ? canvasDesktopRef.current
        : canvasMobileRef.current;
    const canvasDataURL = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = canvasDataURL;
    a.download = "MyPainting";
    a.click();
  };

  const guessWhatsThat = async () => {
    const canvas =
      window.screen.availWidth > 768
        ? canvasDesktopRef.current
        : canvasMobileRef.current;
    const canvasDataURL = canvas.toDataURL();
    guessDivRef.current.innerHTML = "thinking...";
    const res = await fetch(`${URL}/imageToText`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blob: `${canvasDataURL.slice(22)}` }),
    });
    const data = await res.json();
    return data.success ? data.message : "I don't know what that is...";
  };

  const clearCanvas = () => {
    const canvas =
      window.screen.availWidth > 768
        ? canvasDesktopRef.current
        : canvasMobileRef.current;
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const fillCanvas = () => {
    const canvas =
      window.screen.availWidth > 768
        ? canvasDesktopRef.current
        : canvasMobileRef.current;
    if (ctx) {
      ctx.fillStyle = clientConfigState.strokeStyle;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(fillCanvas, [clientConfigState.backgroundColor]);
  useEffect(changeWidth, [clientConfigState.strokeWidth]);
  useEffect(changeColor, [clientConfigState.strokeStyle]);
  useEffect(clearCanvas, [clientConfigState.erased]);
  const width = useMemo(() => {}, []);
  //   useEffect(saveImage, [clientConfigState.downloading]);

  return (
    <div
      class={`h-fit  w-full flex justify-center items-start mt-4 dark:bg-black bg-white transition-all duration-500 `}
    >
      <div className="w-fit flex-col justify-center items-center shadow-md rounded p-4">
        <div
          id="ai-guess"
          ref={guessDivRef}
          className="prompt-text p-4 text-sm md:text-lg dark:text-white text-black text-center"
        >
          Draw something, I'll guess what it is :)
        </div>
        <canvas
          resize={true}
          ref={canvasDesktopRef}
          className="hidden md:flex md:desktop border border-lg dark:border-slate-500 rounded  border-black cursor-crosshair "
          id="canvas-desktop"
          height={`500px`}
          width={`700px`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleDrawing}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleDrawing}
        ></canvas>
        {/* mobile */}
        <canvas
          resize={true}
          ref={canvasMobileRef}
          className="flex md:hidden mobile border border-lg rounded dark:border-white border-black cursor-crosshair touch-none"
          id="canvas-mobile"
          height="300px"
          width="400px"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleDrawing}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleDrawing}
        ></canvas>
      </div>
    </div>
  );
};
