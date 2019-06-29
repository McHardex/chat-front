import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import helper from './helpers';

const ProtectedRoute = ({ username, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!helper.checkUsername(username))
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          );
        return render(props);
      }}
    />
  );
};

export default ProtectedRoute;
