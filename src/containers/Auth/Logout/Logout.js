import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

export const Logout = (props) => {
  useEffect(() => {
    this.props.onLogout();
  }, []);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
