import React from "react";
import Input from "./generic/input";
import { useTranslation } from "react-i18next";

const Remember = props => {
  const { t } = useTranslation();

  return (
    <Input
      type="checkbox"
      labelClasses="checkbox"
      label={t("login.remember")}
      id="remember"
      showValidity={false}
      {...props}
      contain={
        <span className="forgot-password-prompt">
          <a className="button--next">{t("login.forgot")}</a>
        </span>
      }
    />
  );
};

export default Remember;
