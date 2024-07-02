import { Outlet, createBrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home'
import Heading from './pages/login/Heading'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import { Toaster } from 'react-hot-toast'

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


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            }
        ]
    }
])

export default appRouter;
