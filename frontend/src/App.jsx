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
