import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Container,
  Button,
  Heading
} from "@chakra-ui/react";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  /**
   * id입력란 input값 가져오는 함수
   */
  const handleSetId = (e) => {
    setEmail(e.target.value);
  }
  /**
   * pw입력란 input값 가져오는함수
   */
  const handleSetPw = (e) =>{
    setPassword(e.target.value)
  }
  return (
    <Container mt={5}>
      <Center>
        <Heading as="h2" size='lg'>로그인</Heading>
      </Center>
      <Center>
        <FormControl isRequired>
          <FormLabel>아이디</FormLabel>
          <Input type="text" value={email} onChange={handleSetId} />
          <FormLabel>비밀번호</FormLabel>
          <Input type="password" value={password} onChange={handleSetPw} />
          <Button 
            colorScheme="linkedin" 
            variant='outline' 
            size="md"
            mt={5} 
            onClick={()=>{
              axios.post('/api/login',{
                email:email,
                password:password
              })
              .then((result)=>{
                navigate('/')
                console.log(result.data)
              })
              .catch((error)=>{
                if (error.response) {
                  console.error('서버로부터의 응답:', error.response.data.message);
              } else {
                  console.error('Axios 요청 오류:', error.message);
              }
              })
          }}>Login</Button>
        </FormControl>
      </Center>
    </Container>
  );
}

export default Login;
