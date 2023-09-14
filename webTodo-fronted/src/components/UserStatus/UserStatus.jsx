
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
// import { Link } from "react-router-dom";
import {Button} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logout } from "@/store/userSlice";

const UserStatus = ()=>{
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    console.log(username);
    console.log(isLoggedIn);
  }, [username, isLoggedIn]);
  
  const handleLogout = () => {
    axios.get('/api/logout')
    .then((result)=>{
      console.log(result.data)
      dispatch(logout());
      navigate('/');
    })
    .catch((error)=>{
      if (error) console.log(error.response)
    })
  }

  return(
    <>
      {
        isLoggedIn == true ? (
          <>
            <p>{username}님<br/> 환영합니다!</p>
            <Button 
              colorScheme='purple'
              variant='ghost'
              size='sm'
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </>
        ):null/* (
          <>
          <Link to="/register">회원가입</Link>
          <Link to="/">로그인</Link>
          </>
        ) */
      }
    </>
  )
}

export default UserStatus;