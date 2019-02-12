import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Input from "./input";

/* eslint-disable-next-line */
const Password = ({ type, ...rest }) => {
  const [currentType, setCurrentType] = useState("password");
  return (
    <Input
      type={currentType}
      {...rest}
      contain={
        <span
          className={classnames(
            "la",
            "show-hide-password",
            currentType === "password" ? "la-eye-slash" : "la-eye"
          )}
          onClick={() => {
            setCurrentType(currentType === "password" ? "text" : "password");
          }}
        />
      }
    />
  );
};

Password.propTypes = {
  id: PropTypes.string
};

export default Password;
