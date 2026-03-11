import React from "react";
import GoogleLogo from "../assets/google-logo.jpg";


function GoogleLoginButton() {
  return (
    <button style={{
      backgroundColor: "#fff",
      color: "#444",
      border: "1px solid #ccc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "12px",
      borderRadius: "8px",  // rounded corners
      cursor: "pointer",
      fontSize: "1rem"
}}>
  <img src={GoogleLogo} alt="G" style={{width: "20px", height: "20px"}} />
  Sign in with Google
</button>
  );
}

export default GoogleLoginButton;