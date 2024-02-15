import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext'


const Header = () => {

    const {setUserInfo, userInfo} = useContext(UserContext);

    useEffect(()=>{
    
        fetch('https://blog-mern-9cip.onrender.com/profile',{
            //credentials:'include',
        }).then(response =>{
            response.json().then(userInfo =>{
                setUserInfo(userInfo);
            })
        })

    },[])


    function logout(){

        fetch('https://blog-mern-9cip.onrender.com/logout',{
        //credentials:'include',
        method:'POST',
        })

        setUserInfo(null)

    }

    const username = userInfo?.username;

  return (
    <>
     <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
            <div class="container px-4 px-lg-5">
                <Link class="navbar-brand" href={'/'}>Blog</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto py-4 py-lg-0">
                    <li class="nav-item"><Link class="nav-link px-lg-3 py-3 py-lg-4" to={'/'}>Home</Link></li>
                        {
                            !username && (<>
                            <li class="nav-item"><Link class="nav-link px-lg-3 py-3 py-lg-4" to={'/register'}>Register</Link></li>
                            <li class="nav-item"><Link class="nav-link px-lg-3 py-3 py-lg-4" to={'/login'}>Login</Link></li>
                            </>)
                        }

                        {
                            username && (<>
                            
                            <li class="nav-item"><Link class="nav-link px-lg-3 py-3 py-lg-4" to={'/create'}>Create New Post</Link></li>
                            <li class="nav-item"><Link class="nav-link px-lg-3 py-3 py-lg-4" onClick={logout}>{username} Logout</Link></li>
                            </>)
                        }
                    
                    </ul>
                </div>
            </div>
        </nav>
        
        <header class="masthead" style={{ backgroundImage: `url('https://startbootstrap.github.io/startbootstrap-clean-blog/assets/img/home-bg.jpg')` }}>
            <div class="container position-relative px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-md-10 col-lg-8 col-xl-7">
                        <div class="site-heading">
                            <h1>Clean Blog</h1>
                            <span class="subheading">A Blog By Akshay Jondhale</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
         
    </>
  )
}

export default Header
