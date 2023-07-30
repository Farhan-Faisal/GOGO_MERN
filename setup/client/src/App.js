import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import BioPage from "./components/BioPage";
import Dashboard from "./pages/Dashboard";
import Invites from "./pages/Invites";
import Account from "./pages/Account";
import Logout from "./pages/Logout";
import CreateEvents from "./pages/CreateEvents";
import SignupHub from "./Signup/SignupHub";
import Login from "./Login/Login";
import BusinessDashboard from "./Business/BusinessDashboard";
import PromotersPage from "./Business/PromotersPage";
import PromoterRequestsPage from "./Requests/PromoterRequests"

import ExamplePage from "./ExamplePage/ExamplePage";
import RequestsPage from "./Requests/RequestsPage";

import ChatPage from "./Chat/ChatPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Socket from "./Socket";
import jwtDecode from "jwt-decode";
function App() {
  const [isBusiness, setIsBusiness] = useState(false);
  const rawToken = localStorage.getItem("token");
  
  useEffect(() => {
    if (rawToken !== null)
    {
      const token = jwtDecode(rawToken);
      setIsBusiness(token.isBusiness);
    }
  }, []);

  return (
    <div>
      <Router>
        <Sidebar isBusiness={isBusiness} />
        <Routes>
          {/* elements common to both businesses and users */}
          <Route
            path="/"
            element={
              <Login
                loggedInCallBack={"/dashboard"}
                businessLoggedInCallBack={"/business-account"}
                SignUpRedirect={"/signup"}
                setIsBusiness={setIsBusiness}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignupHub accountSetupCallback={"/"} loginRedirect={"/"} />
            }
          />
          <Route path="/logout" exact element={<Logout />} />

          {isBusiness /* elements specific to businesses */ ? (
            <>
              <Route
                path="/business-account"
                exact
                element={<BusinessDashboard />}
              />
              <Route path="/promoters" exact element={<PromotersPage />} />
              <Route
                path="/create-events"
                exact
                element={<CreateEvents back={"/business-account"} />}
              />
              <Route path="/promoter-requests" element={<PromoterRequestsPage /> } />
            </>
          ) : (
            /* elements specific to users */
            <>
              <Route path="/dashboard" exact element={<Dashboard />} />
              <Route
                path="/create-events"
                exact
                element={<CreateEvents back={"/dashboard"} />}
              />
              <Route path="/invites" exact element={<Invites />} />
              <Route path="/account" exact element={<Account />} />
              <Route path="/bio-page" exact element={<BioPage />} />
              <Route path="/chats" exact element={<ChatPage />} />
              <Route path="/examplepage" element={<ExamplePage />} />
              <Route path="/requests" element={<RequestsPage />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
