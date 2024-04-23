// GoogleAuth.js
import React from 'react';

function GoogleAuth() {
  const handleSignIn = () => {
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/callback&prompt=consent&response_type=token&client_id=324427676481-70ic2v45mblbap7sd8uvkbvihio4jsij.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/userinfo.profile';
  };

  return (
    <div>
      <button className="button" onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
}

export default GoogleAuth;
