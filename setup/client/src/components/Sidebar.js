import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { BusinessSidebarData } from "./BusinessSidebarData";

import sidebarStyles from "../styles/sidebar.module.css";
import jwtDecode from "jwt-decode";

function Sidebar({ isBusiness }) {
  const [data, setData] = useState(SidebarData);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    console.log(rawToken);
    if (rawToken !== null)
    {
      const token = jwtDecode(localStorage.getItem("token"));
      setData(token.isBusiness === true ? BusinessSidebarData : SidebarData);
    }
  }, [isBusiness]);

  return (
    <div className={sidebarStyles.sidebar}>
      <div className={sidebarStyles.gogoLogo}>
        <p>GoGo</p>
      </div>
      <br></br>
      <nav>
        <ul style={{ listStyleType: "none" }}>
          {data.map((page, index) => {
            return (
              <li key={index}>
                <Link to={page.path} style={{ textDecoration: "none" }}>
                  {page.title.localeCompare("Logout") === 0 ? (
                    <div className={sidebarStyles.transparentButton} onClick={() => localStorage.removeItem("token")}>
                      {page.title}
                    </div>
                  ):(
                    <div className={sidebarStyles.transparentButton}>
                      {page.title}
                    </div>
                    )
                  }
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
