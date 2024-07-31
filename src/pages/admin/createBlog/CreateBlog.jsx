// import React, { useState, useContext } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import { BsFillArrowLeftCircleFill } from "react-icons/bs"
// import myContext from '../../../context/data/myContext';
// import { Link, useNavigate } from "react-router-dom";
// import { addDoc, collection, Timestamp } from 'firebase/firestore';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';
// import toast from 'react-hot-toast';
// import { fireDb, storage } from '../../../firebase/FirebaseConfig';

// function CreateBlog() {
//     const context = useContext(myContext);
//     const { mode } = context;
//     const navigate=useNavigate();
//     const [blogs, setBlogs] = useState({
//         title: '',
//         category: '',
//         content: '',
//         time: Timestamp.now(),
//     });

//     const [thumbnail, setThumbnail] = useState();
//     const [text, setText] = useState('');
//     console.log("Value: ", blogs);
//     console.log("text: ", text);

//     const auth = getAuth();
//     const user = auth.currentUser;

//     const addPost = async () => {
//       if (blogs.title === "" || blogs.category === "" || blogs.content === "" || blogs.thumbnail === "") {
//           toast.error('Please Fill All Fields');
//       }
//       // console.log(blogs.content)
//       uploadImage()
// }

// const uploadImage = () => {
//   if (!thumbnail) return;
//   const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
//   uploadBytes(imageRef, thumbnail).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//           const productRef = collection(fireDb, "blogPost")
//           try {
//               addDoc(productRef, {
//                   blogs,
//                   thumbnail: url,
//                   time: Timestamp.now(),
//                   date: new Date().toLocaleString(
//                       "en-US",
//                       {
//                           month: "short",
//                           day: "2-digit",
//                           year: "numeric",
//                       }
//                   ),
//                   email: user ? user.email : "",
//                   uid: user ? user.uid : ""
//               })
//               navigate('/dashboard')
//               toast.success('Post Added Successfully');


//           } catch (error) {
//               toast.error(error)
//               console.log(error)
//           }
//       });
//   });
// }


//     // Create markup function 
//     function createMarkup(c) {
//         return { __html: c };
//     }

//     return (
//         <div className='container mx-auto max-w-5xl py-6'>
//             <div className="p-5" style={{
//                 background: mode === 'dark'
//                     ? '#353b48'
//                     : 'rgb(226, 232, 240)',
//                 borderBottom: mode === 'dark'
//                     ? '4px solid rgb(226, 232, 240)'
//                     : '4px solid rgb(0, 100, 0)'
//             }}>
//                 {/* Top Item */}
//                 <div className="mb-2 flex justify-between">
//                     <div className="flex gap-2 items-center">
//                         {/* Dashboard Link */}
//                         <Link to={'/dashboard'}>
//                             <BsFillArrowLeftCircleFill size={25}/>
//                         </Link>

//                         {/* Text */}
//                         <h4 style={{
//                             color: mode === 'dark'
//                                 ? 'white'
//                                 : 'black'
//                         }}>
//                             Create Blog
//                         </h4>
//                     </div>
//                 </div>

//                 {/* Main Content */}
//                 <div className="mb-3">
//                     {/* Thumbnail */}
//                     {thumbnail && <img className="w-full rounded-md mb-3"
//                         src={thumbnail
//                           ? URL.createObjectURL(thumbnail)
//                           : ""}
//                         alt="thumbnail"
//                     />}

//                     {/* Upload Thumbnail */}
//                     <p className="mb-2 font-semibold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
//                         Upload Thumbnail
//                     </p>

//                     {/* 1st Thumbnail Input */}
//                     <input
//                         type="file"
//                         className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
//                         style={{
//                             background: mode === 'dark'
//                                 ? '#dcdde1'
//                                 : 'rgb(226, 232, 240)'
//                         }}
//                         onChange={(e) => setThumbnail(e.target.files[0])}
//                         required
//                     />
//                 </div>

//                 {/*2nd Title Input */}
//                 <div className="mb-3">
//                     <input
//                         className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 outline-none ${mode === 'dark' ? 'placeholder-black' : 'placeholder-black'}`}
//                         placeholder="Enter Your Title"
//                         style={{
//                             background: mode === 'dark'
//                                 ? '#dcdde1'
//                                 : 'rgb(226, 232, 240)'
//                         }}
//                         name="title"
//                         value={blogs.title}
//                         onChange={(e)=>setBlogs({...blogs,title:e.target.value})}
//                         required
//                     />
//                 </div>

//                 {/* 3rd Category Input */}
//                 <div className="mb-3">
//                     <input
//                         className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 outline-none ${mode === 'dark' ? 'placeholder-black' : 'placeholder-black'}`}
//                         placeholder="Enter Your Category"
//                         style={{
//                             background: mode === 'dark'
//                                 ? '#dcdde1'
//                                 : 'rgb(226, 232, 240)'
//                         }}
//                         name="category"
//                         value={blogs.category}
//                         onChange={(e)=>setBlogs({...blogs,category:e.target.value})}
//                         required
//                     />
//                 </div>

//                 {/*4th Editor */}
//                 <Editor
//                     apiKey='y58vmrcfqsrvc9noxa0fmp0cdsoowzb30jv0d33sf8vdt8fa'
//                     onEditorChange={(newValue, editor) => {
//                         setBlogs({ ...blogs, content: newValue });
//                         setText(editor.getContent({ format: 'text' }));
//                     }}
//                     onInit={(evt, editor) => {
//                         setText(editor.getContent({ format: 'text' }));
//                     }}
//                     init={{
//                         plugins: 'a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinydrive tinymcespellchecker typography visualblocks visualchars wordcount'
//                     }}
//                 />

//                 {/* Submit Button */}
//                 <button className="w-full mt-5 rounded-lg"
//                     onClick={addPost}
//                     style={{
//                         background: mode === 'dark'
//                             ? 'rgb(226, 232, 240)'
//                             : 'linear-gradient(to right, #90EE90, #2c5282)',
//                         color: mode === 'dark'
//                             ? 'rgb(30, 41, 59)'
//                             : 'rgb(226, 232, 240)'
//                     }}
//                 >
//                     Send
//                 </button>

//                 {/* Preview Section */}
//                 <div>
//                     <h1 className="text-center mb-3 text-2xl">Preview</h1>
//                     <div className="content">
//                         <div
//                             className={`[&>h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
//                         ${mode === 'dark' ? '[&>h1]:text-[#ff4d4d]' : '[&>h1]:text-black'}

//                         [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5
//                         ${mode === 'dark' ? '[&>h2]:text-white' : '[&>h2]:text-black'}

//                         [&>h3]:text-[18.72px] [&>h3]:font-bold [&>h3]:mb-2.5
//                         ${mode === 'dark' ? '[&>h3]:text-white' : '[&>h3]:text-black'}

//                         [&>h4]:text-[16px] [&>h4]:font-bold [&>h4]:mb-2.5
//                         ${mode === 'dark' ? '[&>h4]:text-white' : '[&>h4]:text-black'}

//                         [&>h5]:text-[13.28px] [&>h5]:font-bold [&>h5]:mb-2.5
//                         ${mode === 'dark' ? '[&>h5]:text-white' : '[&>h5]:text-black'}

//                         [&>h6]:text-[10px] [&>h6]:font-bold [&>h6]:mb-2.5
//                         ${mode === 'dark' ? '[&>h6]:text-white' : '[&>h6]:text-black'}

//                         [&>p]:text-[16px] [&>p]:mb-1.5
//                         ${mode === 'dark' ? '[&>p]:text-[#7efff5]' : '[&>p]:text-black'}

//                         [&>ul]:list-disc [&>ul]:mb-2
//                         ${mode === 'dark' ? '[&>ul]:text-white' : '[&>ul]:text-black'}

//                         [&>ol]:list-decimal [&>li]:ml-5 [&>ol]:mb-2
//                         ${mode === 'dark' ? '[&>ol]:text-white' : '[&>ol]:text-black'}

//                         [&>blockquote]:m-0 [&>blockquote]:border-l-4 [&>blockquote]:p-4 [&>blockquote]:text-[16px] [&>blockquote]:italic
//                         ${mode === 'dark' ? '[&>blockquote]:text-[#7efff5] [&>blockquote]:border-[#7efff5]' : '[&>blockquote]:text-black [&>blockquote]:border-black'}

//                         [&>blockquote>p]:leading-7 [&>blockquote>p]:m-0
//                         ${mode === 'dark' ? '[&>blockquote>p]:text-[#7efff5]' : '[&>blockquote>p]:text-black'}

//                         [&>pre]:bg-gray-200 [&>pre]:overflow-auto [&>pre]:p-3 [&>pre]:rounded [&>pre]:mb-2
//                         ${mode === 'dark' ? '[&>pre]:text-black' : '[&>pre]:text-black'}

//                         [&>figure]:my-4
//                         ${mode === 'dark' ? '[&>figure]:text-white' : '[&>figure]:text-black'}

//                         [&>figcaption]:text-center [&>figcaption]:text-sm
//                         ${mode === 'dark' ? '[&>figcaption]:text-white' : '[&>figcaption]:text-black'}

//                         `}
//                             dangerouslySetInnerHTML={createMarkup(blogs.content)}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CreateBlog;

import React, { useState, useContext } from 'react';
import DOMPurify from 'dompurify'; // Import DOMPurify
import { 
  BtnBold, 
  BtnItalic, 
  createButton, 
  Editor, 
  EditorProvider, 
  Toolbar 
} from 'react-simple-wysiwyg';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import myContext from '../../../context/data/myContext';
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import toast from 'react-hot-toast';
import { fireDb, storage } from '../../../firebase/FirebaseConfig';

const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');

function CreateBlog() {
  const context = useContext(myContext);
  const { mode } = context;
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState({
    title: '',
    category: '',
    content: '',
    time: Timestamp.now(),
  });
  const [thumbnail, setThumbnail] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  const addPost = async () => {
    if (blogs.title === "" || blogs.category === "" || blogs.content === "" || !thumbnail) {
      toast.error('Please Fill All Fields');
      return;
    }
    uploadImage();
  };

  const uploadImage = () => {
    if (!thumbnail) return;
    const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
    uploadBytes(imageRef, thumbnail).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const productRef = collection(fireDb, "blogPost");
        try {
          addDoc(productRef, {
            blogs,
            thumbnail: url,
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
            email: user ? user.email : "",
            uid: user ? user.uid : ""
          });
          navigate('/dashboard');
          toast.success('Post Added Successfully');
        } catch (error) {
          toast.error(error.message);
          console.error(error);
        }
      });
    });
  };

  return (
    <div className='container mx-auto max-w-5xl py-6'>
      <div className="p-5" style={{
        background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)',
        borderBottom: mode === 'dark' ? '4px solid rgb(226, 232, 240)' : '4px solid rgb(0, 100, 0)'
      }}>
        {/* Top Item */}
        <div className="mb-2 flex justify-between">
          <div className="flex gap-2 items-center">
            {/* Dashboard Link */}
            <Link to={'/dashboard'}>
              <BsFillArrowLeftCircleFill size={25}/>
            </Link>
            {/* Text */}
            <h4 style={{ color: mode === 'dark' ? 'white' : 'black' }}>
              Create Blog
            </h4>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-3">
          {/* Thumbnail */}
          {thumbnail && <img className="w-full rounded-md mb-3" src={URL.createObjectURL(thumbnail)} alt="thumbnail" />}

          {/* Upload Thumbnail */}
          <p className="mb-2 font-semibold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
            Upload Thumbnail
          </p>

          {/* Thumbnail Input */}
          <input
            type="file"
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
            style={{ background: mode === 'dark' ? '#dcdde1' : 'rgb(226, 232, 240)' }}
            onChange={(e) => setThumbnail(e.target.files[0])}
            required
          />
        </div>

        {/* Title Input */}
        <div className="mb-3">
          <input
            className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 outline-none ${mode === 'dark' ? 'placeholder-black' : 'placeholder-black'}`}
            placeholder="Enter Your Title"
            style={{ background: mode === 'dark' ? '#dcdde1' : 'rgb(226, 232, 240)' }}
            name="title"
            value={blogs.title}
            onChange={(e) => setBlogs({ ...blogs, title: e.target.value })}
            required
          />
        </div>

        {/* Category Input */}
        <div className="mb-3">
          <input
            className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 outline-none ${mode === 'dark' ? 'placeholder-black' : 'placeholder-black'}`}
            placeholder="Enter Your Category"
            style={{ background: mode === 'dark' ? '#dcdde1' : 'rgb(226, 232, 240)' }}
            name="category"
            value={blogs.category}
            onChange={(e) => setBlogs({ ...blogs, category: e.target.value })}
            required
          />
        </div>

        {/* Editor */}
        <EditorProvider>
          <Editor value={blogs.content} onChange={(e) => setBlogs({ ...blogs, content: e.target.value })}>
            <Toolbar>
              <BtnBold />
              <BtnItalic />
              <BtnAlignCenter />
            </Toolbar>
          </Editor>
        </EditorProvider>

        {/* Submit Button */}
        <button
          className="w-full mt-5 rounded-lg"
          onClick={addPost}
          style={{
            background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'linear-gradient(to right, #90EE90, #2c5282)',
            color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)'
          }}
        >
          Send
        </button>

        {/* Preview Section */}
        <div>
          <h1 className="text-center mb-3 text-2xl">Preview</h1>
          <div className="content">
            <div
              className={`[&>h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
              ${mode === 'dark' ? '[&>h1]:text-[#ff4d4d]' : '[&>h1]:text-black'}

              [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5
              ${mode === 'dark' ? '[&>h2]:text-white' : '[&>h2]:text-black'}

              [&>h3]:text-[18.72px] [&>h3]:font-bold [&>h3]:mb-2.5
              ${mode === 'dark' ? '[&>h3]:text-white' : '[&>h3]:text-black'}

              [&>h4]:text-[16px] [&>h4]:font-bold [&>h4]:mb-2.5
              ${mode === 'dark' ? '[&>h4]:text-white' : '[&>h4]:text-black'}

              [&>h5]:text-[13.28px] [&>h5]:font-bold [&>h5]:mb-2.5
              ${mode === 'dark' ? '[&>h5]:text-white' : '[&>h5]:text-black'}

              [&>h6]:text-[10px] [&>h6]:font-bold [&>h6]:mb-2.5
              ${mode === 'dark' ? '[&>h6]:text-white' : '[&>h6]:text-black'}

              [&>p]:text-[16px] [&>p]:mb-1.5
              ${mode === 'dark' ? '[&>p]:text-[#7efff5]' : '[&>p]:text-black'}

              [&>ul]:list-disc [&>ul]:mb-2
              ${mode === 'dark' ? '[&>ul]:text-white' : '[&>ul]:text-black'}

              [&>ol]:list-decimal [&>li]:ml-5 [&>ol]:mb-2
              ${mode === 'dark' ? '[&>ol]:text-white' : '[&>ol]:text-black'}

              [&>blockquote]:m-0 [&>blockquote]:border-l-4 [&>blockquote]:p-4 [&>blockquote]:text-[16px] [&>blockquote]:italic
              ${mode === 'dark' ? '[&>blockquote]:text-[#7efff5] [&>blockquote]:border-[#ff4d4d]' : '[&>blockquote]:text-black [&>blockquote]:border-black'}`}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogs.content) }} // Sanitize content
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
