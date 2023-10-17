import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import UserStatus from "@components/UserStatus";
import styled from "styled-components";
import { faHouse,faStar,faGear } from "@fortawesome/free-solid-svg-icons";
import SideCalendar from "./components/SideCalendar";
import SideImportance from "./components/SideImportance";
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

const Sidebar = () => {
  let [visible, setVisible] = useState({
    type:'',
    valid:false
  });

const handleIconClick = (type) => {
  if(type == 'calendar' || type=='importance'){
    setVisible(prev=>({
      type:type,
      valid: !prev.valid
    }))
  }
}

  return (
    <>
      <SidebarWidth visible={visible.valid ? "true" : undefined}>
        <Wrapper>
        </Wrapper>
        {
          visible.type=='calendar' ? (
          <SideCalendar
            visible={visible.valid}
          />)
          : visible.type=='importance'? (
            <SideImportance
              visible={visible.valid}
            />
          ):null
        }
      

        <IconArea>
          <Icon icon={faHouse}/>
          <Icon icon={faStar} onClick={()=>{handleIconClick('importance')}}/>  
          <Icon icon={faCalendar} onClick={()=>{handleIconClick('calendar')}}/>
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
  width: ${(props) => (props.visible ? "512px" : "100px")};
  height: 100%;
  position: relative;
  transition: all 0.3s;
  overflow:hidden;
  `

const Wrapper = styled(SidebarWidth)`
  width: 100px;
  height: 100%;
  background: var(--mainColor);
  position: absolute;
  left: 0;
  top: 0;
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