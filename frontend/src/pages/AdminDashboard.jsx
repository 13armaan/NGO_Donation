import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const nav = useNavigate();
  const [donations, setDonations] = useState([]);
  const [minAmount, setMinAmount] = useState("");
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
const [showFilters, setShowFilters] = useState(false);
const [userFromDate, setUserFromDate] = useState("");
const [userToDate, setUserToDate] = useState("");
const [showUserFilters, setShowUserFilters] = useState(false);

const [stats, setStats] = useState({
  total_users: 0,
  total_donations: 0,
  success: 0,
  pending: 0,
  failed: 0
});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch("http://127.0.0.1:8000/admin/donations")
      .then((res) => res.json())
      .then((data) => setDonations(data));
      fetch("http://127.0.0.1:8000/admin/stats")
      .then(res => res.json())
      .then(data => setStats(data));
    
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    nav("/");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-8">
  <h2 className="text-2xl font-bold text-gray-800">
    Admin Dashboard
  </h2>

  <button
    onClick={handleLogout}
    className="bg-red-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-red-700 transition shadow"
  >
    Logout
  </button>
  <div className="grid grid-cols-4 gap-4 mb-8">
  <div className="bg-purple-100 p-4 rounded-xl">
    <p className="text-sm text-purple-600">Users</p>
    <p className="text-2xl font-bold">{stats.total_users}</p>
  </div>

  <div className="bg-green-100 p-4 rounded-xl">
    <p className="text-sm text-green-600">Total ₹</p>
    <p className="text-2xl font-bold">₹{stats.total_amount}</p>
  </div>

  <div className="bg-blue-100 p-4 rounded-xl">
    <p className="text-sm text-blue-600">Success</p>
    <p className="text-2xl font-bold">{stats.success}</p>
  </div>

  <div className="bg-red-100 p-4 rounded-xl">
    <p className="text-sm text-red-600">Failed</p>
    <p className="text-2xl font-bold">{stats.failed}</p>
  </div>
  <div className="bg-red-100 p-4 rounded-xl">
    <p className="text-sm text-yellow-600">Pending</p>
    <p className="text-2xl font-bold">{stats.pending}</p>
  </div>
</div>

</div>
        <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
  <h3 className="text-xl font-semibold">Users</h3>

  <button
    onClick={() => setShowUserFilters(!showUserFilters)}
    className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
  >
    🔍 Filter
  </button>
</div>
          <button
  onClick={() => window.open("http://127.0.0.1:8000/admin/export/users")}
  className="bg-blue-600 text-white px-4 py-2 rounded mb-3"
>
  Export Users CSV
</button>
{showUserFilters && (
  <div className="bg-gray-100 p-4 rounded-lg mb-4 flex gap-4">
    <input
      type="date"
      className="border p-2 rounded"
      value={userFromDate}
      onChange={(e) => setUserFromDate(e.target.value)}
    />

    <input
      type="date"
      className="border p-2 rounded"
      value={userToDate}
      onChange={(e) => setUserToDate(e.target.value)}
    />

    <button
      
      onClick={() => {
        fetch(
          `http://127.0.0.1:8000/admin/users/filter?from_date=${userFromDate}&to_date=${userToDate}`
        )
          .then(res => res.json())
          .then(data => setUsers(data));
      }}
      className="bg-purple-600 text-white px-4 rounded"
    >
      Apply
    </button>
    
  </div>
)}


          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">Name</th>
                <th className="p-3">Date</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">
                    {new Date(user.created_at).toLocaleString()}
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
        <div className="flex justify-between items-center mb-4">
  <h3 className="text-xl font-semibold">Donations</h3>

  <button
    onClick={() => setShowFilters(!showFilters)}
    className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
  >
    🔍 Filter
  </button>
</div>

          <button
  onClick={() => window.open("http://127.0.0.1:8000/admin/export/donations")}
  className="bg-green-600 text-white px-4 py-2 rounded mb-3"
>
  Export Donations CSV
</button>


  {showFilters && (
  <div className="bg-gray-100 p-4 rounded-lg mb-4 flex gap-4">
    <input
      type="number"
      placeholder="Min Amount"
      className="border p-2 rounded"
      value={minAmount}
      onChange={(e) => setMinAmount(e.target.value)}
    />

    <input
      type="date"
      className="border p-2 rounded"
      value={fromDate}
      onChange={(e) => setFromDate(e.target.value)}
    />

    <input
      type="date"
      className="border p-2 rounded"
      value={toDate}
      onChange={(e) => setToDate(e.target.value)}
    />

<button
  onClick={() => {
    fetch(
      `http://127.0.0.1:8000/admin/donations/filter?min_amount=${minAmount}&from_date=${fromDate}&to_date=${toDate}`
    )
      .then(res => res.json())
      .then(data => setDonations(data));
  }}
  className="bg-purple-600 text-white px-4 rounded"
>
  Apply
</button>
  </div>
)}

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Email</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(donations) && donations.map((donation) => (
                <tr key={donation.donation_id} className="border-b hover:bg-gray-50">
                  <td className="p-3">₹{donation.amount}</td>
                  <td className="p-3">
                    {new Date(donation.created_at).toLocaleString()}
                  </td>
                  <td className="p-3">{donation.status}</td>
                  <td className="p-3">{donation.users.email}</td>
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