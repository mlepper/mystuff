const errormap = {
  badInput: "",
  customError: "",
  patternMismatch: "",
  rangeOverflow: "",
  rangeUnderflow: "",
  stepMismatch: "",
  tooLong: "",
  tooShort: "",
  typeMismatch: "",
  valueMissing: "Value is required."
};

const fieldOverides = {
  email: {
    typeMismatch: "A valid email is required.",
    valueMissing: "A valid email is required."
  }
};

export const getValidationError = (validity = {}, fieldType) => {
  const messages = [];
  for (let key in validity) {
    if (key !== "valid" && validity[key]) {
      let msg = errormap[key];
      if (
        fieldType &&
        fieldOverides[fieldType] &&
        fieldOverides[fieldType][key]
      ) {
        msg = fieldOverides[fieldType][key];
      }
      messages.push(msg ? msg : key);
    }
  }
  return messages;
};
