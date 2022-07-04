import { Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ButtonCompo from "./ButtonCompo";
import { useState } from "react";

import { sendOtp, verifyOtp } from "../http/api";

import { useDispatch } from "react-redux";
import { setOTP, setAuth } from "../redux/authSlice";

// useNavigate nahi use krna // kyuki hume dusra url pe nhi jana//
//better to call next component // hint: useState
// and response se jo data aa rhe hai usko bhi store krna pdega

const CustomDrawer = (props: any) => {

  const dispatch = useDispatch();

  const [phoneScreen, setPhoneScreen] = useState(true)

  const [phone, setPhone] = useState("");
  const [OTP, setOTPPP] = useState("")
  const [hash, setHash] = useState("")
  const [erroR, showErroR] = useState(false);

  const handlechange = (e: any) => {
    setPhone(e.target.value);
    console.log(phone);
  };

  const handlechangeOTP = (e: any) => {
    setOTPPP(e.target.value);
    console.log(OTP);
  };

  const lol = () => {
    const handleClick = async () => {
      if (phone.length === 10) {
        showErroR(false);
        const respo = await sendOtp({ phone });
        alert(JSON.stringify(respo?.data));
        // dispatch
        dispatch(setOTP(respo?.data));  //show otp screen
        setPhoneScreen(false)           //showing otp screen
        setHash(respo?.data?.hash)

      } else {
        showErroR(true);
      }
    };
    handleClick();

  };

  let payload = {} // need to  give user details like username(default: nothing in database) phone email

  const handleSubmitOTP = () => {
    const handleClick = async () => {

      const lol = await verifyOtp({  phone: phone, hash: hash , otp: OTP})
      console.log("user",lol);

      if (lol) {
        props.setDrawer(false)  //drawer closed successfully
        dispatch(setAuth(lol?.data))  //need to pass payload
      }

    };
    handleClick();

  };


  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "50vw",
          height: "100vh",
          backgroundColor: "#FCFCFC",

        }}
      >
        <Typography
          onClick={props.onClick}
          style={{ marginLeft: 55, cursor: "pointer" }}
        >
          {" "}
          <CloseIcon />
        </Typography>

        {
          phoneScreen ? <Box>
          <Typography style={{ marginLeft: 55, marginBottom: 55, fontWeight: 700, fontSize: 22,}} > Enter Mobile Number </Typography>

          <input
            onChange={ (e) => handlechange(e) }
            value={phone}
            style={{ display: "block", marginLeft: 55, minWidth: 250, fontSize: 16, height: 44, width: "50%", border: "1px solid var(--primary-theme-color)", outline: "none", paddingLeft: 15 }}
            name="phone"
            type="text"
            placeholder="Enter your mobile number"
          />
          {
            erroR ? <Typography style={{ fontWeight: 400, color: "red", fontSize: 12, marginLeft: 55}}> Invalid phone number </Typography> : <p></p>
          }

          <ButtonCompo onClick={ () => lol() } style = {{marginLeft: 55, marginTop: 33}} label="Get OTP" />
        </Box> : <Box>
          <Typography
            style={{
              marginLeft: 55,
              marginBottom: 55,
              fontWeight: 700,
              fontSize: 22,
            }}
          >

            Enter OTP
          </Typography>

          <input
            disabled={true}
            value={phone}
            style={{
              marginBottom: 22,
              display: "block",
              marginLeft: 55,
              minWidth: 250,
              fontSize: 16,
              height: 44,
              width: "50%",
              border: "1px solid var(--primary-theme-color)",
              outline: "none",
              paddingLeft: 15,
            }}

            type="text"
            placeholder="Enter your mobile number"
          />
          <input
            onChange={(e) => handlechangeOTP(e)}
            value={OTP}
            style={{
              display: "block",
              marginLeft: 55,
              minWidth: 250,
              fontSize: 16,
              height: 44,
              width: "50%",
              border: "1px solid var(--primary-theme-color)",
              outline: "none",
              paddingLeft: 15,
            }}
            name="otp"
            type="text"
            placeholder="Enter OTP"
          />
          {erroR ? (
            <Typography
              style={{
                fontWeight: 400,
                color: "red",
                fontSize: 12,
                marginLeft: 55,
              }}
            >
              {" "}
              Invalid OTP{" "}
            </Typography>
          ) : (
            <p></p>
          )}

          <ButtonCompo
            onClick={() => handleSubmitOTP()}
            style={{ marginLeft: 55, marginTop: 33 }}
            label="Login"
          />
        </Box>

        }

        <Typography style={{ marginLeft: 55, fontSize: 12 }}>
          Having trouble? Please contact help@vyudham.com for further support.
        </Typography>
      </Box>
    </>
  );
};

export default CustomDrawer;
