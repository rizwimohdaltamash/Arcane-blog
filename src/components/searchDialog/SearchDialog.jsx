import React, { Fragment, useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import myContext from "../../context/data/myContext";
import { useNavigate } from "react-router-dom";

export default function SearchDialog() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const navigate=useNavigate(); 

    const context = useContext(myContext);
    const { mode, searchkey,setSearchkey, getAllBlog } = context;
    
   
      

    return (
        <Fragment >
            {/* Search Icon */}
            <div onClick={handleOpen} className={`cursor-pointer ${mode === "dark" ? "text-white" : "text-green-800"}`}>
                <AiOutlineSearch size={25}  />
            </div>

            {/* Dialog */}
            {open && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={handleOpen}></div>
                    <div className="relative bg-gray-800 p-6 rounded-lg max-w-md w-full">
                        {/* Close Button */}
                        <button onClick={handleOpen} className="absolute top-2 right-2 text-white hover:text-gray-300 focus:outline-none">
                            &times;
                        </button>

                        {/* Dialog Body */}
                        <div className="flex flex-col items-center">
                            {/* Input */}
                            <input
                                value={searchkey}
                                onChange={(e)=>setSearchkey(e.target.value)}
                                type="search"
                                className="bg-gray-700 w-full py-2 px-4 mb-4 rounded-lg text-white focus:outline-none"
                                placeholder="Type here..."
                            />

                            {/* Blog Card (Sample) */}
                            <div className="bg-gray-200 rounded-lg p-2 w-1/3 mb-4">
                               {getAllBlog.filter((obj)=>obj.blogs.title.toLowerCase().includes(searchkey)).map((item,index)=>{
                                console.log(item);
                                const {thumbnail,date,id} =item;
                                return(
                                    <div key={index}>
                                     <img className="w-1/2 mb-2 rounded-lg" src={thumbnail} alt="Blog Thumbnail" onClick={() => navigate(`/bloginfo/${id}`)} />
                                <p className="text-sm text-gray-600">{date}</p>
                                <h1 className="text-gray-600">{item.blogs.title}</h1>
                                    </div>
                                )
                               })}
                            </div>

                            {/* Heading */}
                            <div className="text-center">
                                <h1 className="text-gray-600">Powered By AL-Blogs</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}