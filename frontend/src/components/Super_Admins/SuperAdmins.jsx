import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { db } from '../../../config/firebase'; 
import { collection, addDoc, getDocs } from 'firebase/firestore';

function SuperAdmins() {
  const [admins, setAdmins] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [error, setError] = useState(null);

  const fetchAdmins = async () => {
    const querySnapshot = await getDocs(collection(db, 'generalAdmins'));
    const adminsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAdmins(adminsList);
  };


  const addAdmin = async () => {
    try {
      const newAdmin = { email: newAdminEmail };
      await addDoc(collection(db, 'generalAdmins'), newAdmin);
      setNewAdminEmail('');
      fetchAdmins(); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='bg-gray-300'>
      <Sidebar />
      <div className='p-4'>
        <h2 className='text-xl font-bold'>Manage General Admins</h2>
        
        {/* Add new admin form */}
        <div className='mt-4'>
          <input
            type='email'
            placeholder='New admin email'
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            className='border p-2 rounded'
          />
          <button
            onClick={addAdmin}
            className='ml-2 p-2 bg-blue-500 text-white rounded'
          >
            Add Admin
          </button>
          {error && <p className='text-red-500 mt-2'>{error}</p>}
        </div>
        
        <div className='mt-6'>
          <h3 className='text-lg font-semibold'>Current General Admins</h3>
          <ul>
            {admins.map((admin) => (
              <li key={admin.id} className='flex justify-between p-2 border-b'>
                <span>{admin.email}</span>
                <button className='text-red-500'>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SuperAdmins;
