import {
  AppBar,
  Box,
  Drawer,
  Toolbar,
  Typography,
  Modal,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import ButtonCompo from "./ButtonCompo";
import CustomDrawer from "./CustomDrawer";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../http/api";
import { setAuth } from "../redux/authSlice";


const Navbar = () => {
  const [drawer, setDrawer] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const dispatch = useDispatch()



  const handleProfileModalOpen = () => {
    setProfileModal(true);
  };

  const handleClose = () => {
    setProfileModal(false);
  };

  const user = useSelector((state: any) => state.authSliceReducer);

  const handleLogout = async () => {

    try {
       const  {data} = await logout()
       dispatch(setAuth(data))
       console.log(data);

    } catch (err: any) {
         console.log("Logout error", err);
    }



  }

  return (
    <>
      <AppBar
        style={{
          boxShadow: "none",
          position: "static",
          backgroundColor: "transparent",
          marginBottom: 11,
        }}
      >
        <Toolbar
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box style={{ flex: 1 }}>
            <Typography
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: 700,
                width: 250,
                padding: "5px 22px",
                borderRadius: 4,
                backgroundColor: "var(--primary-theme-color)",
              }}
            >

              Easy Peasy Study
            </Typography>
          </Box>

          <Box
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Link style={{ textDecoration: "none" }} to={"/home"}>
              {" "}
              <Typography style={{ color: "black" }}>Home</Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} to={"/all-course"}>
              {" "}
              <Typography style={{ color: "black" }}>Courses</Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} to={"/coding-course"}>
              {" "}
              <Typography style={{ color: "black" }}>Coding</Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} to={"/about"}>
              {" "}
              <Typography style={{ color: "black" }}>About Us</Typography>
            </Link>

            {
              user?.isAuth ? (
                <>
                  
                  <Button onClick={handleProfileModalOpen}>
                    <AccountCircleIcon color="info" />
                  </Button>
                  <Modal
                    hideBackdrop={true}
                    style={{ position: "absolute", top: 72, left: "80%" }}
                    open={profileModal}
                    onClose={handleClose}
                  >
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        alignItems: "center",
                        height: 177,
                        width: 177,
                        backgroundColor: "white",
                        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
                      }}
                    >
                      <Link to={'/dashboard'} style={{textDecoration: "none"}}> <Typography> Profile </Typography> </Link>
                      <Link to={'/dashboard'}  style={{textDecoration: "none"}}> <Typography> Dashboard </Typography> </Link>
                      <Link to={'/coin'}   style={{textDecoration: "none"}}> <Typography> Coin </Typography> </Link>
                      <Button onClick = {() => handleLogout() } > Logout </Button>
                    </Box>
                  </Modal>
                </>
              ) : (
                <ButtonCompo onClick={() => setDrawer(true)} label="Login" />
              )
              //styling left
              //logout and all
            }
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawer}>
        <CustomDrawer setDrawer={setDrawer} onClick={() => setDrawer(false)} />
      </Drawer>
    </>
  );
};

export default Navbar;
