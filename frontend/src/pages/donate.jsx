import { useState } from "react";

function Donate(){
    const[amount,setAmount]=useState("");
    const user=JSON.parse(localStorage.getItem("user"));
    const [loading, setLoading] = useState(false);
    
    console.log(user.user_id);
    async function handleDonate(){
        setLoading(true);
        const res = await fetch("http://127.0.0.1:8000/donate",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                user_id:user.user_id,
                amount:parseFloat(amount)
            })
        });

        const data=await res.json();
        alert("Donation created with ID "+data.donation_id);
        const id=data.donation_id;
        const amt=parseFloat(amount);
        console.log("Sending:", { id,amt});
        console.log(typeof id, id);

        StartPayment(String(data.donation_id),parseFloat(amount));
        setLoading(false);
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-2 text-slate-800">
              Make a Donation
            </h2>
      
            <p className="text-sm text-center text-slate-500 mb-6">
              Support our NGO with a secure contribution
            </p>
      
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[100, 500, 1000].map(v => (
                <button
                  key={v}
                  onClick={() => setAmount(v)}
                  className="border rounded-lg py-2 font-medium hover:bg-blue-50"
                >
                  ₹{v}
                </button>
              ))}
            </div>
      
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
      
            <button
              disabled={loading}
              onClick={handleDonate}
              className={`w-full py-3 rounded-lg font-medium text-white transition
                ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {loading ? "Processing..." : "Donate Securely"}
            </button>
          </div>
        </div>
      );
      
}
async function StartPayment(donation_id, amount) {
  const res = await fetch("http://127.0.0.1:8000/create-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      donation_id: String(donation_id),
      amount: Number(amount),
    }),
  });
  const user=JSON.parse(localStorage.getItem("user"));
  const data = await res.json();

  const options = {
    key: data.key,
    amount: data.amount * 100,
    currency: "INR",
    name: "NGO Donations",
    order_id: data.order_id,
  
    method: {
      upi: true,
      card: true,
      netbanking: true,
      wallet: true,
    },
  
    prefill: {
      name: user.name,
      email: user.email,
    },
  
    theme: { color: "#3399cc" },
  
    handler: async function (response) {
      await fetch(`http://127.0.0.1:8000/update-payment-status?donation_id=${donation_id}`, {
        method: "POST",
      });
      alert("Payment complete");
    }
  };
  
    
        const rzp = new Razorpay(options);
        rzp.open();
        
      }
    
    
    

export default Donate;
