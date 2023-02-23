import { useEffect } from "react";
import { Loading } from "../components";
import { colors } from "../utilities/colors";

export default function SplashScreen() {
  useEffect(() => {
    document.getElementById("body").style.backgroundColor = colors.htmlColor;
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Loading size="large" color={colors.mosque} />
    </div>
  );
}
