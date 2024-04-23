// Callback.js
import React, { useEffect } from 'react';

function Callback() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get('access_token');

    // Store the access token in local storage or use it for API requests
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    // Redirect the user to the home page after authentication
    window.location.href = '/';
  }, []);

  return <div>Redirecting...</div>;
}

export default Callback;
