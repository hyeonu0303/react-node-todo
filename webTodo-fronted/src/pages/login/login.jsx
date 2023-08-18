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
import kakaoLoginButton from "../../img/카카오버튼/kakao_login_medium_narrow.png";
import styled from "styled-components";

/**컨테이너 */
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--mainColor);
`;
const LoginBox = styled.div`
  width: 75vh;
  height: 75vh;
  background-color: #ffffff;
  padding:0 50px;
  
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const LoginHeader = styled.div`
  padding:50px;
  
`;

const LoginContent = styled.div`
  
`

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
    <LoginContainer>
      <LoginBox>
        <LoginHeader>
          <Heading as='h2'>로그인</Heading>
        </LoginHeader>
        <LoginContent>
          <FormControl isRequired>
            <FormLabel>아이디</FormLabel>
            <Input type="text" value={email} onChange={handleSetId} />
            <FormLabel>비밀번호</FormLabel>
            <Input type="password" value={password} onChange={handleSetPw} />
            <Button
              colorScheme="linkedin"
              variant="outline"
              style={{ width: "100%" }}
              size="md"
              mt={5}
              onClick={() => {
                axios
                .post("/api/login", {
                    email: email,
                    password: password,
                  })
                  .then((result) => {
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
              style={{ padding: "0" }}
              onClick={() => {
                window.location.href = "/auth/google";
              }}
              >
              <Image src={googleLoginButton}></Image>
            </Button>
            <br />
            <br />
            <Button
              style={{ padding: "0" }}
              onClick={() => {
                window.location.href = "/auth/kakao";
              }}
            >
              <Image src={kakaoLoginButton}></Image>
            </Button>
          </FormControl>
        </LoginContent>
      </LoginBox>
    </LoginContainer>
  );
}

export default Login;
