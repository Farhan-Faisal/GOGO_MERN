import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import configData from "../../config.json";
import sidebarStyles from "../../styles/sidebar.module.css";
import jwtDecode from "jwt-decode";

function Sidebar({ isBusiness }) {
  const [data, setData] = useState(SidebarData);
  const [isOpen, setIsOpen] = useState(false); // New state to manage sidebar toggle

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    if (rawToken !== null) {
      const token = jwtDecode(localStorage.getItem("token"));
      setData(SidebarData);
    }
  }, [isBusiness]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={sidebarStyles.hamburger} onClick={toggleSidebar}>
        {/* Hamburger Icon */}
        <div className={sidebarStyles.bar}></div>
        <div className={sidebarStyles.bar}></div>
        <div className={sidebarStyles.bar}></div>
      </div>

      <div className={`${sidebarStyles.sidebar} ${isOpen ? sidebarStyles.open : ''}`}>
        <div className={sidebarStyles.gogoLogo}>
          <p>GoGo</p>
        </div>
        <nav>
          <ul style={{ listStyleType: "none" }}>
            {data.map((page, index) => {
              return (
                <li key={index}>
                  <Link to={page.path} style={{ textDecoration: "none" }} onClick={toggleSidebar}>
                    {page.title.localeCompare("Logout") === 0 ? (
                      <div className={sidebarStyles.transparentButton} onClick={() => localStorage.removeItem("token")}>
                        {page.title}
                      </div>
                    ) : (
                      <div className={sidebarStyles.transparentButton}>
                        {page.title}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
