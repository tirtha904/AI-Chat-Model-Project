import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message, { id: "signup" });
    }
  };
  //  @ts-ignore

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
        p: 'auto',
        m: 'auto',
        minWidth: 0,
        minHeight: '80vh',
        width: {
          xs: '80%',
          sm: '100%',
          md: '100%'
        }
      }}
    >
      <Box
        component='form'
        onSubmit={(handleSubmit)}
        sx={{
          margin: "auto",
          padding: "30px",
          boxShadow: "10px 10px 20px white",
          borderRadius: "10px",
          width: '100%',
          maxWidth: "400px",

        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: '100%',
            width: '100%',
          }}
        >
          <Typography
            variant="h4"
            sx={{ p: 2, fontWeight: 600, textAlign: "center" }}
          >
            Signup
          </Typography>
          <CustomizedInput type="text" name="name" label="Name" />
          <CustomizedInput type="email" name="email" label="Email" />
          <CustomizedInput type="password" name="password" label="Password" />
          <Button
            type="submit"
            sx={{
              px: 2,
              py: 1,
              mt: 2,
              width: "100%",
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
            Signup
          </Button>
        </Box>
      </Box>

    </Box>
  );
};

export default Signup;
