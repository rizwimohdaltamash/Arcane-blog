import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { FaSun, FaMoon,FaBars } from "react-icons/fa"; // Assuming these icons for light/dark mode
import myContext from "../../context/data/myContext"; // Assuming your context import
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { fireDb } from "../../firebase/FirebaseConfig";
import SearchDialog from "../searchDialog/SearchDialog";
import { DiMagento } from "react-icons/di";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FiLogIn } from "react-icons/fi";
import { GoGoal } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";

export default function Nav() {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fileInputRef = useRef(null);
  const context = useContext(myContext);
  const {
    mode,
    toggleMode,
    isLoggedin,
    setIsLoggedin,
    profilePic,
    setProfilePic,
  } = context;


  const navigate = useNavigate();
  const auth = getAuth();
  const storage = getStorage();

  const logout = () => {
    auth.signOut().then(() => {
      setIsLoggedin(false);
      navigate("/"); // Redirect to home after logout
    });
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const storageRef = ref(storage, `profile_pics/${file.name}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setProfilePic(url);

          // Update Firestore with the new profile picture URL
          const userDoc = doc(fireDb, "users", auth.currentUser.uid);
          updateDoc(userDoc, { profilePic: url })
            .then(() => {
              console.log("Profile picture updated in Firestore");
              setDropdownOpen(false); // Hide the dropdown
            })
            .catch((error) => {
              console.error("Error updating profile picture: ", error);
            });
        });
      });
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedin(true);

        // Fetch user profile picture from Firestore
        const userDoc = doc(fireDb, "users", user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setProfilePic(docSnap.data().profilePic);
        } else {
          console.log("No such document!");
        }
      } else {
        setIsLoggedin(false);
      }
    });

    return () => unsubscribe();
  }, [auth, setIsLoggedin, setProfilePic]);

  const handleIconClick = () => {
    if (isLoggedin) {
      setDropdownOpen(!dropdownOpen);
    }
  };

  const handleDashboardClick = () => {
    setDropdownOpen(false);
    navigate("/dashboard");
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:justify-end justify-center lg:gap-6 lg:w-[90%] w-auto">
      <li className="p-1 font-normal">
        <Link
          to={"/"}
          className={` flex items-center ${
            mode === "dark"
              ? "text-white hover:text-gray-200"
              : "text-green-800 hover:text-black"
          } `}
        >
          Home
        </Link>
      </li>
      <li className="p-1 font-normal">
        <Link
          to={"/allblogs"}
          className={` flex items-center ${
            mode === "dark"
              ? "text-white hover:text-gray-200"
              : "text-green-800 hover:text-black"
          } `}
        >
          Blogs
        </Link>
      </li>
      {!isLoggedin && (
        <div className="flex flex-row gap-3">
          <li className="p-1 font-normal">
            <Link
              to={"/adminlogin"}
              className={` flex items-center ${
                mode === "dark"
                  ? "text-white hover:text-gray-200"
                  : "text-green-800 hover:text-black"
              } `}
            >
              Login
            </Link>
          </li>
          <li className="p-1 font-normal">
            <Link
              to={"/register"}
              className={` flex items-center ${
                mode === "dark"
                  ? "text-white hover:text-gray-200"
                  : "text-green-800 hover:text-black"
              } `}
            >
              Register
            </Link>
          </li>
        </div>
      )}

      {isLoggedin && (
        <li className="p-1 font-normal">
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-md hover:bg-gradient-to-r hover:from-green-600 hover:to-green-800 hover:shadow-lg transition-all duration-300"
          >
            Logout
          </button>
        </li>
      )}
    </ul>
  );

  return (
    <nav
      className={`sticky top-0 z-20 ${
        mode === "dark"
          ? "bg-gray-800"
          : "bg-gradient-to-r from-green-400 via-green-100 to-green-300"
      } py-2 px-4 flex items-center justify-between`}
    >
      <div
        className={`flex items-center w-[45%] ${
          mode === "dark" ? "text-white" : "text-green-900"
        }`}
      >
        <DiMagento size={33} />
        <span className="lg:ml-2 lg:text-2xl text-lg lg:font-bold">Arcane Blogs</span>
      </div>

      <div className="hidden lg:flex items-center justify-center lg:w-full">
        {navList}
      </div>

      <div className="lg:flex lg:flex-row gap-4 items-center md:justify-end  lg:w-[15%] lg:h-14 w-[40%] flex ">
        {/* Search */}
        {/* className={`${mode === "dark" ? "text-white" : "text-green-900"}`} */}

        <SearchDialog />

        {/* Dashboard */}
        {isLoggedin && (
          <div className="">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleProfilePicChange}
            />
            <img
              src={profilePic}
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-white cursor-pointer object-cover"
              style={{
                borderColor:
                  mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
              }}
              onClick={handleIconClick}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <ul className="py-1 text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Change Profile Pic
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleDashboardClick}
                  >
                    Dashboard
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Theme Changer */}
        <div>
          {mode === "light" ? (
            <button
              className="bg-green-400 text-black rounded-full p-2 shadow-md"
              onClick={toggleMode}
            >
              <FaSun size={20} />
            </button>
          ) : (
            <button
              className="bg-gray-800 text-white rounded-full p-2 shadow-md"
              onClick={toggleMode}
            >
              <FaMoon size={20} />
            </button>
          )}
        </div>
      </div>

      

      {/* Sidebar toggle button for small screens */}
      <button
        
        className={`lg:hidden p-2 ${
          mode === "dark" ? "text-white" : "text-green-900"
        }`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar for small screens */}
      {sidebarOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-40 h-full bg-gray-800 text-white z-30 flex flex-col p-4">
          <button
            className="self-end mb-4"
            onClick={() => setSidebarOpen(false)}
          >
            <MdOutlineCancel size={20} />
          </button>
          <Link to="/" className="flex items-center mb-4">
            <IoHomeOutline />
            <span className="ml-2">Home</span>
          </Link>
          <Link to="/allblogs" className="flex items-center mb-4">
            <CgProfile />
            <span className="ml-2">Blogs</span>
          </Link>
          {!isLoggedin && (
            <>
              <Link to="/adminlogin" className="flex items-center mb-4">
              <FiLogIn />
                <span className="ml-2">Login</span>
              </Link>
              <Link to="/register" className="flex items-center mb-4">
                <GoGoal />
                <span className="ml-2">Register</span>
              </Link>
            </>
          )}
          {isLoggedin && (
            <button
              onClick={logout}
              className="flex items-center mb-4 bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-green-600 hover:to-green-800 hover:shadow-lg transition-all duration-300"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}