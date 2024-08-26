import { useRecoilValue } from "recoil";
import Layout from "./pages/Layout";
import { isDarkMode } from "./states";

export function App() {
  const darkMode = useRecoilValue(isDarkMode);
  return (
    <div className={darkMode ? `dark` : ``}>
      <Layout />
    </div>
  );
}
