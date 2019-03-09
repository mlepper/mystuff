import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useFormState } from "react-use-form-state";
import { getValidationError } from "../../utility/validation";
import isEqual from "lodash.isequal";

const Input = ({
  type,
  id,
  defaultValue = "",
  label,
  placeHolder,
  labelClasses = [],
  inputClasses = [],
  fieldSetClasses = [],
  showErrors = true,
  showValidity = true,
  onChange = () => null,
  ...rest
}) => {
  const uid = rest.name || id;
  const initState = defaultValue ? { [uid]: defaultValue } : null;
  const [inputState, inputs] = useFormState(initState);
  const inputRef = useRef(null);
  const [lastValue, setLastValue] = useState(null);
  const [initializing, setInitializing] = useState(true);

  let isValid = true,
    validationError = "";
  if (typeof inputState.validity[uid] !== "undefined") {
    isValid = inputState.validity[uid];
  }

  const isTouched = !!inputState.touched[uid];
  const validity =
    (inputRef && inputRef.current && inputRef.current.validity) || {};

  if (showErrors || isTouched) {
    [validationError] = getValidationError(validity, type);

    const newValue = {
      valid: !!inputState.validity[uid],
      value: inputState.values[uid]
    };

    if (!isEqual(lastValue, newValue)) {
      onChange(newValue);
      setLastValue(newValue);
    }
  }

  if (initializing) {
    const newValue = { valid: false, value: defaultValue };
    onChange(newValue);
    setLastValue(newValue);
    setInitializing(false);
  }

  const inputProps = { ...rest };
  const fieldSetProps = {},
    labelProps = {};
  if (inputClasses) {
    inputProps.className = classnames(inputClasses);
  }
  if (labelClasses) {
    labelProps.className = classnames(labelClasses);
  }

  if (fieldSetClasses) {
    let extra = "";
    if (showErrors) {
      extra = !isValid || validationError ? "invalid" : "valid";
    }
    fieldSetProps.className = classnames(fieldSetClasses, extra);
    if (!fieldSetProps.className) {
      delete fieldSetProps.className;
    }
  }

  return (
    <fieldset {...fieldSetProps}>
      <legend>{label}</legend>
      <label htmlFor={id} {...labelProps}>
        {label}
        {rest.required ? "*" : ""}
        <input
          ref={inputRef}
          id={id}
          {...inputs[type](uid)}
          name={uid}
          placeholder={placeHolder || label}
          {...rest}
          type={type}
        />
        {showValidity && <span className="is-valid" />}
      </label>
      {rest.contain}
      <span className="error-message">{validationError}</span>
    </fieldset>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(["email", "text", "password", "checkbox"]),
  id: PropTypes.string
};

export default Input;
