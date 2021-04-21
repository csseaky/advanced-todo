import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const clientId =
  "985722162309-svdh6ecjfbdsjhkd4tffv7s7np9a8t37.apps.googleusercontent.com";

export const Navbar = (props) => {
  const { navbarIsStatic } = props;
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    setUserLoggedIn(localStorage.getItem("userLoggedIn"));
    setUserProfilePicture(localStorage.getItem("userProfilePicture"));
    setUsername(localStorage.getItem("username"));
  }, []);

  const logout = (response) => {
    setUserLoggedIn(false);
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userProfilePicture");
    localStorage.removeItem("username");
  };
  const responseGoogle = (response) => {
    if (response.error) {
      console.log(response);
      return;
    }
    setUserLoggedIn(true);
    localStorage.setItem("userLoggedIn", true);
    localStorage.setItem("userProfilePicture", response.profileObj.imageUrl);
    localStorage.setItem("username", response.profileObj.name);
  };

  return (
    <nav
      className={`top-section ${navbarIsStatic ? "top-section-static" : null}`}
    >
      <h1>Mind Games</h1>
      {!userLoggedIn ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      ) : (
        <div className="profile-wrapper">
          <p>Welcome {username}</p>
          <img src={userProfilePicture} alt="" />
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={logout}
          ></GoogleLogout>
        </div>
      )}
    </nav>
  );
};
