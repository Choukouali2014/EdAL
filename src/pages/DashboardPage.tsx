import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './../utils/firebase';
import { signOut } from 'firebase/auth';
import { useUserProfile } from './../utils/useUserProfile';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, profile, loading } = useUserProfile();

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
                    Welcome, {user?.displayName ?? `${profile?.firstName} ${profile?.lastName}`}!
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
