import React from "react";
import dashboardIcon from "@/public/sidebar/dashboard.svg"
import invoiceIcon from "@/public/sidebar/invoice.svg"
import notificationIcon from "@/public/sidebar/notification.svg"
import transactionIcon from "@/public/sidebar/transaction.svg"

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
    React.useRef(null) //transaction
  ];

  const [navbar, setNavbar] = React.useState([
    { icon: invoiceIcon, name: "Dashboard" },
    { icon: invoiceIcon, name: "Invoice" },
    { icon: notificationIcon, name: "Notification" },
    { icon: transactionIcon, name: "Transaction" }
  ]);

  return (<>
    <div className="sidebar">
      <div className="userbox">
        <img className="profile-pic" src="profile.jpeg" alt="" />
        <div className="profile-inf">
          <p>User</p>
          <p>Ryve</p>
        </div>
      </div>
      <div className="cus-hr"></div>
      <div className="navbar">
        <div className="main-prop">MAIN</div>
        <ul>
          {navbar.map((menu, index) => {
            return <li ref={refs[index]} className="nav-list clickanimation" key={menu.name} onClick={e => redirect(index)}>
              <img src={menu.icon.src} alt="" />
              <p>{menu.name}</p>
            </li>
          })}
        </ul>
      </div>
    </div>
  </>)
}

export default Sidebar;