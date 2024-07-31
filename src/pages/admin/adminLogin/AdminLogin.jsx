import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/FirebaseConfig";
import myContext from "../../../context/data/myContext";
// className={` flex items-center ${mode === "dark" ? "text-white" : "text-green-800"}
export default function AdminLogin() {
    const context = useContext(myContext);
    const { mode } = context;

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //* Login Function
    const login = async () => {
        if (!email || !password) {
            return toast.error("Fill all required fields")
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login Success')
            localStorage.setItem('admin', JSON.stringify(result));
            navigate('/dashboard');
        } catch (error) {
            toast.error('Login Failed')
            console.log(error)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div
                className={`w-full max-w-md p-8 rounded-lg shadow-lg ${mode === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
            >
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                        <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png" className="h-20 w-20" alt="Admin Icon" />
                    </div>
                    <h2 className={`text-2xl font-bold ${mode === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Admin Login</h2>
                </div>
                <form className="flex flex-col gap-4">
                    <div>
                        <label 
                       
                               className={`block mb-1 text-sm font-medium ${mode === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}
                        >Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label 
                        
                        className={`block mb-1 text-sm font-medium ${mode === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}
                        >Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={login}
                        className={`w-full py-2 mt-4 rounded-lg ${mode === 'dark' ? 'bg-gray-100 text-gray-800' : 'bg-gray-800 text-gray-100'}`}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}