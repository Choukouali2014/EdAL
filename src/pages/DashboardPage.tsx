import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './../utils/firebase';
import { signOut } from 'firebase/auth';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <p className="text-red-600 mb-4">You must be logged in to view this page.</p>
                <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
                <img
                    src={user.photoURL || 'https://via.placeholder.com/100'}
                    alt="User Avatar"
                    className="mx-auto mb-4 w-24 h-24 rounded-full object-cover"
                />
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    Welcome, {user.displayName || 'User'}!
                </h1>
                <p className="text-gray-600 mb-6">{user.email}</p>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;
