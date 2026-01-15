import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Donate from "./pages/donate";
import RequireAuth from "./components/RequireAuth";
import History from "./pages/donation_history";
function App() {
 

  return (
  <BrowserRouter>
  <div className="flex justify-between items-center mb-8">
  <h1 className="text-2xl font-bold text-slate-800">
    NGO Donations
  </h1>

  <div className="flex gap-4 text-sm font-medium">
    <a href="/" className="text-blue-600 hover:underline">Donate</a>
    <a href="/history" className="text-blue-600 hover:underline">History</a>
    <a href="/admin" className="text-blue-600 hover:underline">Admin</a>
  </div>
</div>

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" 
      element={
      <RequireAuth>
        <UserDashboard />
      </RequireAuth>
      } />
      <Route path="/admin" 
       element={
        <RequireAuth>
          <AdminDashboard/>
        </RequireAuth>
        } />
      <Route path="/donate" 
       element={
        <RequireAuth>
          <Donate />
        </RequireAuth>
        } />
      <Route path="/history" 
      element={
        <RequireAuth>
          <History />
        </RequireAuth>
      }
      />
    </Routes>
  </BrowserRouter>
);
}

export default App;
