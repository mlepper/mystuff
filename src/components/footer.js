import React, { useEffect } from "react";
import { useFirebase } from "../utility/firebase/";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";

const Footer = () => {
  const { t } = useTranslation();
  const firebase = useFirebase();
  const isAuthenticated = firebase.auth.currentUser;

  if (!isAuthenticated) {
    return null;
  }

  useEffect(() => {});

  const handleClick = (e, where) => {
    e.preventDefault();
    if (where) {
      navigate(where);
    }
  };

  return (
    <footer>
      <nav>
        <ul>
          <li>
            <a className="active" onClick={e => handleClick(e, "home")}>
              <span className="icon">
                <i className="la la-home" />
              </span>
              {t("footer.home")}
            </a>
          </li>
          <li>
            <a className="exit-stuff" onClick={e => handleClick(e, "stuff")}>
              <span className="icon">
                <i className="la la-archive" />
              </span>
              {t("footer.stuff")}
            </a>
          </li>
          <li>
            <a
              className="exit-profile"
              onClick={e => handleClick(e, "profile")}
            >
              <span className="icon">
                <i className="la la-user" />
              </span>
              {t("footer.profile")}
            </a>
          </li>
          <li>
            <a
              className="exit-settings"
              onClick={e => handleClick(e, "settings")}
            >
              <span className="icon">
                <i className="la la-gear" />
              </span>
              {t("footer.settings")}
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
