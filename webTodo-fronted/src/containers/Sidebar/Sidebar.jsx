import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { SidebarWidth, Wrapper } from "./Sidebar.styles";
import { useState } from "react";

const Sidebar = () => {
  const [visible, setVisible] = useState(true);
  return (
    <SidebarWidth visible={visible}>
      <Wrapper></Wrapper>
      <FontAwesomeIcon
        icon={visible ? faAngleLeft : faAngleRight}
        size={"2xl"}
        style={{
          position: 'absolute',
          cursor: "pointer",
          padding: "16px",
          left: "20px",
          top: "10px",
          transition: "all 0.3s",
          borderRadius: '4px',
          background: visible ? '' : '#bdbdbdbd'
        }}
        onClick={() => {
          setVisible(!visible);
        }}
      />
    </SidebarWidth>
  );
};

export default Sidebar;
