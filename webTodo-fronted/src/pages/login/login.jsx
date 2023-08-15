import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Container,
  Button,
  Heading,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/userSlice";
import googleLoginButton from "../../img/구글버튼/btn_google_signin_light_normal_web.png";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let dispatch = useDispatch();
  /**
   * id입력란 input값 가져오는 함수
   */
  const handleSetId = (e) => {
    setEmail(e.target.value);
  };
  /**
   * pw입력란 input값 가져오는함수
   */
  const handleSetPw = (e) => {
    setPassword(e.target.value);
  };
  //user에서 res.json으로 보낸데이터값과 일치하면 보여주는식
  return (
    <Container mt={5}>
      <Center>
        <Heading as="h2" size="lg">
          로그인
        </Heading>
      </Center>
      <Center>
        <FormControl isRequired>
          <FormLabel>아이디</FormLabel>
          <Input type="text" value={email} onChange={handleSetId} />
          <FormLabel>비밀번호</FormLabel>
          <Input type="password" value={password} onChange={handleSetPw} />
          <Button
            colorScheme="linkedin"
            variant="outline"
            size="md"
            mt={5}
            onClick={() => {
              axios
                .post("/api/login", {
                  email: email,
                  password: password,
                })
                .then((result) => {
                  console.log(result.data.user.username);
                  const username = result.data.user.username;
                  dispatch(login(username));
                  navigate("/");
                })
                .catch((error) => {
                  if (error.response) {
                    console.error(
                      "서버로부터의 응답:",
                      error.response.data.message
                    );
                  } else {
                    console.error("Axios 요청 오류:", error.message);
                  }
                });
            }}
          >
            Login
          </Button>
          <br />
          <Button
            style={{padding:'0'}}
            onClick={() => {
              window.location.href = "/auth/google";
            }}
          >
            <Image src={googleLoginButton}></Image>
          </Button>
        </FormControl>
      </Center>
    </Container>
  );
}

export default Login;
