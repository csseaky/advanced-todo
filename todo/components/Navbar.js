import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const clientId =
  "985722162309-svdh6ecjfbdsjhkd4tffv7s7np9a8t37.apps.googleusercontent.com";

const StyledNavbar = styled.nav`
  position: absolute;
  top: 5%;
  left: 5%;
  color: tomato;
  margin: auto;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Original Surfer";
  font-size: 2rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Navbar = (props) => {
  const { source } = props;
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
    <StyledNavbar>
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
        <ProfileWrapper>
          <p>Welcome {username}</p>
          <img src={userProfilePicture} alt="" />
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={logout}
          ></GoogleLogout>
        </ProfileWrapper>
      )}
    </StyledNavbar>
  );
};
