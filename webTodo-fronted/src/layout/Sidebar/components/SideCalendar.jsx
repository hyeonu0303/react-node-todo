import Calendar from "@layout/Main/Calendar";
import MonthContent from "@layout/Main/MonthContent/MonthContent";
import styled from "styled-components";

const SideCalendar = ({visible}) => {
  return(
    <>
      <CalendarArea visible={visible ? "true" : undefined}>
        <Calendar/>
      </CalendarArea>

      <MonthContentArea visible={visible ? "true" : undefined}>
        <MonthContent/>
      </MonthContentArea>
    </>

  ) 
}

export default SideCalendar;


const CalendarArea = styled.div`
  width: 400px;
  height:100%;
  position: absolute;
  display: ${props=>props.visible ? 'block' : 'none'};
  transition: all 0.3s;
  right:0;
  top:0;
  margin-top: 10px;
`

const MonthContentArea = styled.div`
  width:400px;
  max-height:515px;
  display: ${props=>props.visible ? 'block' : 'none'};
  transition: all 0.3s;
  position:absolute;
  top:390px;
  right:0;
  border:4px solid #eee;
  border-radius:10px;
  overflow-y: scroll;
  padding-right:10px;
  margin-top: 10px;

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