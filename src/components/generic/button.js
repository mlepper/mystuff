import React from "react";
import classnames from "classnames";

export default ({
  handleClick = () => {},
  children,
  buttonClasses,
  buttonProps = {},
  labelClasses,
  labelProps = {}
}) => {
  buttonClasses = buttonClasses || [];
  if (buttonProps && buttonProps.disabled) {
    buttonClasses.push("disabled");
  }

  return (
    <button
      className={classnames("button", buttonClasses)}
      onClick={handleClick}
      {...buttonProps}
    >
      <span
        className={classnames("button-label", labelClasses)}
        {...labelProps}
      >
        {children}
      </span>
    </button>
  );
};
