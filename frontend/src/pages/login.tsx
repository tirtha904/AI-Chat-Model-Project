import React, { useEffect } from 'react'
import { Box, Typography, Button } from "@mui/material";
import { IoIosLogIn } from "react-icons/io";
import CustomizedInput from '../components/shared/CustomizedInput';
import {toast} from 'react-hot-toast' //gives quick feedback by pop up notification about success or error
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
const Login= ()=>{
    const navigate = useNavigate();
    const auth = useAuth();
   const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); //so that brouser  doesnt get refresh
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
     try {
      toast.loading("Logging In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Logged In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Logging In Failed", { id: "login" });
    }
   }
   //@ts-ignore
     useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
    return (
   
  
      <Box
        sx={{
          display: "flex",
          flex: { xs: 1, md: 0.5 },
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          m:'auto',
          pt:'150px',
          width:'100%',
          minWidth:0,
        }}
      >
            {/* <Box sx={{ p: 2, mt: 1, display: { md: "flex", sm: "none", xs: "none" } }}>
        <img src="airobot.png" alt="Robot" style={{ width: "300px" ,height:"430px" }} />
      </Box> */}
        <form
         onSubmit={(handleSubmit)}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px white",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
             
              sx={{variant:"h4", p: 2, fontWeight: 600, textAlign:"center" }}
            >
              Login
            </Typography>
            <CustomizedInput type='email' name='email' label='Email'/>
            <CustomizedInput type='password' name='password' label='Password'/>
              <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                color: "#08131F",

                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<IoIosLogIn />}
           
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    )
}
export default Login