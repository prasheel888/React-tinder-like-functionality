import React, { useEffect } from "react";

import firebase from "../firebase";
import { auth } from "../firebase";

import { useDispatch, useSelector } from "react-redux";
import {
  selectUserNumber,
  setUserLoginDetails,
} from "../features/user/userSlice";

import "./SignUp.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [number, setNumber] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const userNumber = useSelector(selectUserNumber);
  console.log(userNumber);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history.push("/home");
      }
    });
  }, [userNumber]);
  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        phoneNumber: user.phoneNumber,
      })
    );
  };

  let setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          response.onSignInSubmit();
        },
      }
    );
  };
  let onSignInSubmit = (event) => {
    event.preventDefault();
    setUpRecaptcha();
    const phoneNumber = number;
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        const code = window.prompt("Enter OTP");
        confirmationResult
          .confirm(code)
          .then((result) => {
            // User signed in successfully.
            setUser(result.user);

            // ...
            console.log("User Signed In");
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
          });
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
  };

  return (
    <div className="signupScreen">
      <form onSubmit={onSignInSubmit}>
        <div id="recaptcha-container"></div>

        <h1 className="header">Sign UP</h1>
        <input
          placeholder="Enter your Phone number"
          type="phone"
          onChange={(e) => setNumber(e.target.value)}
        />

        <button type="submit"> Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
