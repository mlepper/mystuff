import React, { useState } from "react";
import Input from "../components/generic/input";
import ButtonWrapper from "../components/generic/buttonWrapper";
import Button from "../components/generic/button";

const Login = props => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleClick = () => {
    if (!email || !password) {
      console.log("Fill in fields");
      return;
    }
    window.firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
  };

  return (
    <main>
      <section data-qa="log-in">
        <div className="carousel no-padding">
          <div className="carousel-cell">
            <div className="text">
              <h1>Welcome</h1>
              <p>Please log in to continue.</p>
            </div>
            <div className="form-container">
              <form>
                <Input
                  id="email-address"
                  type="email"
                  label="Email Address"
                  placeHolder="Enter your email address"
                  // defaultValue="leslie@mcmillan.com"
                  inputClasses="email-address"
                  autoComplete="true"
                  required
                  onChange={val => setEmail(val)}
                />
                <Input
                  type="password"
                  id="password"
                  label="Password"
                  placeHolder="Enter your password"
                  required
                  onChange={val => setPassword(val)}
                />
                <fieldset>
                  <legend>Remember Me</legend>
                  <label htmlFor="remember" className="checkbox">
                    Remember Me
                    <input type="checkbox" name="remember" id="remember" />
                  </label>
                  <span className="forgot-password-prompt">
                    <a className="button--next">Forgot Password?</a>
                  </span>
                  <span className="error-message">
                    This is where the error message goes
                  </span>
                </fieldset>
                {/* <div className="button-box left">
                  <button className="button" href="../home/index.html">
                    <span className="button-label">Log In</span>
                  </button>
                </div> */}
                <ButtonWrapper wrapperClasses="left">
                  <Button
                    handleClick={e => {
                      e.preventDefault();
                      handleClick();
                    }}
                  >
                    Log In
                  </Button>
                </ButtonWrapper>
              </form>
              <p>
                <small>
                  Don't have an account?
                  <a href="../register/index.html">Create one now</a>.
                </small>
              </p>
            </div>
          </div>
          {/* <div className="carousel-cell">
            <div className="text">
              <h1>Reset Your Password</h1>
              <p>
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </div>
            <div className="form-container">
              <form>
                <fieldset>
                  <legend>Email Address</legend>
                  <label for="email-address">
                    Email Address&#42;
                    <input
                      type="email"
                      name="email-address"
                      className="email-address"
                      placeholder="Enter your email address"
                      autocomplete
                    />
                    >
                  </label>
                  <span className="error-message">
                    This is where the error message goes
                  </span>
                </fieldset>
                <div className="button-box left">
                  <a className="button button--next">
                    <span className="button-label">Reset Password</span>
                  </a>
                </div>
              </form>
              <p>
                <small>
                  Return to <a className="button--previous">Log In</a>.
                </small>
              </p>
            </div>
          </div>
          <div className="carousel-cell">
            <div className="text">
              <h1>Password Reset Email Sent</h1>
              <p>
                Please check your email inbox. We've sent you a special link
                that you can use to reset your password.
              </p>
            </div>
          </div>*/}
        </div>
      </section>
    </main>
  );
};

export default Login;
