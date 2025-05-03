
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './utils/firebase';


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [user] = useAuthState(auth);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="*" element={<div className="p-8 text-center">404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;