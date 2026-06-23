import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import AddJob from './pages/AddJob';
import EditJob from './pages/EditJob';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/" element={
              <ProtectedRoute><Navbar /><Dashboard /></ProtectedRoute>
            } />
            <Route path="/applications" element={
              <ProtectedRoute><Navbar /><Applications /></ProtectedRoute>
            } />
            <Route path="/add" element={
              <ProtectedRoute><Navbar /><AddJob /></ProtectedRoute>
            } />
            <Route path="/edit/:id" element={
              <ProtectedRoute><Navbar /><EditJob /></ProtectedRoute>
            } />
            <Route path="/transactions" element={
              <ProtectedRoute><Navbar /><Transactions /></ProtectedRoute>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
