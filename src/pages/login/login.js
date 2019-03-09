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

  const showEmailErrors = attempted && (!email || !email.valid);
  const showPasswordErrors = attempted && (!password || !password.valid);

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
  const buttonProps = {};

  if (!init) {
    return null;
  }

  return (
    <React.Fragment>
      <Header />
      <main>
        <Notification />
        <section className="sign-in md">
          <div className="slider ext">
            <div className="slider int">
              <div className="slide one">
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
                        buttonProps={buttonProps}
                        handleClick={e => {
                          e.preventDefault();
                          handleClick();
                        }}
                      >
                        {t("login.button")}
                      </Button>
                    </ButtonWrapper>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
};

export default Login;
