import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LoginProtect = ({ children }) => {
  const user = useSelector((state) => state.user);

  if (!user || !user._id) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "3rem auto",
        padding: "2rem",
        borderRadius: "12px",
        border: "1px solid #ddd",
        width: "fit-content",
        backgroundColor: "#fefefe",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        textAlign: "center"
      }}>
        <p style={{
          fontSize: "1.2rem",
          fontWeight: 600,
          color: "#333",
          marginBottom: "1rem"
        }}>
          Please login to access this page.
        </p>
        <Link
          to="/login"
          style={{
            backgroundColor: "#008000",
            color: "#fff",
            padding: "0.6rem 1.5rem",
            borderRadius: "6px",
            fontWeight: "600",
            textDecoration: "none",
            fontSize: "1rem"
          }}
        >
          Login
        </Link>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoginProtect;
