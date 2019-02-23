/*eslint-disable react-hooks/rules-of-hooks */
import autodux from "../../../node_modules/autodux/src";

export const { reducer, actions, selectors } = autodux({
  slice: "notification",
  initial: {
    errors: []
  },
  actions: {
    addError: (state, error) => {
      if (!state.errors.find(e => e === error)) {
        return { errors: [error, ...state.errors] };
      }
      return { errors: state.errors };
    },
    removeError: (state, error) => {
      return { errors: state.errors.filter(e => e !== error) };
    }
  }
});
