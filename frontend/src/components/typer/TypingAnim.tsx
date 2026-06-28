import { TypeAnimation } from "react-type-animation";
import { useMediaQuery } from "@mui/material";

const TypingAnim = () => {
  const isSmall = useMediaQuery("(max-width:600px)");
  return (
    <div
    style={{
        fontSize: isSmall ? "35px" : "60px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
        textAlign: "center",
      }}>
    <TypeAnimation
      sequence={[
        "Chat With AI 💻",
        1000,
        "Built With OpenAI 🤖",
        2000,
        "ASK ANY QUESTION ",
        1500,
      ]}
      speed={50}
      
      repeat={Infinity}
    />
    </div>
  );
};

export default TypingAnim;