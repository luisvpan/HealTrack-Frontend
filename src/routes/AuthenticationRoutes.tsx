import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { RouteObject } from 'react-router';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const ResetPassword = Loadable(lazy(() => import('views/pages/forgotPassword/resetPassword'))); 

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes: RouteObject = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/login',
      element: <AuthLogin />
    },
    {
      path: '/reset-password/:token', 
      element: <ResetPassword /> 
    },
  ]
};

export default AuthenticationRoutes;
