import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home'
import Heading from './pages/login/Heading'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

function App() {
  return (
    <div className='flex flex-col items-center justify-center mt-10'>
        <Heading />
        <Outlet />
        <Toaster
            position="top-center"
            reverseOrder={true}
        />
    </div>
  )
}

const HomeConditional = () => {
    const authContext = useAuthContext();
    return authContext.authUser ? <Home /> : <Navigate to="/login" />
}

const LoginConditional = () => {
    const authContext = useAuthContext();
    return authContext.authUser ? <Navigate to="/" /> : <Login />
}

const SignUpConditional = () => {
    const authContext = useAuthContext();
    return authContext.authUser ? <Navigate to="/" /> : <Signup />
}


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomeConditional />
            },
            {
                path: "/login",
                element: <LoginConditional />
            },
            {
                path: "/signup",
                element: <SignUpConditional />
            }
        ]
    }
])

export default appRouter;
