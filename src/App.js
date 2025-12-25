import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/Auth/Login/Login';
import DeadComponent from './component/common/DeadComponent';
import Signup from './component/Auth/SignUp/Signup';
import Dashboard from './component/Dashboard/Dashboard';
import ProtectedRoute from './component/Auth/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='*' element={<DeadComponent />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
