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

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState('');
  /**
   * id입력란 input값 가져오는 함수
   */
  const handleSetId = (e) => {
    setId(e.target.value);
  }
  /**
   * pw입력란 input값 가져오는함수
   */
  const handleSetPw = (e) =>{
    setPassword(e.target.value)
  }
  
  
  const isError = id === "";
  return (
    <Container mt={5}>
      <Center>
        <Heading as="h2" size='lg'>로그인</Heading>
      </Center>
      <Center>
        <FormControl isInvalid={isError} isRequired>
          <FormLabel>아이디</FormLabel>
          <Input type="text" value={id} onChange={handleSetId} />
          <FormLabel>비밀번호</FormLabel>
          <Input type="password" value={password} onChange={handleSetPw} />
          <Button 
            colorScheme="linkedin" 
            variant='outline' 
            size="md"
            mt={5} 
            onClick={()=>{
              axios.post('/api/login',{
                id:id,
                password:password
              })
              .then((response)=>{
                console.log(response)
              })
              .catch((error)=>{
                console.log(error)
              })
          }}>Login</Button>
        </FormControl>
      </Center>
    </Container>
  );
}

export default Login;
