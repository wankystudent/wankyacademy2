
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { auth, db } from '../services/paymentFirebase';
import { Lock, LogOut, Loader2, MessageCircle, DollarSign, CreditCard } from 'lucide-react';

interface Order {
  id: string;
  orderId: string;
  toolName: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  whatsapp: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetchingOrders, setFetchingOrders] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) fetchOrders();
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Login failed: " + (error as Error).message);
    }
  };

  const handleLogout = () => signOut(auth);

  const fetchOrders = async () => {
    setFetchingOrders(true);
    try {
      const q = query(
        collection(db, "orders"), 
        where("paymentStatus", "==", "paid"),
        // Note: Compound queries might require an index. If so, remove orderBy for now or create index.
        // orderBy("createdAt", "desc") 
      );
      const querySnapshot = await getDocs(q);
      const ordersData: Order[] = [];
      querySnapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() } as Order);
      });
      // Sort manually if index missing
      ordersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setFetchingOrders(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-900 p-3 rounded-full text-white"><Lock className="w-6 h-6" /></div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" 
              placeholder="Admin Email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Paid Orders</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow text-red-600 hover:bg-red-50">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {fetchingOrders ? (
           <div className="text-center py-12"><Loader2 className="animate-spin w-8 h-8 mx-auto" /></div>
        ) : orders.length === 0 ? (
           <div className="bg-white p-12 rounded-xl shadow text-center text-gray-500">No paid orders found yet.</div>
        ) : (
           <div className="bg-white rounded-xl shadow overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-gray-100 text-gray-600 text-xs uppercase font-bold">
                   <tr>
                     <th className="p-4">Order ID</th>
                     <th className="p-4">Tool</th>
                     <th className="p-4">Amount</th>
                     <th className="p-4">Method</th>
                     <th className="p-4">Date</th>
                     <th className="p-4">WhatsApp</th>
                     <th className="p-4">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y">
                   {orders.map((order) => (
                     <tr key={order.id} className="hover:bg-gray-50">
                       <td className="p-4 font-mono text-xs font-bold text-gray-700">{order.orderId}</td>
                       <td className="p-4 font-bold">{order.toolName}</td>
                       <td className="p-4 text-green-600 font-bold">${order.amount}</td>
                       <td className="p-4">
                         <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold uppercase ${order.paymentMethod === 'stripe' ? 'bg-indigo-100 text-indigo-700' : 'bg-blue-100 text-blue-700'}`}>
                           {order.paymentMethod === 'stripe' ? <CreditCard className="w-3 h-3" /> : <DollarSign className="w-3 h-3" />} {order.paymentMethod}
                         </span>
                       </td>
                       <td className="p-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                       <td className="p-4 font-mono text-sm">{order.whatsapp}</td>
                       <td className="p-4">
                         <a 
                           href={`https://wa.me/${order.whatsapp.replace(/\D/g, '')}`} 
                           target="_blank"
                           className="inline-flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-green-600"
                         >
                           <MessageCircle className="w-4 h-4" /> Chat
                         </a>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
