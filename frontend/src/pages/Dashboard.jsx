import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../features/ContactSlice';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { CiSquarePlus } from 'react-icons/ci';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading } = useSelector((state) => state.contacts);
  const { token } = useSelector((state) => state.auth);

  const [showForm, setShowForm] = useState(false); // 👈 controls ContactForm visibility

  useEffect(() => {
    if (!token) navigate('/login');
    else dispatch(fetchContacts());
  }, [dispatch, navigate, token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Contacts</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowForm(!showForm)} // 👈 toggles form on/off
            className="text-blue-600 hover:text-blue-800 text-3xl"
            title="Add Contact"
          >
            <CiSquarePlus />
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 👇 Conditionally render ContactForm when showForm = true */}
      {showForm && <ContactForm />}

      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <ul className="border rounded p-4 bg-gray-50">
          {list.length === 0 ? (
            <p>No contacts found</p>
          ) : (
            list.map((c) => (
              <li key={c._id} className="border-b py-2">
                <strong>{c.name}</strong> — {c.email} — {c.phone}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
