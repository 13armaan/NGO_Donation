import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");   // default role
  const nav = useNavigate();

  async function handleRegister() {
    const res = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),   // send role
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      alert("Registration successful! Please log in.");
      nav("/login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-4 text-purple-800">
          Register
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Role Dropdown */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none bg-white"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={handleRegister}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
