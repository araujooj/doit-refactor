import { Heading } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/signup" component={Signup} />
  </Switch>
);
