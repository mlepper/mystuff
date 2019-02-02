import React from "react";
import classnames from "classnames";

export default ({ wrapperClasses, wrapperProps = {}, children }) => {
  return (
    <div className={classnames("button-box", wrapperClasses)} {...wrapperProps}>
      {children}
    </div>
  );
};
