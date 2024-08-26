import { render } from "preact";

import "./index.css";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Landing from "./pages/Landing.tsx";
import { SocketProvider } from "./states/socket.tsx";
import { App } from "./app.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/practise",
    element: <App />,
  },
  {
    path: "/room/:roomId",
    element: <App />,
  },
]);
render(
  <SocketProvider>
    <ThemeProvider theme={darkTheme}>
      <RecoilRoot>
        <CssBaseline />
        <RouterProvider router={router} />
      </RecoilRoot>
    </ThemeProvider>
  </SocketProvider>,
  document.getElementById("app")!
);
