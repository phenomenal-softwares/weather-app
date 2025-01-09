// src/components/LoadingScreen.js
import React, { useEffect, useState } from 'react';
import './LoadingScreen.css'; // If you'd like to style it

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  // After 5 seconds, hide the loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-screen ${loading ? 'show' : 'hide'}`}>
      <h1>Phenomenal</h1>
    </div>
  );
};

export default LoadingScreen;
