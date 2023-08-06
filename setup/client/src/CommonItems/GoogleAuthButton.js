import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import AccountSetup from "../Signup/AccountSetup";
import axios from "axios";
import { useNavigate } from "react-router";

import styles from "../styles/common_styles.module.css";

const GoogleAuthButton = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [openAccountSetup, setOpenAccountSetup] = useState(false);

  const navigate = useNavigate();

  const handleCallbackResponse = res => {
    // callback function for google auth
    const { email, name } = jwt_decode(res.credential);
    console.log({ email, name });
    setEmail(email);
    setUsername(name);
    axios
      .post("http://localhost:5000/login/google/check", {
        email: email,
      })
      .then(res => {
        console.log("first check");
        console.log(res.data);
        if (res.data.user === null) setOpenAccountSetup(true);
        else {
          localStorage.setItem("token", res.data.user.token);
          navigate("/dashboard");
        }
      })
      .catch(err => console.log(err));
    //setOpenAccountSetup(true);
    //signedUpCallBack();
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "220227767873-c6v84t58eakjlps6crdbn8mq5ugdhe3r.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("GoogleSignUp"), {
      type: "icon",
      theme: "outline",
      size: "large",
      shape: "circle",
      logo_alignment: "center",
    });
  }, []);

  return openAccountSetup ? (
    <AccountSetup
      email={email}
      username={username}
      accountSetupCallback={"/dashboard"}
      url={"http://localhost:5000/login/facebook/first-time"}
      successfunc={res => {
        localStorage.setItem("token", res.data.token);
      }}
    />
  ) : (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      id="GoogleSignUp"
    />
  );
};

export default GoogleAuthButton;
