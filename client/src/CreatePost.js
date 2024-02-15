import React, {useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev){

    const data = new FormData();
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('file', file[0])
    ev.preventDefault();

    const response = await fetch('https://blog-mern-9cip.onrender.com/post',{
        method: 'POST',
        body: data,
        credentials: 'include'
    })

    if(response.ok){

        setRedirect(true)


     }

    }

    if(redirect){

        return <Navigate to={'/'}/>

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
                            <form className="form" role="form" autocomplete="off" id="formLogin" novalidate="" method="POST" onSubmit={createNewPost}>
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
                                
                                <button type="submit" className="btn btn-success btn-lg float-right" id="btnLogin">Create</button>
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

export default CreatePost