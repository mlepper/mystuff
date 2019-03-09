import React, { useState, useEffect } from "react";
import Input from "../../components/generic/input";
import Password from "../../components/generic/password";
import Remember from "../../components/remember";
import ButtonWrapper from "../../components/generic/buttonWrapper";
import Button from "../../components/generic/button";
import Header from "../../components/header";
import Notification from "../../components/generic/notification/";
import { useFirebase } from "../../utility/firebase";
import queryString from "query-string";
import { navigate } from "@reach/router";
import { useTranslation } from "react-i18next";

const Login = props => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState();
  const [attempted, setAttempted] = useState(false);
  const [remember, setRemember] = useState(false);
  const [init, setInit] = useState(false);

  const [qs] = useState(queryString.parse(props.location.search));
  const firebase = useFirebase();
  const { t } = useTranslation();

  const showEmailErrors = attempted && email && !email.valid;
  const showPasswordErrors = attempted && password && !password.valid;

  const { addError } = props;

  useEffect(() => {
    const saved = window.localStorage.getItem("email");
    if (saved && email === null) {
      setEmail({ value: saved, valid: true });
      setRemember(true);
    }

    setInit(true);

    return () => {
      if (!firebase.auth.currentUser) {
        return;
      }
      // the user has been authenticated
      if (remember) {
        window.localStorage.setItem("email", email.value);
      } else {
        window.localStorage.removeItem("email");
      }
    };
  }, [remember]);

  const handleClick = () => {
    if (!email || !password) {
      // eslint-disable-next-line
      console.log("Fill in fields");
      return;
    }

    setAttempted(true);

    if (!email.valid || !password.valid) {
      return;
    }

    try {
      firebase.auth
        .signInWithEmailAndPassword(email.value, password.value)
        .then(() => {
          if (qs.referrer) {
            navigate(qs.referrer);
          }
          navigate("home");
        })
        .catch(function(error) {
          // Handle Errors here.
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // [START_EXCLUDE]
          // if (errorCode === "auth/wrong-password") {
          //   alert("Wrong password.");
          // } else {
          //   alert(errorMessage);
          // }
          // eslint-disable-next-line
          console.log(error);
          addError(t("login.error.invalid"));
          // [END_EXCLUDE]
        });
    } catch (e) {
      // alert(e);
    }
  };
  if (!init) {
    return null;
  }

  return (
    <React.Fragment>
      <Header />
      <main>
        <Notification />
        <section data-qa="log-in">
          <div className="carousel no-padding">
            <div className="carousel-cell">
              <div className="text">
                <h1>{t("login.header.welcome")}</h1>
                <p>{t("login.header.welcome.subtext")}</p>
              </div>
              <div className="form-container">
                <form>
                  <Input
                    id="email-address"
                    type="email"
                    label={t("login.email")}
                    placeHolder={t("login.email.placeholder")}
                    defaultValue={email ? email.value : ""}
                    inputClasses="email-address"
                    autoComplete="true"
                    required
                    showErrors={showEmailErrors}
                    onChange={val => {
                      setAttempted(false);
                      setEmail(val);
                    }}
                  />
                  <Password
                    id="password"
                    label={t("login.password")}
                    placeHolder={t("login.password.placeholder")}
                    required
                    minLength={6}
                    showErrors={showPasswordErrors}
                    onChange={val => {
                      setAttempted(false);
                      setPassword(val);
                    }}
                  />
                  <Remember
                    defaultValue={remember}
                    onChange={({ value }) => {
                      //console.log(`Setting remember to ${value}`);
                      setRemember(value);
                    }}
                  />
                  <ButtonWrapper wrapperClasses="left">
                    <Button
                      handleClick={e => {
                        e.preventDefault();
                        handleClick();
                      }}
                    >
                      {t("login.button")}
                    </Button>
                  </ButtonWrapper>
                </form>
                {/* <p>
                <small>
                  Don't have an account?
                  <a href="../register/index.html">Create one now</a>.
                </small>
              </p> */}
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
    </React.Fragment>
  );
};

export default Login;
