import './App.css';
import { UserContextProvider } from "./UserContext";
import Post from "./Post";
import Register from "./Register";
import PostDetail from "./PostDetail";
import EditPost from "./EditPost";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import CreatePost from './CreatePost';

function App() {
  return (
<>
<UserContextProvider>
<Header/>
<Outlet/>
<Footer/>
</UserContextProvider>
</>
  );
}


const router = createBrowserRouter([
{
  path: "/",
  element: <App />,
  children: [ 
    {
      path: "/",
      element: <Post />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "create",
    element: <CreatePost />,
  },
  {
    path: "post/:id",
    element: <PostDetail />,
  },
  {
    path: "edit/:id",
    element: <EditPost />,
  },

  ]


}


])

export {router};
