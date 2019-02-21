import React, { useEffect, useState } from "react";
import classnames from "classnames";

const Notification = ({
  errorMessage,
  successMessage,
  confirmMessage,
  autoCloseMS = 30000
}) => {
  const [showError, setShowError] = useState(!!errorMessage);
  const showSuccess = !!successMessage || !!confirmMessage;

  useEffect(() => {
    window.setTimeout(() => {
      setShowError(false);
    }, autoCloseMS);
  }, []);

  return (
    <section>
      <div
        className={classnames("notification", "error", showError ? "show" : "")}
      >
        <div className="message">
          <p>{errorMessage}</p>
        </div>
        <span className="dismiss error">
          <i
            className="la la-times-circle"
            onClick={e => {
              e.preventDefault();
              setShowError(false);
            }}
          />
        </span>
      </div>
      <div
        className={classnames(
          "notification",
          "confirm",
          showSuccess ? "show" : ""
        )}
      >
        <div className="message">
          <p>{successMessage || confirmMessage}</p>
          {confirmMessage && (
            <div className="action">
              <button className="button">
                <span className="button-label">YES</span>
              </button>
              <button className="button">
                <span className="button-label">No</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Notification;
