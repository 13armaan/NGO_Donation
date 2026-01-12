import { useEffect,useState } from "react";

function AdminDashboard(){
    const[users,setUsers]=useState([]);
    const[donations,setDonations]=useState([]);
    const[stats,setStats]=useState({});
    const user=JSON.parse(localStorage.getItem("user"));
    
    console.log(user.user_id);

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/admin/donations")
        .then(res=>res.json())
        .then(d=>setDonations(d));

        fetch("http://127.0.0.1:8000/admin/users")
        .then(res=>res.json())
        .then(d=>setUsers(d));
        
        fetch("http://127.0.0.1:8000/admin/stats")
        .then(res=>res.json())
        .then(d=>setStats(d));
        
    },[]);

    return(
        <div>
            <h2>Admin Dashboard</h2>
            <h3>Stats</h3>
            <p>Total Amount Recieved: ${stats.total}</p>
            <p>Total successful payments: ${stats.success}</p>
            <p>Total Pending payments: ${stats.pending}</p>
            <p>Total Failed Payments ${stats.failed}</p>
            
            <h3>Users</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>User id</th>
                        <th>email</th>
                        <th>created at</th>
                        <th>role</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) && users.map(u=>(
                        <tr key={u.id}>
                             <td>{u.id}</td>
                            <td>{u.email}</td>
                            <td>{u.created_at ? new Date(u.created_at).toLocaleString(): "NA"}</td>
                            <td>{u.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Donations</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>User id</th>
                        <th>Amount</th>
                        <th>created at</th>
                        <th>Status</th>
                        <th>user email</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(donations) && donations.map(d=>(
                        <tr key={d.donation_id}>
                             <td>{d.user_id}</td>
                            <td>{d.amount}</td>
                            <td>{d.created_at ? new Date(d.created_at).toLocaleString(): "NA"}</td>
                            <td>{d.status}</td>
                            <td>{d.users.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}
export default AdminDashboard;