import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "../../../store/modules/notifications";
import Notificatiom from "./notification";

const mapStateToProps = state => {
  return {
    errors: state.notification.errors
  };
};

const { removeError, addError } = actions;

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
)(Notificatiom);
