import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { fireDb } from '../../../firebase/FirebaseConfig';
import { setDoc, doc } from "firebase/firestore";
import myContext from "../../../context/data/myContext";
// className={` flex items-center ${mode === "dark" ? "text-white" : "text-green-800"}`}
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const context = useContext(myContext);
  const { mode } = context;

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(fireDb, "users", user.uid), {
        name,
        email,
        uid: user.uid,
        
      }).then(() => {
        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "https://picsum.photos/200"
          }).then(() => {
            navigate('/dashboard');
          }).catch((error) => {
            setError(error);
          });
      });
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div 
    // className="flex justify-center items-center min-h-screen bg-gray-100"
    className={`flex justify-center items-center min-h-screen ${mode === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label 
            className="block mb-2 text-sm font-medium "
                  //  className={` block mb-2 text-sm font-medium ${mode === "dark" ? "text-white" : "text-green-800"}`}
            >Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-green-700 text-white p-3 rounded-lg hover:bg-green-900 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;