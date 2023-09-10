import App from '../App';
// import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/login/Login';
import Register from '../pages/register/register';
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
];

export default RouterInfo;