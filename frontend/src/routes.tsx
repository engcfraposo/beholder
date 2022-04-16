import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './public/Login';
import Settings from './private/Settings';

// import { Container } from './styles';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/settings" component={Settings} />
    </BrowserRouter>
  );
}

export default Routes;