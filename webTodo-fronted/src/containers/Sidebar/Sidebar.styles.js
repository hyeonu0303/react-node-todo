import styled from "styled-components";

export const SidebarWidth = styled.div`
  width: ${(props) => (props.visible ? "100px" : "0")};
  height: 100%;
  position: relative;
  transition: all 0.3s;
`;

export const Wrapper = styled(SidebarWidth)`
  width: 100px;
  height: 100%;
  background: #c6dbf4;
  position: absolute;
  right: 0;
  top: 0;
`;
