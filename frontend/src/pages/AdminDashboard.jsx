import { useState, useEffect } from "react";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch("http://127.0.0.1:8000/admin/donations")
      .then((res) => res.json())
      .then((data) => setDonations(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Users</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Donations</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.donation_id} className="border-b hover:bg-gray-50">
                  <td className="p-3">₹{donation.amount}</td>
                  <td className="p-3">
                    {new Date(donation.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">{donation.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;