import App from '../App';
// import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/login/login';
import SignUp from '../pages/singup/signup';
const RouterInfo = [
  {
    path: "/",
    element: <App/>,
    // errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login/>,
    // errorElement: <ErrorPage />
  },
  {
    path: "/signup",
    element: <SignUp/>,
    // errorElement: <ErrorPage />
  },
];

export default RouterInfo;