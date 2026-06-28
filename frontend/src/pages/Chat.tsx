import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { socket } from '../socket'
import toast from "react-hot-toast";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";
type Message = {
  role: "user" | "assistant";
  content: string;
};
const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  
  const [isTyping, setIsTyping] = useState(false);
  const handleSubmit = async () => {
  const content = inputRef.current?.value as string;
  if (!content) return;

  if (inputRef && inputRef.current) {
    inputRef.current.value = "";
  }

  const newMessage: Message = {
    role: "user",
    content,
  };

  setChatMessages((prev) => [...prev, newMessage]);

  try {
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  } catch (err: any) {
    setChatMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          err.message ||
          "⚠️ Daily AI limit reached. Please try again tomorrow.",
      },
    ]);
  }
};

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats || []]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);
  //@ts-ignore
  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);
  //

  useEffect(() => {

    socket.on("ai-typing", () => {
      setIsTyping(true);
    });

    socket.on("ai-stop-typing", () => {
      setIsTyping(false);
    });

    return () => {
      socket.off("ai-typing");
      socket.off("ai-stop-typing");
    };

  }, []);


  //it auto scroll to the bottom if new message is entered
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [chatMessages])

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >

      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "flex" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "70vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
            border: "1px solid rgba(255,255,255,0.08)",

          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name?.[0]}
            {auth?.user?.name.split(" ")?.[1]?.[0] || ""}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", fontWeight: 'bold', fontSize: '15px', pt: 5 }}>
            YOU ARE TALKING TO A ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
          minWidth: 0,
          overflow: 'hidden'


        }}
      >
        
        <Typography
          sx={{
            fontSize: "30px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GROQ
        </Typography>
         
        <Box className='chat-box'
          sx={{
            width: "100%",
            maxWidth: '100%',
            minWidth: 0,

            height: "65vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",

            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
            boxSizing: 'border-box',

          }}
        >
          {chatMessages.map((chat, index) => (

            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
          <div ref={messageEndRef} />
           {
             isTyping && (
               <Typography
               sx={{
                 color: "#8ab4f8",
                 ml: 2,
                 // fontStyle: "italic",
                 animation: "pulse 1s  infinite"
                }}
                >
              🤖 AI is typing...
            </Typography>
          )
        }
          
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 9,
            backgroundColor: "#1E2A44",
            display: "flex",
            margin: "auto",
            // boxShadow:'0 2px 8px rgba(254, 254, 254, 0.25)',
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {" "}
          <input
            //click enter to send message
            ref={inputRef}
            type="text"
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                e.preventDefault();
                handleSubmit();
              }
            }}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box >
  );
}


export default Chat;