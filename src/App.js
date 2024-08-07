import React, { useEffect, useState } from 'react';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from './firebase';
import ApplicationList from './ApplicationList';
import ApplicationForm from './ApplicationForm';
import { FaSignOutAlt, FaPlus } from 'react-icons/fa';

function App() {
    const [user, setUser] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleSignIn = () => {
        console.log("Sign in with Google clicked");
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                console.log("User signed in: ", result.user);
            })
            .catch((error) => {
                console.error('Error signing in with Google:', error);
                alert('Error signing in with Google');
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {user ? (
                <div className="flex flex-col flex-1">
                    <header className="bg-blue-600 p-4 text-white shadow-lg flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full" />
                            <h1 className="text-xl font-bold">Welcome, {user.displayName}!</h1>
                        </div>
                        <button onClick={() => auth.signOut()} className="flex items-center bg-red-500 px-4 py-2 mt-4 md:mt-0 rounded text-white hover:bg-red-600">
                            <FaSignOutAlt className="mr-2" /> Sign Out
                        </button>
                    </header>
                    <main className="p-4 flex-1">
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => setIsFormOpen(true)}
                                className="flex items-center bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 transition duration-300"
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
                    <div className="text-center bg-white p-6 rounded shadow-md w-full max-w-sm">
                        <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
                        <button onClick={handleSignIn} className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 w-full">Sign in with Google</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
