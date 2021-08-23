import React from 'react';
import { Redirect, Route as ReactRoute, RouteProps as ReactRouterProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface RouteProps extends ReactRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

export const Route = ({ isPrivate = false, component: Component, ...rest }: RouteProps) => {
  const { accessToken } = useAuth();

  return (
    <ReactRoute
      {...rest}
      render={(params) => (isPrivate === !!accessToken ? (
        <Component />
        ) : (
          <Redirect to={isPrivate ? '/' : '/dashboard'} />
        ))}
    />
  );
};
