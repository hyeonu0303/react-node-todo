import { useState } from "react";
import Calendar from "@layout/Main/Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import SidebarIcon from './SidebarIcon'

const Icon = ({ icon, onClick }) => (
  <FontAwesomeIcon
    icon={icon}
    size={"2xl"}
    style={{
      position: 'absolute',
      cursor: "pointer",
      padding: "16px",
      left: "20px",
      top: "10px",
      borderRadius: '4px',
    }}
    onClick={onClick}
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
      <Icon icon={faCalendar} onClick={handleIconClick}/>
    </>
  );
};

export default Sidebar;

import styled from "styled-components";

export const SidebarWidth = styled.div`
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




