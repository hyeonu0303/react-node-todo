import styled from "styled-components";
const Loading = () => {
  return(
    <LoadingWrapper>
      <Loader/>
    </LoadingWrapper>
  )
}

export default Loading;

const LoadingWrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  height:100vh;
`

const Loader = styled.div`
        width: 48px;
        height: 48px;
        border-radius: 50%;
        position: relative;
        animation: rotate 1s linear infinite;
      
      &::before , &::after {
        content: "";
        box-sizing: border-box;
        position: absolute;
        inset: 0px;
        border-radius: 50%;
        border: 5px solid black;
        animation: prixClipFix 2s linear infinite ;
      }
      &::after{
        transform: rotate3d(90, 90, 0, 180deg );
        border-color: var(--mainColor);
      }

      @keyframes rotate {
        0%   {transform: rotate(0deg)}
        100%   {transform: rotate(360deg)}
      }

      @keyframes prixClipFix {
          0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
          50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
          75%, 100%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
      }
`;