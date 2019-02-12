import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useFormState } from "react-use-form-state";
import { getValidationError } from "../../utility/validation";
import isEqual from "lodash.isequal";

const Input = ({
  type,
  id,
  defaultValue,
  label,
  placeHolder,
  inputClasses = [],
  fieldSetClasses = [],
  showErrors = true,
  onChange = () => null,
  ...rest
}) => {
  const uid = rest.name || id;
  const initState = defaultValue ? { [uid]: defaultValue } : null;
  const [inputState, inputs] = useFormState(initState);
  const inputRef = useRef(null);
  const [currentType, setCurrentType] = useState(type);
  const [lastValue, setLastValue] = useState(null);

  let isValid = true,
    validationError = "";
  if (typeof inputState.validity[uid] !== "undefined") {
    isValid = inputState.validity[uid];
  }

  const isTouched = !!inputState.touched[uid];
  const validity =
    (inputRef && inputRef.current && inputRef.current.validity) || {};

  if (isTouched) {
    [validationError] = getValidationError(validity, type);

    const newValue = {
      valid: inputState.validity[uid],
      value: inputState.values[uid]
    };

    if (!isEqual(lastValue, newValue)) {
      onChange(newValue);
      setLastValue(newValue);
    }
  }

  const inputProps = { ...rest };
  const fieldSetProps = {};
  if (inputClasses) {
    inputProps.className = classnames(inputClasses);
  }
  if (fieldSetClasses) {
    let extra = "";
    if (showErrors && isTouched) {
      extra = isValid ? "valid" : "invalid";
    }
    fieldSetProps.className = classnames(fieldSetClasses, extra);
    if (!fieldSetProps.className) {
      delete fieldSetProps.className;
    }
  }

  const baseType = type;

  return (
    <fieldset {...fieldSetProps}>
      <legend>{label}</legend>
      <label htmlFor={id}>
        {label}
        {rest.required ? "*" : ""}
        <input
          ref={inputRef}
          id={id}
          {...inputs[type](uid)}
          name={uid}
          placeholder={placeHolder || label}
          {...rest}
          type={currentType}
        />
        <span className="is-valid" />
      </label>
      {baseType === "password" && (
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
      )}
      <span className="error-message">{validationError}</span>
    </fieldset>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(["email", "text", "password"]),
  id: PropTypes.string
};

export default Input;
