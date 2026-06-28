// import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";
import { useLocation } from "react-router-dom";
import { red } from "@mui/material/colors";

import { deleteUserChats } from "../helpers/api-communicator";
import { toast } from "react-hot-toast";
import { useMediaQuery, useTheme } from "@mui/material";
import { Button } from "@mui/material";
const Header = () => {
  const auth = useAuth();
  const location = useLocation();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });

      await deleteUserChats();

      toast.success("Deleted Chats Successfully", {
        id: "deletechats",
      });
    } catch (err) {
      console.log(err);
      toast.error("Deleting Chats Failed", {
        id: "deletechats",
      });
    }
  };
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              {location.pathname !== "/chat" ? (
                <NavigationLink
                  bg="#00fffc"
                  textColor="black"
                  to="/chat"
                  text="Go To Chat"
                />
              ) : (
                isXs && (
                  <Button
                    variant="contained"

                    onClick={handleDeleteChats}
                    sx={{
                      width: "100px",
                      my: "auto",
                      color: "white",
                      fontWeight: "1000",
                      borderRadius: 3,
                      mx: "auto",
                      bgcolor: red[300],
                      ":hover": {
                        bgcolor: red.A400,
                      },
                    }}


                  >
                    Clear 
                  </Button>
                )
              )}
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/"
                text="logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 