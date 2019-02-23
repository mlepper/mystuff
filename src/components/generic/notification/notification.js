import React from "react";
import classnames from "classnames";

const Notification = props => {
  const { removeError, errors } = props;
  // const [errors, setErrors] = useState([]);

  // if (errorMessage && errors.indexOf(errorMessage) === -1) {
  //   setErrors([...errors, errorMessage]);
  // }

  const dismiss = message => removeError(message);
  // const showSuccess = !!successMessage || !!confirmMessage;

  // if (errorMessage && !showError) {
  //   setShowError(true);
  // }

  // useEffect(() => {
  //   if (showError) {
  //     window.setTimeout(() => {
  //       setShowError(false);
  //     }, autoCloseMS);
  //   }
  // }, [showError]);
  const show = errors.length > 0,
    msg = show ? errors[0] : "";

  return (
    <section>
      <NotificationError show={show} message={msg} dismiss={dismiss} />
      <div className={classnames("notification", "confirm")}>
        <div className="message">
          {/* <p>{successMessage || confirmMessage}</p>
          {confirmMessage && (
            <div className="action">
              <button className="button">
                <span className="button-label">YES</span>
              </button>
              <button className="button">
                <span className="button-label">No</span>
              </button>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
};

const NotificationError = ({
  show = false,
  message = "",
  dismiss = () => {}
}) => {
  return (
    <div className={classnames("notification", "error", show ? "show" : "")}>
      <div className="message">
        <p>{message}</p>
      </div>
      <span className="dismiss error">
        <i
          className="la la-times-circle"
          onClick={e => {
            e.preventDefault();
            dismiss(message);
          }}
        />
      </span>
    </div>
  );
};

export default Notification;
