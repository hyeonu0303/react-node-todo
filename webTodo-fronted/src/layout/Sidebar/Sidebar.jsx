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
      <SidebarWidth visible={visible}>
        <Wrapper>
        </Wrapper>
        <CalendarArea visible={visible}>
          <Calendar mark={markDate}/>
        <MonthContentArea visible={visible}>
          <MonthContent allData={allData}/>
        </MonthContentArea>
        </CalendarArea>
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
  margin-bottom:10px;
  
  `

const Wrapper = styled(SidebarWidth)`
  width: 100px;
  height: 100%;
  background: #c6dbf4;
  position: absolute;
  left: 0;
  top: 0;
`

const CalendarArea = styled(SidebarWidth)`
  width: 400px;
  position: absolute;
  display: ${props=>props.visible ? 'block' : 'none'};
  transition: all 0.3s;
  right:0;
  top:0;
`

const MonthContentArea = styled.div`
  width:400px;
  display: ${props=>props.visible ? 'block' : 'none'};
  transition: all 0.3s;
  position:absolute;
  top:390px;
  right:0;
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