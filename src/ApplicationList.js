import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { FaTrash } from 'react-icons/fa';

function ApplicationList() {
    const [applications, setApplications] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'applications'));
                const apps = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setApplications(apps);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'applications', id));
            setApplications(applications.filter((app) => app.id !== id));
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    const handleResponseChange = async (id, response) => {
        try {
            const appDoc = doc(db, 'applications', id);
            await updateDoc(appDoc, { response });
            setApplications(applications.map((app) =>
                app.id === id ? { ...app, response } : app
            ));
        } catch (error) {
            console.error('Error updating response:', error);
        }
    };

    const getResponseColor = (response) => {
        switch (response) {
            case 'Review':
                return 'bg-yellow-200';
            case 'Accept':
                return 'bg-green-200';
            case 'Reject':
                return 'bg-red-200';
            case 'Coding Round Complete':
                return 'bg-blue-200';
            case 'Interview Round Complete':
                return 'bg-purple-200';
            default:
                return 'bg-white';
        }
    };

    const filteredApplications = filter === 'All' ? applications : applications.filter(app => app.response === filter);

    const applicationCount = filteredApplications.length;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Application List (Total: {applicationCount})</h2>
            <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                    {['All', 'Review', 'Accept', 'Reject', 'Coding Round Complete', 'Interview Round Complete'].map(category => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-4 py-2 rounded ${filter === category ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} hover:bg-blue-600 transition duration-300`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredApplications.map((app) => (
                    <div key={app.id} className={`p-4 shadow rounded ${getResponseColor(app.response)} transition duration-300`}>
                        <h3 className="text-lg font-bold mb-2">{app.companyName}</h3>
                        <p className="mb-2"><strong>Position:</strong> {app.position}</p>
                        <p className="mb-2"><strong>Date Applied:</strong> {app.dateApplied}</p>
                        <p className="mb-2"><strong>Location:</strong> {app.location}</p>
                        <p className="mb-2"><strong>Notes:</strong> {app.notes}</p>
                        <div className="flex justify-between items-center mt-2">
                            <select
                                value={app.response}
                                onChange={(e) => handleResponseChange(app.id, e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                            >
                                <option value="Review">Review</option>
                                <option value="Accept">Accept</option>
                                <option value="Reject">Reject</option>
                                <option value="Coding Round Complete">Coding Round Complete</option>
                                <option value="Interview Round Complete">Interview Round Complete</option>
                            </select>
                            <button
                                onClick={() => handleDelete(app.id)}
                                className="flex items-center bg-red-500 px-2 py-1 text-white rounded hover:bg-red-600 transition duration-300"
                            >
                                <FaTrash className="mr-2" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ApplicationList;
