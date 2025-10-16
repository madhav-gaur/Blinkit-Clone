import React, { useEffect, useState } from "react";
import { MdSignalWifiStatusbarConnectedNoInternet } from "react-icons/md";
import "../components/stylesheets/NoInternet.css";

export const NoInternet = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showBackOnline, setShowBackOnline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBackOnline(true);
      setTimeout(() => setShowBackOnline(false), 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBackOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <section className="no-internet-wrapper">
        <div className="no-internet-hero">
          <MdSignalWifiStatusbarConnectedNoInternet className="wifi-icon" />
          <p>Please check your internet connection</p>
          <button onClick={() => location.reload()}>Try Again</button>
        </div>
      </section>
    );
  }

  return showBackOnline ? (
    <div className="back-online-strip">
      <span>Back Online</span>
    </div>
  ) : null;
};
