import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input
} from '@chakra-ui/react'
import axios from 'axios';

const SignupHeader = styled.div`
  margin:auto;
`

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--mainColor);
`;

const SignUpBox = styled.div`
  display:flex;
  flex-wrap: wrap;
  width:600px;
  height:auto;
  min-height: 600px;
  background-color: #ffffff;
  padding: 0 100px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const SignUpContent = styled.div`
  width:100%;
`
const InputLabel = styled.span`
  margin-left:10px;
`
export const SignupFooter = styled.div`
  margin-top:20px;
  display: flex;
  justify-content: flex-end;
  a{
    color:#c6dbf4;
  }
`
let debounceTimer;

const SignUp = () => {
  let [displayName,setDisplayName] = useState('');
  let [userName,setUserName] = useState('');
  let [password,setPassword] = useState('');
  let [duplicateId, setDuplicateId] = useState();
  const navigate = useNavigate();
  
  /**회원가입POST요청 */
  const handleRegister = () => {
    axios.post('/api/register',{
      displayName : displayName,
      userName : userName,
      password:password
    })
    //여기콘솔은 웹 콘솔
    .then((result)=>{console.log(result.data), navigate('/')})
    .catch((error)=>{console.log('회원가입 데이터 전송오류: '+error), navigate('/fail')})
  }

  /**중복확인POST요청 */
  const checkIdDuplication = (inputId) => {
    // 서버에 아이디 중복 확인 요청 보내기
    if (debounceTimer) {
      clearTimeout(debounceTimer);
  }

  /**디바운스 적용 */
    debounceTimer = setTimeout(() => {
        // 이 부분에 중복 확인 로직을 작성합니다.
        axios.post('/api/check-id', { userName: inputId })
        .then((result) => {
            if (result.data.isDuplicate) {
                setDuplicateId(true);
                // 이곳에서 중복 시 UI 변경 처리 (예: 에러 메시지 표시)
            } else setDuplicateId(false) ;
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);
  }

  /**닉네임 정규식 */
  const isDisplayNameValid = () => {
    const namePattern = /^[a-zA-Z가-힣0-9]{1,30}$/;
    return namePattern.test(displayName);
  }
  /**아이디 정규식 */
  const isIdValid = () => {
    let idPattern = /^[a-z0-9_-]{5,20}$/;
    return(
      idPattern.test(userName)
      )
    }
  /**비밀번호 정규식 */
  const isPasswordValid = () => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return(
      passwordPattern.test(password) 
    )
  }

  return (
    <SignUpContainer>
      <SignUpBox>
        {/* 회원가입헤더 */}
        <SignupHeader>
          <Heading size='lg'>회원가입</Heading>
        </SignupHeader>
        {/* 회원가입헤더END */}
        <SignUpContent>
          {/* 회원가입 폼 */}
          <FormControl isRequired>
            <FormLabel>
              <FontAwesomeIcon icon={faUser} /><InputLabel>이름(닉네임)</InputLabel>
            </FormLabel>
            <Input value={displayName} onChange={(e)=>{setDisplayName(e.target.value);}} type="text"maxLength={10}/>
            {
              displayName == '' ? (<></>) 
              : isDisplayNameValid() ? (
                <FormHelperText>사용가능한 닉네임 입니다</FormHelperText> 
              ): (<FormHelperText style={{ color: '#E53E3E' }}>숫자와 문자만 입력해주세요!</FormHelperText>)
            }
          </FormControl>
          <FormControl isRequired style={{marginTop:'10px'}}>
            <FormLabel>
              <FontAwesomeIcon icon={faEnvelope} /><InputLabel>아이디</InputLabel>
            </FormLabel>
            <Input value={userName} onChange={(e)=>{
              setUserName(e.target.value);
              checkIdDuplication(e.target.value);
              }} 
              type="text" 
              maxLength={20}
            />
            {
              userName === '' ? (
              <></>
              ) : duplicateId === true ? (
              <FormHelperText style={{ color: '#E53E3E' }}>
                사용할 수 없는 아이디입니다(중복)
              </FormHelperText>
              ) : isIdValid() ? (
              <FormHelperText>사용 가능한 아이디입니다</FormHelperText>
              ) : (
                <FormHelperText style={{ color: '#E53E3E' }}>
                5~20자의 영문 소문자, 숫자와 특수 기호(_),(-)만 사용 가능합니다.
              </FormHelperText>
              )
            }
          </FormControl>
          <FormControl isRequired style={{marginTop:'10px'}}>
            <FormLabel>
              <FontAwesomeIcon icon={faLock} /><InputLabel>비밀번호</InputLabel>
            </FormLabel>
            <Input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" maxLength={16}/>
            {
              password == ''? (<></>):isPasswordValid() ? (
                <FormHelperText>사용가능한 비밀번호입니다.</FormHelperText>
              ) : (
                <FormHelperText style={{ color: '#E53E3E' }}>비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</FormHelperText>
              )
            }
          </FormControl>
          {/* 회원가입폼END */}

          {/* 회원가입버튼 */}
          <Button 
          style={{width:'100%', marginTop:'30px'}}
          colorScheme='blue'
          onClick={()=>{
            if(isIdValid() && isPasswordValid() && isDisplayNameValid()){
              handleRegister()  
            }
          }}
          isDisabled={!isIdValid() || !isPasswordValid() || !isDisplayNameValid() || duplicateId} //입력값 다 정상적이면 회원가입버튼생김
          >회원가입
          </Button>
          {/* 회원가입버튼END */}
          
          {/* 계정질문 */}
          <SignupFooter>
            <span>계정이 있으신가요?</span> <Link to='/'> 로그인</Link>
          </SignupFooter>
          {/* END */}
        </SignUpContent>
      </SignUpBox>
    </SignUpContainer>
  );
};

export default SignUp;
