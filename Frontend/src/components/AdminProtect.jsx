import React from 'react';
import { useSelector } from 'react-redux';
import isAdmin from '../utils/isAdmin';
import { Link } from 'react-router-dom';

const AdminProtect = ({ children }) => {
  const user = useSelector((state) => state.user);

  if (!isAdmin(user?.role)) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "3rem auto",
        padding: "2rem",
        borderRadius: "12px",
        border: "1px solid #eee",
        backgroundColor: "#fff",
        width: "fit-content",
        boxShadow: "0 4px 8px rgba(0,0,0,0.03)",
        textAlign: "center"
      }}>
        <p style={{
          fontSize: "1.2rem",
          fontWeight: 500,
          color: "#333",
          marginBottom: "1rem"
        }}>
          This page doesn't exist.
        </p>
        <Link
          to="/"
          style={{
            backgroundColor: "#008000",
            color: "#fff",
            padding: "0.5rem 1.2rem",
            borderRadius: "6px",
            fontWeight: "600",
            textDecoration: "none",
            fontSize: "1rem"
          }}
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminProtect;
