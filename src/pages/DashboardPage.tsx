import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './../utils/firebase';
import { signOut } from 'firebase/auth';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

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

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
                <img
                    src={user?.photoURL ?? undefined}
                    alt="User Avatar"
                    className="mx-auto mb-4 w-24 h-24 rounded-full object-cover"
                />
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    Welcome, {user?.displayName}!
                </h1>
                <p className="text-gray-600 mb-6">{user?.email}</p>

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
