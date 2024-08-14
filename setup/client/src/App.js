import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import BioPage from "./components/BioPage";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Logout from "./pages/Logout";
import CreateEvents from "./pages/CreateEvents";
import SignupHub from "./Signup/SignupHub";
import Login from "./Login/Login";
import RequestsPage from "./Requests/RequestsPage";

import ChatPage from "./Chat/ChatPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import jwtDecode from "jwt-decode";
import AccountSetup from "./Signup/AccountSetup";
import FBAccountSetup from "./Signup/FBAccountSetup"; // DEV-CGP-6

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
      <Router basename={"/GOGO_MERN"}>
        <Sidebar isBusiness={false} />
        <Routes>
          
          <Route path="/"
            element={
              <Login loggedInCallBack={"/dashboard"} SignUpRedirect={"/signup"} />
            }
          />

          <Route path="/signup"
            element={ <SignupHub accountSetupCallback={"/"} loginRedirect={"/"} /> }
          />

          <>
            <Route path="/account-setup" exact element={<FBAccountSetup />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/create-events" exact element={<CreateEvents back={"/dashboard"} />} />
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
