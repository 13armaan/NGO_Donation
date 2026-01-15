import { useState,useEffect } from "react";

function History(){
    const user=JSON.parse(localStorage.getItem("user"));
    
    console.log(user.user_id);
    const [donations,setDonation]=useState([]);
    
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/my_donations/${user.user_id}`)
        .then(res => res.json())
        .then(data => setDonation(data));
    },[]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              My Donations
            </h2>
      
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-slate-600">
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
      
              <tbody>
                {Array.isArray(donations) && donations.map(d => (
                  <tr
                    key={d.donation_id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="p-3 font-medium">₹{d.amount}</td>
      
                    <td className="p-3 text-slate-500">
                      {d.created_at
                        ? new Date(d.created_at).toLocaleString()
                        : "NA"}
                    </td>
      
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium
                        ${d.status === "success" && "bg-green-100 text-green-700"}
                        ${d.status === "failed" && "bg-red-100 text-red-700"}
                        ${d.status === "pending" && "bg-yellow-100 text-yellow-700"}
                      `}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      

}
export default History;