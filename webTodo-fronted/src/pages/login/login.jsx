import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Divider,
  AbsoluteCenter,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import { useRef } from "react";
import { login } from "@/store/userSlice";
import axios from "axios";


function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  let dispatch = useDispatch();
  
  const inputRef = useRef();
  
  /**로그인POST */

  let handleLogin = () => {
    axios.post('/api/login',{
      userName :userName,
      password: password
    })
    .then((result) => {
      const username = result.data.user.displayName;
      dispatch(login(username));
      navigate("/main");
    })
    .catch((error) => {
      if (error.response) {
        console.error(
          "서버로부터의 응답:",
          error.response.data.message
        );
        alert('아이디 또는 비밀번호를 확인해주세요');
      } else {
        console.error("Axios 요청 오류:", error.message);
      }
    });
  }

  const handleOnKeyPress = e => {
    if(e.key == 'Enter')
      handleLogin()
  }
  /**id입력란 input값 가져오는 함수*/
  const handleSetId = (e) => {
    setUserName(e.target.value);
    inputRef.current.focus();
  };
  /** pw입력란 input값 가져오는함수*/
  const handleSetPw = (e) => {
    setPassword(e.target.value);
  };

  useEffect(()=>{
    console.log('inputRef:', inputRef);
    inputRef.current.focus();
  },[])

  return (
    <LoginContainer>
      <LoginBox>
        <LoginHeader>
          <Heading as='h2'>Todo</Heading>
        </LoginHeader>
        <LoginContent>
          <FormControl isRequired onKeyPress={handleOnKeyPress}>
            <FormLabel>아이디</FormLabel>
            <Input ref={inputRef} type="text" value={userName} onChange={handleSetId}/>
            <FormLabel>비밀번호</FormLabel>
            <Input type="password" value={password} onChange={handleSetPw} />
            <Button
              colorScheme="blue"
              variant="outline"
              style={{ width: "100%" }}
              size="md"
              mt={5}
              onClick={() => {handleLogin()}}
            >
              Login
            </Button>
            <br />
          </FormControl>
        </LoginContent>
        <SocialContent>
          <Box position='relative' p='4'>
            <Divider/>
            <AbsoluteCenter bg='white' px='4'>소셜로그인</AbsoluteCenter>
          </Box>
          <Box mt='6'>
          <SocialButton style={{fontFamily:'Roboto-Medium'}} onClick={()=>{window.location.href='/auth/google'}}>
            <svg width="18px" height="18px" viewBox="-3 0 262 262" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"> <g> <path d="M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451" fill="#4285F4"></path> <path d="M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1" fill="#34A853"></path> <path d="M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37" fill="#FBBC05"></path> <path d="M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479" fill="#EB4335"></path> </g> </svg>
            <span>Google 로그인</span>
          </SocialButton>
          <SocialButton style={{backgroundColor:'#FEE500'}} onClick={()=>{window.location.href='/auth/kakao'}}>
          <svg width="18px" height="18px" viewBox="0 0 512 512" version="1.1">
            <path fill="currentColor" d="M255.5 48C299.345 48 339.897 56.5332 377.156 73.5996C414.415 90.666 443.871 113.873 465.522 143.22C487.174 172.566 498 204.577 498 239.252C498 273.926 487.174 305.982 465.522 335.42C443.871 364.857 414.46 388.109 377.291 405.175C340.122 422.241 299.525 430.775 255.5 430.775C241.607 430.775 227.262 429.781 212.467 427.795C148.233 472.402 114.042 494.977 109.892 495.518C107.907 496.241 106.012 496.15 104.208 495.248C103.486 494.706 102.945 493.983 102.584 493.08C102.223 492.177 102.043 491.365 102.043 490.642V489.559C103.126 482.515 111.335 453.169 126.672 401.518C91.8486 384.181 64.1974 361.2 43.7185 332.575C23.2395 303.951 13 272.843 13 239.252C13 204.577 23.8259 172.566 45.4777 143.22C67.1295 113.873 96.5849 90.666 133.844 73.5996C171.103 56.5332 211.655 48 255.5 48Z">
            </path>
          </svg>
            <span>카카오 로그인</span>
          </SocialButton>
        </Box>
        </SocialContent>
        <LoginFooter>
          <span>계정이 없으신가요?</span> <strong><Link to='/register'>가입하기</Link></strong>
        </LoginFooter>
      </LoginBox>
    </LoginContainer>
  );
}

export default Login;



/**컨테이너 */
export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--mainColor);
`;
export const LoginBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: #ffffff;
  padding:0 100px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const LoginHeader = styled.div`
  padding:40px;
`;

export const LoginContent = styled.div``;

export const SocialContent = styled.div`
  margin-top:20px;
`

export const SocialButton = styled.button`
  display:flex;
  justify-content: space-between;
  width: 100%;
  background-color: #FFF;
  border-radius:8px;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-top:10px;

  svg{
    margin-right:auto;
  }

  span{
    margin-right:auto;
  }
`

export const LoginFooter = styled.div`
  margin-top:20px;
  display: flex;
  justify-content: flex-end;
  a{
    color:#c6dbf4;
  }
`