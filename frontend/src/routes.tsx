import { Route, Routes as Router, Navigate, Outlet } from 'react-router-dom';
import Login from './public/Login';
import Settings from './private/Settings';
import Dashboard from './private/Dashboard';
import { useAuth, User } from './contexts/auth';

interface ProtectRouteProps {
  user: User | null;
}

const ProtectedRoute = ({
  user,
}: ProtectRouteProps) => {
  if (!user) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet/>;
};

const Routes = () => {
  const { user } = useAuth();
  return (
      <Router>
        <Route path="/" element={<Login />}/>
        <Route element={<ProtectedRoute user={user}/>}>
          <Route path="/settings" element={<Settings />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Router>
  );
}

export default Routes;