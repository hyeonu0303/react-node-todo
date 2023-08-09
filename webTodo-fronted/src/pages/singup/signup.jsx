import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

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
  return (
    <SignUpContainer>
      <SignUpBox>
        <h2>회원가입</h2>
        <InputContainer>
          <FontAwesomeIcon icon={faUser} />
          <InputField type="text" placeholder="사용자명" />
        </InputContainer>
        <InputContainer>
          <FontAwesomeIcon icon={faEnvelope} />
          <InputField type="email" placeholder="이메일" />
        </InputContainer>
        <InputContainer>
          <FontAwesomeIcon icon={faLock} />
          <InputField type="password" placeholder="비밀번호" />
        </InputContainer>
        <button>가입하기</button>
      </SignUpBox>
    </SignUpContainer>
  );
};

export default SignUp;
