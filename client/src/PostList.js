import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const PostList = () => {

  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const response = fetch('https://blog-mern-9cip.onrender.com/post', {credentials:'include'}).then(response =>{
      response.json().then(post=>{
       // console.log(post)
        setPosts(post);
      })
    })
  },[])

  return (
    <>
      {
        posts.length > 0 && posts.map(post=>(
          <>
          <div class="post-preview">
        <Link to={`post/${post._id}`}>
            <h2 class="post-title">{post.title}</h2>
            <h3 class="post-subtitle">{post.summary}</h3>
        </Link>
        <p class="post-meta">
                Posted by&nbsp;
            <a href="#!">{post.author.username}</a>&nbsp;
            on &nbsp; {new Date(post.createdAt).toLocaleString(undefined,{timeZone:'Asia/Kolkata'})}
        </p>
        </div>
                    
    <hr class="my-4" />

          </>
        ))
      }            
                    
    </>
  )
}

export default PostList
