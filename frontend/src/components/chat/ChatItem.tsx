// import React from "react";
import { Box, Avatar, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}
const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
   const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role == "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        width: "100%",
        maxWidth: '100%',
        minWidth: 0,

        pr: '10px',
        whiteSpace: "pre-wrap", //important
        wordBreak: "break-word",
        overflowWrap: "break-word",
        boxSizing: 'border-box',
        bgcolor: "##004d5612",

        gap: 2,
        borderRadius: 2,
        my: 1,
        // alignItems:'flex-start',
      }}
    >{!isXs &&(
      <Avatar sx={{ ml: "0"
      }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      )}
      <Box

        sx={{
          width: '100%',
          overflowX: 'auto',
        }}>
        {!messageBlocks && (
          <Typography
            sx={{
              fontSize: "20px",
            }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript"
                wrapLongLines={true}
                customStyle={{
                  width: '100%',
                  maxWidth: '100%',
                  overflowX: 'auto',
                  wordBreak: 'break-word',
                  overflowWrap: "anywhere",

                }}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{
                fontSize: "20px", width: '100%',
                maxWidth: '100%',
                overflowX: 'auto',
                wordBreak: 'break-word',
                overflowWrap: "anywhere",
              }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#003c42",
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0] || ""}
        {auth?.user?.name.split(" ")?.[1]?.[0] || ""}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;