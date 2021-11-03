import { Switch } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { NotFound } from '../pages/NotFound';
import { Signup } from '../pages/Signup';
import { Route } from './routes';

export const Routes = () => {
  const { accessToken } = useAuth();
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route component={NotFound} isPrivate={!!accessToken} />
    </Switch>
  );
};
