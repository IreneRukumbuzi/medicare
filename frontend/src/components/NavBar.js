import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Typography } from "antd";
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import UserService from "../services/UserService";
import "./NavBar.css";

const { Title, Text } = Typography;

function NavBar() {
  const isAuthenticated = UserService.isAuthenticated();

  const handleLogout = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirmDelete) {
      UserService.logout();
      Navigate("/login");
    }
  };

  return (
    <nav>
      <div className="nav-left">
        <Title level={3} style={{ color: "white" }}><HomeOutlined /> Medicare</Title>
      </div>
      <div className="nav-right">
        {isAuthenticated && (
          <Link to="/" onClick={handleLogout}>
            <Text style={{ color: "white" }}>Logout</Text> <LogoutOutlined />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
