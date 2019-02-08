import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useFormState } from "react-use-form-state";

const Input = ({
  type,
  id,
  defaultValue,
  label,
  placeHolder,
  inputClasses = [],
  valid,
  onChange = () => null,
  ...rest
}) => {
  const uid = rest.name || id;
  const initState = defaultValue ? { [uid]: defaultValue } : null;
  const [formState, inputs] = useFormState(initState);

  onChange(formState.values[uid]);

  return (
    <fieldset>
      <legend>{label}</legend>
      <label htmlFor={id}>
        {label}
        {rest.required ? "*" : ""}
        <input
          id={id}
          {...inputs[type](uid)}
          name={uid}
          className={classnames(inputClasses)}
          placeholder={placeHolder || label}
          {...rest}
        />
        <span class="is-valid" />
      </label>
      <span className="error-message">
        This is where the error message goes
      </span>
    </fieldset>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(["email", "text", "password"]),
  id: PropTypes.string
};

export default Input;
