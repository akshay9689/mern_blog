import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const PostDetail = () => {

  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext)
    const {id} = useParams();
    useEffect(()=>{
        
        fetch('https://blog-mern-9cip.onrender.com/post/'+id).then(response=>{
            response.json().then(postInfo =>{
             setPostInfo(postInfo);
            })
        })
    },[])

if(!postInfo) return '';

  return (
    <>
    <div className="container py-5">
    <div className="row">
        <div className="col-md-12">
           
            <div className="row">
                <div className="col-md-6 mx-auto">

                    <div className="card rounded-0">
                        <div className="card-header">
                            <h3 className="mb-0">{ userInfo.id === postInfo.author._id && ( <Link class="btn btn-primary" to={`/edit/${postInfo._id}`}>Edit POST</Link> )}</h3>
                        </div>
                        <div className="card-body">
                        <h4>{postInfo.title}</h4>
                        <h4>Post By {postInfo.author.username}</h4>
                        <img src={`https://blog-mern-9cip.onrender.com/${postInfo.cover}`}/>
                        <div dangerouslySetInnerHTML={{__html:postInfo.content}}/>
                        
                        </div>
                        
                    </div>
                    
                    </div>
                </div>
                </div>
                </div>
            </div>
    </>
  )
}

export default PostDetail