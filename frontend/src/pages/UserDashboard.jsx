import { useNavigate } from "react-router-dom";

function UserDashboard(){
    const nav=useNavigate();
    const user=JSON.parse(localStorage.getItem("user"));
    console.log(user["user_id"]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-2 text-slate-800">
              Welcome back
            </h2>
      
            <p className="text-center text-slate-500 mb-6">
              {user.email}
            </p>
      
            <div className="space-y-4">
              <button
                onClick={() => nav("/donate")}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Make a Donation
              </button>
      
              <button
                onClick={() => nav("/history")}
                className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
              >
                View Donation History
              </button>
      
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  nav("/");
                }}
                className="w-full text-red-600 py-2 font-medium hover:underline"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      );
      
}
export default UserDashboard;