import { useSelector } from "react-redux";
import styled from "styled-components";
const SideImportance = ({visible}) => {
  const importanceContent = useSelector(state=>state.importance.importanceContent)

  return(
    <>
      <ImportanceArea visible={visible ? true : undefined}>
        {
          importanceContent.map((data,idx)=>{
            return(
              <div key={idx}>
                {data.content}
                {data.time}
              </div>
            )
          })
        }
      </ImportanceArea>
    </>
  )
}

export default SideImportance;

const ImportanceArea = styled.div`
  width: 400px;
  height:100%;
  position: absolute;
  display: ${props=>props.visible ? 'block' : 'none'};
  transition: all 0.3s;
  right:0;
  top:0;
  margin-top: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
      width: 5px;  /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
      height: 28%; /* 스크롤바의 길이 */
      background: #eee; /* 스크롤바의 색상 */
      border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
      background: none;  /*스크롤바 뒷 배경 색상*/
  }
  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
`