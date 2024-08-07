import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { FaTimes } from 'react-icons/fa';

function ApplicationForm({ onClose }) {
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [dateApplied, setDateApplied] = useState('');
    const [notes, setNotes] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'applications'), {
                companyName,
                position,
                dateApplied,
                notes,
                location,
                response: 'Review',  // Default response
            });
            setCompanyName('');
            setPosition('');
            setDateApplied('');
            setNotes('');
            setLocation('');
            alert('Application added successfully!');
            onClose();  // Close the modal after submitting
        } catch (error) {
            console.error('Error adding application:', error);
            alert('Failed to add application.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    <FaTimes />
                </button>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4">Add New Application</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Company Name:</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Position:</label>
                        <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Date Applied:</label>
                        <input
                            type="date"
                            value={dateApplied}
                            onChange={(e) => setDateApplied(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Location:</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Notes:</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 transition duration-300"
                        >
                            Add Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ApplicationForm;
