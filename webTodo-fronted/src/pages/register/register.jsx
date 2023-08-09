import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import {
  Button,
  Heading,
  Center
} from '@chakra-ui/react'
import axios from 'axios';

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--mainColor);
`;

const SignUpBox = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  svg {
    margin-right: 10px;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;



const SignUp = () => {
  let [userName,setUserName] = useState('');
  let [email,setEmail] = useState('');
  let [password,setPassword] = useState('');
  return (
    <SignUpContainer>
      <SignUpBox>
        <Center>
        <Heading size='lg'>회원가입</Heading>
        </Center>
        <InputContainer>
          <FontAwesomeIcon icon={faUser} />
          <InputField value={userName} onChange={(e)=>{setUserName(e.target.value);}} type="text" placeholder="사용자명" />
        </InputContainer>
        <InputContainer>
          <FontAwesomeIcon icon={faEnvelope} />
          <InputField value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="이메일" />
        </InputContainer>
        <InputContainer>
          <FontAwesomeIcon icon={faLock} />
          <InputField value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="비밀번호" />
        </InputContainer>
        <Button 
        colorScheme='whatsapp'
        onClick={()=>{
          axios.post('/api/register',{
            userName : userName,
            email : email,
            password:password
          })
          //여기콘솔은 웹 콘솔
          .then((result)=>{console.log(result.data)})
          .catch((error)=>{console.log('회원가입 데이터 전송오류: '+error)})
        }}
        >회원가입</Button>
      </SignUpBox>
    </SignUpContainer>
  );
};

export default SignUp;
