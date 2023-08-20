import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input
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
  width:600px;
  height:600px;
  background-color: #ffffff;
  padding: 0 80px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const SignUpContent = styled.div`
`
const InputLabel = styled.span`
  margin-left:10px;
`
let debounceTimer;

const SignUp = () => {
  let [nickName,setUserName] = useState('');
  let [id,setId] = useState('');
  let [password,setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleRegister = () => {
    axios.post('/api/register',{
      userName : nickName,
      id : id,
      password:password
    })
    //여기콘솔은 웹 콘솔
    .then((result)=>{console.log(result.data), navigate('/')})
    .catch((error)=>{console.log('회원가입 데이터 전송오류: '+error), navigate('/fail')})
  }

  const checkIdDuplication = (inputId) => {
    // 서버에 아이디 중복 확인 요청 보내기
    if (debounceTimer) {
      clearTimeout(debounceTimer);
  }

  // 새로운 디바운스 타이머를 설정합니다.
    debounceTimer = setTimeout(() => {
        // 이 부분에 중복 확인 로직을 작성합니다.
        axios.post('/api/check-id', { id: inputId })
        .then((result) => {
            if (result.data.isDuplicate) {
                console.log('아이디가 중복됩니다.');
                // 이곳에서 중복 시 UI 변경 처리 (예: 에러 메시지 표시)
            } else {
                console.log('사용 가능한 아이디입니다.');
                // 이곳에서 사용 가능 시 UI 변경 처리
            }
        })
        .catch((error) => {
            console.log('아이디 중복확인 오류: ' + error);
        });
    }, 500);
  }

  const isNameValid = () => {
    const namePattern = /^[a-zA-Z가-힣0-9]{1,30}$/;
    return namePattern.test(nickName);
  }

  const isIdValid = () => {
    let idPattern = /^[a-z0-9_-]{5,20}$/;
    return(
      idPattern.test(id)
      )
    }
  
  const isPasswordValid = () => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return(
      passwordPattern.test(password) 
    )
  }
  
  

  return (
    <SignUpContainer>
      <SignUpBox>
          <Heading size='lg' style={{padding:'50px'}}>회원가입</Heading>

        <SignUpContent>
          <FormControl isRequired isInvalid={!isNameValid()}>
            <FormLabel>
              <FontAwesomeIcon icon={faUser} /><InputLabel>이름(닉네임)</InputLabel>
            </FormLabel>
            <Input value={nickName} onChange={(e)=>{setUserName(e.target.value);}} type="text"maxLength={10}/>
            {
              nickName == '' ? (<></>) 
              : isNameValid() ? (
                <FormHelperText>올바른 닉네임 형식입니다.</FormHelperText> 
              ): (<FormErrorMessage>숫자와 문자만 입력해주세요!</FormErrorMessage>)
            }
          </FormControl>

          <FormControl isRequired isInvalid={!isIdValid()} style={{marginTop:'10px'}}>
            <FormLabel>
              <FontAwesomeIcon icon={faEnvelope} /><InputLabel>아이디</InputLabel>
            </FormLabel>
            <Input value={id} onChange={(e)=>{
              setId(e.target.value);
              checkIdDuplication(e.target.value);
              }} 
              type="text" 
              maxLength={20}
            />
            {
              id == '' ? (<></>):isIdValid() ? (
                <FormHelperText>올바른 아이디 형식입니다</FormHelperText>
                ) : (
                  <FormErrorMessage>5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.</FormErrorMessage>
              )
            }
          </FormControl>

          <FormControl isRequired isInvalid={!isPasswordValid()} style={{marginTop:'10px'}}>
            <FormLabel>
              <FontAwesomeIcon icon={faLock} /><InputLabel>비밀번호</InputLabel>
            </FormLabel>
            <Input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" maxLength={16}/>
            {
              password == ''? (<></>):isPasswordValid() ? (
                <FormHelperText>올바른 비밀번호 형식입니다.</FormHelperText>
              ) : (
                <FormErrorMessage>비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</FormErrorMessage>
              )
            }
          </FormControl>

          <Button 
          style={{width:'100%', marginTop:'50px'}}
          colorScheme='whatsapp'
          onClick={()=>{
            if(isIdValid() && isPasswordValid() && isNameValid()){
              handleRegister()  
            }
          }}
          isDisabled={!isIdValid() || !isPasswordValid() || !isNameValid()} //입력값 다 정상적이면 회원가입버튼생김
          >회원가입
          </Button>

        </SignUpContent>
      </SignUpBox>
    </SignUpContainer>
  );
};

export default SignUp;
