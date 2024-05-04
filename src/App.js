import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Helmet } from 'react-helmet';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Upload from './components/Upload';

// 私有路由组件
function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <Helmet>
                    {/* 设置全局标题 */}
                    <title>面部表情情感分析系统</title>
                </Helmet>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route 
                        path="/dashboard" 
                        element={<PrivateRoute><Dashboard /></PrivateRoute>} 
                    />
                    <Route 
                        path="/upload" 
                        element={<PrivateRoute><Upload /></PrivateRoute>} 
                    />
                    {/* <Route path="/forum" element={<PrivateRoute><Forum /></PrivateRoute>} /> */}
                    <Route path="/" element={<Navigate replace to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
