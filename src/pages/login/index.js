import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions, addError } from "../../store/modules/notifications";
import Login from "./login";

const mapStateToProps = state => {
  return {
    errors: state.notification.errors
  };
};

const { removeError } = actions;

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addError,
      removeError
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
