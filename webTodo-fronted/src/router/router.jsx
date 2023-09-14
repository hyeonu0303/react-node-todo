import App from '../App';
// import ErrorPage from '../pages/ErrorPage';
import Login from '@/pages/login/login';
import Register from '@/pages/Register/Register';
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