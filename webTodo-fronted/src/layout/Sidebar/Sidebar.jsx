import { useState } from "react";
import Calendar from "@layout/Main/Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import UserStatus from "@components/UserStatus";
import styled from "styled-components";
import { faHouse,faStar,faGear } from "@fortawesome/free-solid-svg-icons";
import MonthContent from "@layout/Main/MonthContent/MonthContent";

const Icon = ({ icon, onClick }) => (
  <FontAwesomeIcon
    icon={icon}
    size={"2xl"}
    onClick={onClick}
    style={{
      cursor:'pointer'
    }}
  />
);

const Sidebar = ({markDate, allData}) => {
  let [visible, setVisible] = useState(false);

  const handleIconClick = () => {
    setVisible(!visible)
  }

  
  return (
    <>
      <SidebarWidth visible={visible ? "true" : undefined}>
        <Wrapper>
        </Wrapper>

        <CalendarArea visible={visible ? "true" : undefined}>
          <Calendar mark={markDate}/>
        </CalendarArea>

        <MonthContentArea visible={visible ? "true" : undefined}>
          <MonthContent allData={allData}/>
        </MonthContentArea>

        <IconArea>
          <Icon icon={faHouse}/>
          <Icon icon={faStar}/>  
          <Icon icon={faCalendar} onClick={handleIconClick}/>
          <Icon icon={faGear}/>
        </IconArea>
        <UserStatusArea>
          <UserStatus/>
        </UserStatusArea>
      </SidebarWidth>
    </>
  );
};

export default Sidebar;


const SidebarWidth = styled.div`
  width: ${(props) => (props.visible ? "510px" : "100px")};
  height: 100%;
  position: relative;
  transition: all 0.3s;
  overflow:hidden;
  `

const Wrapper = styled(SidebarWidth)`
  width: 100px;
  height: 100%;
  background: #c6dbf4;
  position: absolute;
  left: 0;
  top: 0;
`

const CalendarArea = styled.div`
  width: 400px;
  height:100%;
  position: absolute;
  display: ${props=>props.visible ? 'block' : 'none'};
  transition: all 0.3s;
  right:0;
  top:0;
`

const MonthContentArea = styled.div`
  width:400px;
  max-height:460px;
  display: ${props=>props.visible ? 'block' : 'none'};
  transition: all 0.3s;
  position:absolute;
  top:390px;
  right:0;
  border:4px solid #eee;
  border-radius:10px;
  overflow-y: scroll;
  padding-right:10px;

  


  &::-webkit-scrollbar {
      width: 8px;  /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
      height: 28%; /* 스크롤바의 길이 */
      background: #8fbeff; /* 스크롤바의 색상 */
      border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
      background: rgba(33, 122, 244, .1);  /*스크롤바 뒷 배경 색상*/
  }
  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
`
const IconArea = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap:20px;
  position:absolute;
  left:30px;
  top:20px;
`

const UserStatusArea = styled.div`
  position:absolute;
  bottom:20px;
  left:12px;
`