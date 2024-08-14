import React, { useEffect } from "react";
import "./styles/App.css";
import Sidebar from "./components/SideBar/Sidebar";
import BioPage from "./pages/BioPage/BioPage";
import Account from "./components/SideBar/Account";
import Logout from "./components/SideBar/Logout";
import SignupHub from "./pages/Signup/SignupHub";
import Login from "./pages/Login/Login";
import RequestsPage from "./pages/Requests/RequestsPage";

import ChatPage from "./pages/Chat/ChatPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import jwtDecode from "jwt-decode";
import AccountSetup from "./pages/Signup/AccountSetup";
import FBAccountSetup from "./pages/Signup/FBAccountSetup"; // DEV-CGP-6

import configData from "./config.json";

function App() {
  const rawToken = localStorage.getItem("token");
  
  useEffect(() => {
    if (rawToken !== null){
      const token = jwtDecode(rawToken);
    }
  }, []);

  return (
    <div>
      <Router basename={"/"}>
        <Sidebar isBusiness={false} />
        <Routes>
          
          <Route path="/"
            element={
              <Login loggedInCallBack={"/requests"} SignUpRedirect={"/signup"} />
            }
          />

          <Route path="/signup"
            element={ <SignupHub accountSetupCallback={"/"} loginRedirect={"/"} /> }
          />

          <>
            <Route path="/account-setup" exact element={<FBAccountSetup />} />
            {/* <Route path="/dashboard" exact element={<Dashboard />} /> */}
            {/* <Route path="/create-events" exact element={<CreateEvents back={"/dashboard"} />} /> */}
            <Route path="/account" exact element={<Account />} />
            <Route path="/bio-page" exact element={<BioPage />} />
            <Route path="/chats" exact element={<ChatPage />} />
            <Route path="/requests" element={<RequestsPage />} />
          </>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
