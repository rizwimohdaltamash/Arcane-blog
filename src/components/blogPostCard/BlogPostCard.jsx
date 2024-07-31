import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import { useNavigate } from "react-router-dom";

import DOMPurify from 'dompurify';
function BlogPostCard() {
  const context = useContext(myContext);
  const { mode, getAllBlog } = context;
  const navigate = useNavigate();

  return (
    <div>
      <section className="text-gray-600  bg-opacity-50 body-font md:h-[75vh] overflow-y-auto no-scrollbar" style={{ background: mode === "dark" ? "rgb(33, 44, 39)" : 'linear-gradient(to right, #6B8E23, #49a078)'  }}>
        <div className="container px-5 py-10 mx-auto max-w-7xl ">
          {/* Main Content  */}
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            {/* Card 1  */}
            {getAllBlog.length > 0 ? (
              <>
                {getAllBlog.map((item, index) => {
                  console.log(item);
                  const { thumbnail, date, id } = item;
                  return (
                    <div className="p-4 md:w-1/3" key={index}>
                      <div
                        style={{
                          background:
                            mode === "dark" ? "rgb(30, 41, 59)" : "white",
                          borderBottom:
                            mode === "dark"
                              ? " 4px solid rgb(226, 232, 240)"
                              : "4px solid rgb(0, 77, 0)",
                        }}
                        className={`h-full shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                          ${mode === "dark" ? "shadow-gray-700" : "shadow-xl "} 
                          rounded-xl overflow-hidden`}
                      >
                        {/* Blog Thumbnail  */}
                        <img
                          onClick={() => navigate(`/bloginfo/${id}`)}
                          className="w-full"
                          src={thumbnail}
                          alt="blog"
                        />

                        {/* Top Items  */}
                        <div className="p-6">
                          {/* Blog Date  */}
                          <h2
                            className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                            style={{
                              color:
                                mode === "dark"
                                  ? "rgb(226, 232, 240)"
                                  : " rgb(30, 41, 59)",
                            }}
                          >
                            {date}
                          </h2>

                          {/* Blog Title  */}
                          <h1
                            className="title-font text-lg font-bold text-gray-900 mb-3"
                            style={{
                              color:
                                mode === "dark"
                                  ? "rgb(226, 232, 240)"
                                  : " rgb(30, 41, 59)",
                            }}
                          >
                            {item.blogs.title}
                          </h1>

                          {/* Blog Description */}
                          <p
                            className="leading-relaxed mb-3"
                            style={{
                              color:
                                mode === "dark"
                                  ? "rgb(226, 232, 240)"
                                  : " rgb(30, 41, 59)",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(item.blogs.content),
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <h1>Not Found</h1>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPostCard;