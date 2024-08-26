import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useRecoilState, useSetRecoilState } from "recoil";
import { clientConfig, isDarkMode } from "../states";
import { useMemo } from "preact/hooks";
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
// function invertColor(hex: string, bw: boolean) {
//   if (hex.indexOf("#") === 0) {
//     hex = hex.slice(1);
//   }
//   // convert 3-digit hex to 6-digits.
//   if (hex.length === 3) {
//     hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
//   }
//   if (hex.length !== 6) {
//     throw new Error("Invalid HEX color.");
//   }
//   let r = parseInt(hex.slice(0, 2), 16),
//     g = parseInt(hex.slice(2, 4), 16),
//     b = parseInt(hex.slice(4, 6), 16);
//   if (bw) {
//     return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
//   }
//   // invert color components
//   let r1 = (255 - r).toString(16),
//     g1 = (255 - g).toString(16),
//     b1 = (255 - b).toString(16);
//   // pad each with zeros and return
//   return "#" + padZero(r1) + padZero(g1) + padZero(b1);
// }

// invertHex("00FF00"); // Returns FF00FF
// function padZero(str) {
//   len = len || 2;
//   var zeros = new Array(len).join("0");
//   return (zeros + str).slice(-len);
// }
function invertHex(hex: string) {
  return (Number(`0x1${hex}`) ^ 0xffffff).toString(16).substr(1).toUpperCase();
}
export function DarkModeToggle() {
  const setDarkMode = useSetRecoilState(isDarkMode);
  const [config, setConfig] = useRecoilState(clientConfig);

  return (
    <FormGroup>
      <FormControlLabel
        control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
        label=""
        onChange={(e) => {
          setDarkMode(e.target.checked);
          const invertedColorStroke = invertHex(
            config.strokeStyle.slice(1).toUpperCase()
          );
          const invertedColorBg = invertHex(
            config.backgroundColor.slice(1).toUpperCase()
          );
          console.log(
            config.strokeStyle,
            invertedColorBg,
            config.backgroundColor,
            invertedColorBg
          );
          setConfig({
            ...config,
            strokeStyle: `#${invertedColorStroke}`,
            backgroundColor: `#${invertedColorBg}`,
          });
        }}
      />
    </FormGroup>
  );
}
