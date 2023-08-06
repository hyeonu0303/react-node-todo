import App from '../App';
// import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/login/login';
import SignUp from '../pages/singup/signup';
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
    path: "/signup",
    element: <SignUp/>,
  },
];

export default RouterInfo;