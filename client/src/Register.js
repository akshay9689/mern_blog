import React,{useState} from 'react'

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(ev){
        ev.preventDefault();
       const response = await fetch('http://localhost:4000/register',{
       method: 'POST',
       body:JSON.stringify({username, password}),
       headers: {'Content-Type':'application/json'}

       })

       if(response.status === 200){
        alert("registration successfull");
       }
       else{
        alert("registration failed");
       }

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
                            <h3 className="mb-0">Register</h3>
                        </div>
                        <div className="card-body">
                            <form className="form" role="form" autocomplete="off" id="formLogin" novalidate="" method="POST" onSubmit={register}>
                                <div className="form-group">
                                    <label for="uname1">Username</label>
                                    <input type="text" className="form-control form-control-lg rounded-0" value={username} onChange={ev => setUsername(ev.target.value)} required="" />
                                    <div className="invalid-feedback">Oops, you missed this one.</div>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control form-control-lg rounded-0" value={password} onChange={ev=> setPassword(ev.target.value)} required="" autocomplete="new-password" />
                                    <div className="invalid-feedback">Enter your password too!</div>
                                </div>
                                
                                <button type="submit" className="btn btn-success btn-lg float-right" id="btnLogin">Reister</button>
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

export default Register