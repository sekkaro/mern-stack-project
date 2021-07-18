import React from "react";
import { Route, Redirect } from "react-router-dom";

import DefaultLayout from "../../layout/DefaultLayout";

const isAuth = true;
const PrivateRoute = ({ children, ...props }) => {
  return (
    <Route
      {...props}
      render={() =>
        isAuth ? <DefaultLayout>{children}</DefaultLayout> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
