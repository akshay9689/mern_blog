import React, {useEffect, useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate , useParams } from 'react-router-dom';

const EditPost = () => {
    
    const {id} = useParams();    
    
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [file, setFile] = useState('');
   // const [cover, setFile] = useState('');


     useEffect(()=>{
      
        fetch('http://localhost:4000/post/'+id).then(response =>{
            response.json().then(postInfo=>{
                setTitle(postInfo.title)
                setContent(postInfo.content)
                setSummary(postInfo.summary)
            })
        })

     },[])

    async function updatePost(ev){
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if(file?.[0]){
    data.set('file', file?.[0]);
    }

    const response = await fetch('http://localhost:4000/post', {
        method: 'PUT',
        body: data,
        credentials:'include'
    }); 

    if(response.ok){
      setRedirect(true)     
    }

    setRedirect(true);

    }


    if(redirect){

        return <Navigate to={'/post/'+id}/>

    }

  return (
    <>
     <div className="container py-5">
    <div className="row">
        <div className="col-md-12">
           
            <div className="row">
                <div className="col-md-6 mx-auto">

                    <div className="card rounded-0">
                        <div className="card-header">
                            <h3 className="mb-0">Create Post</h3>
                        </div>
                        <div className="card-body">
                            <form className="form" role="form" autocomplete="off" id="formLogin" novalidate="" method="POST" onSubmit={updatePost}>
                                <div className="form-group">
                                    <label for="uname1">Title</label>
                                    <input type="text" className="form-control form-control-lg rounded-0" value={title} onChange={ev => setTitle(ev.target.value)} required="" />
                                    
                                </div>
                                <div className="form-group">
                                    <label>Summary</label>
                                    <input type="text" className="form-control form-control-lg rounded-0" value={summary} onChange={ev=> setSummary(ev.target.value)} required="" />
                                    
                                </div>
                                <div className="form-group">
                                    <label>File</label>
                                    <input type="file" className="form-control form-control-lg rounded-0" onChange={ev => setFile(ev.target.files)} required="" />
                                    
                                </div>
                                <div className="form-group">
                                    <label>Content</label>
                                    <ReactQuill value={content} onChange={ev => setContent(ev)}/>
                                </div>
                                
                                <button type="submit" className="btn btn-success btn-lg float-right" id="btnLogin">Update</button>
                            </form>
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

export default EditPost
