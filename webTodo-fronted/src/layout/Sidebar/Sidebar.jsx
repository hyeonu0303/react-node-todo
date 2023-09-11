import { useState } from "react";
import Calendar from "@layout/Main/Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import SidebarIcon from './SidebarIcon'

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


const Sidebar = ({markDate}) => {
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
        </CalendarArea>
      </SidebarWidth>
      <IconArea>
        <Icon icon={faHouse}/>
        <Icon icon={faStar}/>  
        <Icon icon={faCalendar} onClick={handleIconClick}/>
        <Icon icon={faGear}/>
      </IconArea>
    </>
  );
};

export default Sidebar;

import styled from "styled-components";

import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
const SidebarWidth = styled.div`
  width: ${(props) => (props.visible ? "510px" : "100px")};
  height: 100%;
  position: relative;
  transition: all 0.3s;
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
  height: 100%;
  position: absolute;
  display: ${props=>props.visible ? 'block' : 'none'};
  transition: all 0.3s;
  right:0;
  top:0;
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