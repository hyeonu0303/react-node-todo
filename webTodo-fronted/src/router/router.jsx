import App from '../App';
// import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/login/login';
import Register from '../pages/register/register';
import Practice from '../pages/practice';
const RouterInfo = [
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/main",
    element: <App/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path:'/practice',
    element: <Practice/>
  }
];

export default RouterInfo;