import styled from "styled-components";

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
    color:rgb(47, 199, 42);
  }
`