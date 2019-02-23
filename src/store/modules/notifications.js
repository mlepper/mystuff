import autodux from "../../../node_modules/autodux/src";

export const { reducer, actions, selectors } = autodux({
  slice: "notification",
  initial: {
    errors: []
  },
  actions: {
    addError: (state, message) => {
      if (!state.errors.find(e => e === message)) {
        return { ...state, errors: [message, ...state.errors] };
      }
      return { ...state, errors: state.errors };
    },
    removeError: (state, message) => {
      return { errors: state.errors.filter(e => e !== message) };
    }
  }
});

export const addError = (message, autodismiss = 3000) => {
  return dispatch => {
    dispatch(actions.addError(message));
    if (autodismiss) {
      setTimeout(() => {
        dispatch(actions.removeError(message));
      }, autodismiss);
    }
  };
};
