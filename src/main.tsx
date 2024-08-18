import { render } from "preact";
import { App } from "./app.tsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Landing from "./pages/Landing.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/practise",
    element: <App />,
  },
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/room",
    element: <App />,
  },
]);
render(
  <ThemeProvider theme={darkTheme}>
    <RecoilRoot>
      <CssBaseline />
      <RouterProvider router={router} />
    </RecoilRoot>
  </ThemeProvider>,
  document.getElementById("app")!
);
