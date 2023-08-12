import App from '../App';
// import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/login/login';
import Register from '../pages/singup/register';
const RouterInfo = [
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
];

export default RouterInfo;