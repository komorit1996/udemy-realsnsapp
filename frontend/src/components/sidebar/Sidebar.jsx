import React from "react";
// import Home from '../../pages/home/Home';
import {
  Bookmark,
  Home,
  Message,
  Notifications,
  Person,
  Search,
  Settings,
} from "@mui/icons-material";
import "./Sidebar.css";
import { Users } from "../dummyData";
import CloseFriend from "../closefriend/CloseFriend";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Home className="sidebarIcon"></Home>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <span className="sidebarListItemText">Home</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Search className="sidebarIcon"></Search>
            <span className="sidebarListItemText">Search</span>
          </li>
          <li className="sidebarListItem">
            <Notifications className="sidebarIcon"></Notifications>
            <span className="sidebarListItemText">Notifications</span>
          </li>
          <li className="sidebarListItem">
            <Message className="sidebarIcon"></Message>
            <span className="sidebarListItemText">Message</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon"></Bookmark>
            <span className="sidebarListItemText">Bookmark</span>
          </li>
          <li className="sidebarListItem">
            <Person className="sidebarIcon"></Person>
            <Link
              to="/profile/komocode"
              style={{ textDecoration: "none", color: "black" }}
            >
              <span className="sidebarListItemText">Profile</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Settings className="sidebarIcon"></Settings>
            <span className="sidebarListItemText">Settings</span>
          </li>
          <hr className="sidebarHr"></hr>
          <ul className="sidebarFriendList">
            {Users.map((user) => (
              <CloseFriend user={user} key={user.id} />
            ))}
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
