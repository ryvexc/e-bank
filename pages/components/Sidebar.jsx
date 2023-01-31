import React from "react";
import dashboardIcon from "@/public/sidebar/dashboard.svg"
import invoiceIcon from "@/public/sidebar/invoice.svg"
import notificationIcon from "@/public/sidebar/notification.svg"
import transactionIcon from "@/public/sidebar/transaction.svg"
import settingsIcon from "@/public/sidebar/settings.svg"

const Sidebar = () => {
  // event buat redirect
  const redirect = async (index) => {
    for (let i = 0; i < refs.length; i++) refs[i].current.classList.remove("active");
    refs[index].current.classList.toggle("active");
  }

  const refs = [
    React.useRef(null), //dashboard
    React.useRef(null), //invoice
    React.useRef(null), //notification
    React.useRef(null), //transaction
    React.useRef(null) //settings
  ];

  const menuLabelRefs = [
    React.useRef(null), //dashboard
    React.useRef(null), //invoice
    React.useRef(null), //notification
    React.useRef(null), //transaction
    React.useRef(null) //settings
  ];

  const [minimizeState, setMinimizeState] = React.useState("< Minimize");

  const [navbar, setNavbar] = React.useState([
    { icon: dashboardIcon, name: "Dashboard" },
    { icon: invoiceIcon, name: "Invoice" },
    { icon: notificationIcon, name: "Notification" },
    { icon: transactionIcon, name: "Transaction" },
    { icon: settingsIcon, name: "Settings" }
  ]);

  const fullnameRef = React.useRef(null);
  const usernameRef = React.useRef(null);

  const sidebarRef = React.useRef(null);
  const [isMinimized, setIsMinimized] = React.useState(false);
  const minimize = (e) => {
    if (!isMinimized) {
      sidebarRef.current.style.width = "114px";
      for (let i = 0; i < menuLabelRefs.length; i++) menuLabelRefs[i].current.style.opacity = "0";
      setMinimizeState(">");
      setIsMinimized(true);
      fullnameRef.current.style.opacity = "0";
      usernameRef.current.style.opacity = "0";
    }
    else {
      sidebarRef.current.style.width = "268px";
      for (let i = 0; i < menuLabelRefs.length; i++) menuLabelRefs[i].current.style.opacity = "1";
      setMinimizeState("< Minimize");
      setIsMinimized(false);
      fullnameRef.current.style.opacity = "1";
      usernameRef.current.style.opacity = "1";
    }
  }

  return (<>
    <div className="sidebar" ref={sidebarRef}>
      <div className="main-wrapper">
        <div className="top-wrapper">
          <div className="userbox">
            <img style={{ border: "1px solid var(--primary-color)" }} className="profile-pic" src="profile.jpeg" alt="" />
            <div className="profile-inf">
              <p style={{ transition: "0.15s" }} ref={fullnameRef}>Arif Kurniawan</p>
              <p style={{ transition: "0.15s" }} ref={usernameRef}>Ryve</p>
            </div>
          </div>
          <div className="cus-hr"></div>
          <div className="navbar">
            <div className="main-prop">MAIN</div>
            <ul>
              {navbar.map((menu, index) => {
                return <li ref={refs[index]} className={"nav-list clickanimation " + (index == 0 ? "active" : "")} key={menu.name} onClick={e => redirect(index)}>
                  <img src={menu.icon.src} style={{ minWidth: "24px", minHeight: "24px", width: "24px", height: "24px" }} alt="" />
                  <p ref={menuLabelRefs[index]} style={{ transition: "0.15s" }}>{menu.name}</p>
                </li>
              })}
            </ul>
          </div>
        </div>
        <div className="bot-wrapper">
          <button className="global-button-prop" onClick={e => minimize(e)}>{minimizeState}</button>
        </div>
      </div>
    </div>
  </>)
}

export default Sidebar;