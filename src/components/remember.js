import React from "react";
import Input from "./generic/input";

const Remember = props => {
  return (
    <Input
      type="checkbox"
      labelClasses="checkbox"
      label="Remember Email"
      id="remember"
      showValidity={false}
      {...props}
      contain={
        <span className="forgot-password-prompt">
          <a className="button--next">Forgot Password?</a>
        </span>
      }
    />
  );
};

export default Remember;
