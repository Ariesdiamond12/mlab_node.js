import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

function SuperAdmins() {
  const [admins, setAdmins] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [error, setError] = useState(null);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admins"); // Endpoint to fetch employees
      setAdmins(response.data); // Adjust response.data if necessary based on API response
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const addAdmin = async () => {
    try {
      const newAdmin = { email: newAdminEmail };
      await axios.post("http://localhost:3000/addAdmin", newAdmin); // Endpoint to add an employee
      setNewAdminEmail("");
      fetchAdmins();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 justify-center items-center">
        <div className="p-4 bg-white rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4 text-center">
            Manage General Admins
          </h2>

          {/* Add new admin form */}
          <div className="mt-4 flex flex-col items-center">
            <input
              type="email"
              placeholder="New admin email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <button
              onClick={addAdmin}
              className="p-2 bg-[#003356] text-white rounded w-full"
            >
              Add Admin
            </button>
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-center">
              Current General Admins
            </h3>
            <ul>
              {admins.map((admin) => (
                <li
                  key={admin.id}
                  className="flex justify-between p-2 border-b"
                >
                  <span>{admin.email}</span>
                  <button className="text-red-500">Remove</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdmins;
