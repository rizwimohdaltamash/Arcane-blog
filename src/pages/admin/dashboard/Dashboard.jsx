import React, { useContext, useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import myContext from "../../../context/data/myContext";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Dashboard() {
  const auth = getAuth();
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { profilePic } = useContext(myContext);
  const { mode, getAllBlog, deleteBlogs, isLoggedin, setIsLoggedin } = context;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
        navigate("/adminlogin"); // Redirect to login if not logged in
      }
    });

    return () => unsubscribe();
  }, [auth, navigate, setIsLoggedin]);

  if (!isLoggedin) {
    return null; // Render nothing if not logged in
  }

  const user = auth.currentUser;
  const userBlogs = getAllBlog.filter(
    (blog) => blog.uid === user.uid || blog.email === user.email
  );



  return (
    <Layout>
      {/* style={{ background: mode === "dark" ? "rgb(33, 44, 39)" : 'linear-gradient(to right, #1a759f3, #2d6a4f)'  }} */}
      <div className="py-10  h-[100vh]  " style={{ background: mode === "dark" ? "rgb(33, 44, 39)" : "linear-gradient(to right, #49a078, #d4d700)"  }}>
        <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
          <div className="left">
            <img
              className="w-40 h-40 object-cover rounded-full border-2 border-green-700 p-1"
              src={profilePic}
              alt="profile"
            />
          </div>
          <div className="right">
            <h1
              className="font-bold text-2xl mb-2"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              {user.displayName}
            </h1>
            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              {user.email}
            </h2>
            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              <span>Total Blog : </span> {userBlogs.length}
            </h2>
            <div className="flex gap-2 mt-2">
              <Link to={"/createblog"}>
                <div className="mb-2 ">
                  <button
                    style={{
                      background:
                        mode === "dark"
                          ? "rgb(226, 232, 240)"
                          : "linear-gradient(to right, #90EE90, #2c5282)",
                      color: mode === "dark" ? "black" : "white",
                    }}
                    className="px-8 py-2 rounded-md"
                  >
                    Create Blog
                  </button>
                </div>
              </Link>
              
            </div>
          </div>
        </div>

        {/* Line  */}
        <hr
          className={`border-2 ${
            mode === "dark" ? "border-gray-300" : "border-gray-400"
          }`}
        />

        {/* Table  */}
        <div className="">
          <div className="container mx-auto px-4 max-w-7xl my-5">
            <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
              {/* table  */}
              <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
                {/* thead  */}
                <thead
                  style={{
                    background: mode === "dark" ? "white" : "linear-gradient(to right, #6B8E23, #2c5282)",
                  }}
                  className="text-xs"
                >
                  <tr>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      S.No
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Thumbnail
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Title
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Category
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Date
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                {/* tbody  */}
                {userBlogs.length > 0 ? (
                  <>
                    {userBlogs.map((item, index) => {
                      const { thumbnail, date, id } = item;
                      return (
                        <tbody key={index}>
                          <tr
                            className="border-b-2"
                            style={{
                              background:
                                mode === "dark" ? "rgb(30, 41, 59)" : "white",
                            }}
                          >
                            {/* S.No   */}
                            <td
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              className="px-6 py-4"
                            >
                              {index + 1}.
                            </td>

                            {/* Blog Thumbnail  */}
                            <th
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              scope="row"
                              className="px-6 py-4 font-medium"
                            >
                              <img
                                className="w-16 rounded-lg"
                                src={thumbnail}
                                alt="thumbnail"
                              />
                            </th>

                            {/* Blog Title  */}
                            <td
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              className="px-6 py-4"
                            >
                              {item.blogs.title}
                            </td>

                            {/* Blog Category  */}
                            <td
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              className="px-6 py-4"
                            >
                              {item.blogs.category}
                            </td>

                            {/* Blog Date  */}
                            <td
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              className="px-6 py-4"
                            >
                              {date}
                            </td>

                            {/* Delete Blog  */}
                            <td
                              onClick={() => deleteBlogs(id)}
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              className="px-6 py-4"
                            >
                              <button className="px-4 py-1 rounded-lg text-white font-bold bg-red-500">
                                Delete
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </>
                ) : (
                  <tbody>
                    <tr>
                      <td
                        colSpan="6"
                        style={{ color: mode === "dark" ? "white" : "black" }}
                        className="px-6 py-4 text-center"
                      >
                        No blogs found
                        {/* dangerouslySetInnerHTML={{ __html: item.blogs.content }} // Ensure content is safe */}
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;