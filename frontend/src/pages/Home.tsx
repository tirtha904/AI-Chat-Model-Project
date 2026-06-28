import { Box, useMediaQuery, useTheme } from "@mui/material";
// import React from "react";
import TypingAnim from "../components/typer/TypingAnim";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnim />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex ",
            flexDirection: { md: "row", xs: "column", sm: "row" },
            gap: 5,
            my: 10,
            justifyContent:'center',
            alignItems:'center',

          }}
        >
          <Box
          sx={{
            display:{xs:"none",sm:'flex',md:'flex'},
            justifyContent:'flex-start',
            flex:1,


          }}>
          <img
            src="robot.png"
            alt="robot"
            style={{ width: "200px", margin: "auto" }}
          />
          </Box>
          <Box
          sx={{
            flex:1,
            display:'flex',
            justifyContent:'flex-start',
            m:{xs:5,md:5}
          }}
          >
          <img
            className="image-inverted rotate"
            src="openai.png"
            alt="openai"
            style={{ width: "200px", margin: "auto" }}
          />
          </Box>
        </Box>
        <Box sx={{ display: "flex", mx: "auto" ,}}>
          <img
            src="chat.png"
            alt="chatbot"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "80%" : "60%",
              borderRadius: 20,
              boxShadow: "-5px -5px 105px #64f3d5",
              marginTop: 20,
              marginBottom: 20,
              padding: 10,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;