import React, { useState } from 'react';
import ApplicationList from './ApplicationList';
import ApplicationForm from './ApplicationForm';
import { FaSignOutAlt, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AuthProvider, useAuth } from './AuthProvider'; 

function App() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { user, handleSignIn, handleSignOut } = useAuth();

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col">
            {user ? (
                <div className="flex flex-col flex-1">
                    <header className="bg-teal-600 p-4 px-6 sm:px-12 md:px-20 text-white shadow-lg flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <img src={user.photoURL} alt="User" className="w-12 h-12 rounded-full" />
                            <h1 className="text-xl font-bold">Welcome, {user.displayName}!</h1>
                        </div>
                        <button 
                            onClick={handleSignOut} 
                            className="flex items-center bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition duration-300"
                        >
                            <FaSignOutAlt className="mr-2" /> Sign Out
                        </button>
                    </header>
                    <main className="p-4 flex-1">
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => setIsFormOpen(true)}
                                className="flex items-center bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 transition duration-300"
                            >
                                <FaPlus className="mr-2" /> Add Application
                            </button>
                        </div>
                        {isFormOpen && <ApplicationForm onClose={() => setIsFormOpen(false)} />}
                        <ApplicationList />
                    </main>
                </div>
            ) : (
                <div className="flex items-center justify-center flex-1 p-4">
                    <motion.div
                        className="text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold mb-4 text-teal-700">Welcome Back!</h1>
                        <p className="text-lg mb-6 text-gray-800">
                            Sign in to continue tracking your applications and stay organized.
                        </p>
                        <button 
                            onClick={handleSignIn} 
                            className="bg-teal-600 px-6 py-3 rounded text-white hover:bg-teal-700 w-full transition duration-300"
                        >
                            <FaPlus className="mr-2 inline" /> Sign in with Google
                        </button>
                        <p className="text-sm mt-4 text-gray-600">
                            By logging in or signing up using the options above, you agree to our <a href="/terms" className="text-teal-500 hover:underline">Terms & Conditions</a> and <a href="/privacy" className="text-teal-500 hover:underline">Privacy Policy</a>.
                        </p>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export default function MainApp() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}
