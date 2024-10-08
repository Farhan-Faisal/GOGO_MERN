import Axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/common_styles.module.css";
import React, { component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/ionicons/eye";
import { eyeDisabled } from "react-icons-kit/ionicons/eyeDisabled";
import StatelessPopup from "../../components/CommonItems/StatelessPopup";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook"; // npm install @react-icons/all-files --save // DEV-CGP-6
import { FaGoogle } from "@react-icons/all-files/fa/FaGoogle"; // npm install @react-icons/all-files --save
import GoogleAuthButton from "../../components/CommonItems/GoogleAuthButton";

import configData from "../../config.json";

//const jwt = require("jsonwebtoken");

const Login = ({
  loggedInCallBack,
  businessLoggedInCallBack,
  SignUpRedirect,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [username, setUsername] = useState("");
  const [cantLogin, setcantLogin] = useState(false);
  const [Msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const [pwdIcon, setIcon] = useState(eye);

  useEffect(() => {
    console.log(configData.SERVER_URL);
    localStorage.removeItem("userPic");
  }, []);

  const throwErrMsg = emsg => {
    // when user enters invalid info, this function is called
    setcantLogin(true); // it changes the Signup button to display the error msg
    setMsg(emsg);
  };

  const handleVisible = () => {
    if (visible) {
      setVisible(false);
      setIcon(eye);
    } else {
      setVisible(true);
      setIcon(eyeDisabled);
    }
  };

  const navigate = useNavigate();
  const onSubmit = event => {
    // called when the form is submitted
    event.preventDefault(); // don't update page

    if (email === "") {
      throwErrMsg("Please enter Email");
      return;
    } else if (password === "") {
      throwErrMsg("Please enter Password");
      return;
    }

    //post operation

    // const navigate = useNavigate();
    Axios.post(configData.SERVER_URL + "/login", {
      email: email,
      password: password,
    }).then(res => {
      // Handle the login response according to your requirements
      if (res.data.user) {
        localStorage.setItem("tags", JSON.stringify([])); // DEV-CGP-19
        // Redirect the user or perform any other necessary actions
        console.log(res.data.user.token);
        console.log("Login success");

        localStorage.setItem("token", res.data.user.token);
        navigate(loggedInCallBack, {});
      } else {
        throwErrMsg(res.data.err);
        console.log(res.data.err);
        console.log("Login failed");
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>LOGIN</h1>

      <StatelessPopup trigger={cantLogin} setTrigger={setcantLogin}>
        <div className={styles.wrappableText}>{Msg}</div>
      </StatelessPopup>

      <form onSubmit={onSubmit} className={styles.verticalContent}>
        <div className={styles.division}>
          <input
            type="email"
            value={email}
            placeholder="Email"
            disabled={cantLogin}
            onChange={e => setEmail(e.target.value)}
            className={styles.inputField}
          />
        </div>
        <div className={styles.division}>
          <div className={styles.inputWrapper}>
            <input
              type={visible ? "text" : "password"}
              value={password}
              placeholder="Password"
              disabled={cantLogin}
              onChange={e => setPassword(e.target.value)}
              className={styles.inputField}
            />
            <i onClick={handleVisible}>
              <Icon icon={pwdIcon} size={35} />
            </i>
          </div>
        </div>

        <div className={styles.division}>
          <button type="submit" className={styles.purpleButton}>
            Log in
          </button>
        </div>

        {/* </Link> */}
      </form>
      <div className={styles.division}>
        <div className={styles.line}></div>

        <p className={styles.text}>or login with</p>

        <div className={styles.line}></div>
      </div>
      <div className={styles.division}>
        <GoogleAuthButton />

        {/* DEV-CGP-6 */}
        <button className={styles.facebookButton}>
          <a href={configData.SERVER_URL + "/auth/facebook"}>
            {" "}
            <FaFacebook />{" "}
          </a>
        </button>
      </div>

      <div className={styles.footnoteDiv}>
        Need an account ?
        <Link to={SignUpRedirect}>
          <button className={styles.transparentButton}>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
