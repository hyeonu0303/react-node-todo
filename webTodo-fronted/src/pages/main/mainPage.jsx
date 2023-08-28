import { useEffect } from "react";
import { Grid, GridItem, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGear, faStar, faBell } from "@fortawesome/free-solid-svg-icons";
import UserStatus from "../../components/UserStatus";
import { useDispatch } from "react-redux";
import {login} from '../../store/userSlice';
import OriginModal from "./component/originModal";
import ReactCalendar from "./component/Calendar";
import { MainContainer,Nav } from "./mainPageStyle";

const MainPage = () => {
  let dispatch = useDispatch();
  
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const googleName = urlParams.get('googleName');
    if(googleName){
      dispatch(login(googleName));
    }
    const kakaoName = urlParams.get('kakaoName');
    if(kakaoName) dispatch(login(kakaoName));
  },[dispatch]);
  const iconSize = "2x";
  const iconMarginBottom = "1rem";

  return (
    <MainContainer>
      <Grid
        h='100%'
        templateRows={'repeat(12,1fr)'}
        templateColumns={'repeat(12,1fr)'}
        gap={3}
      >
        <GridItem
          colSpan={[12,1]}
          rowSpan={[1,12]}
          bg='orange.400'
        >
          Nav
        </GridItem>
        
        <GridItem
          colSpan={3}
          rowSpan={4}
          bg='green.300'
          w='400px'
          display={['none',null,null,'block']}
        >
          달력
        </GridItem>
        
        <GridItem
          colSpan={[12,11,11,8]}
          rowSpan={3}
          bg='blue.300'
        >
          할일 입력란
        </GridItem>
        
        <GridItem
          colSpan={[12,11,11,8]}
          rowSpan={[8,9]}
          bg='yellow.400'
          >
          할일내용
          </GridItem>

        <GridItem
          colSpan={3}
          rowSpan={8}
          bg='blue.800'
          w='400px'
          display={['none',null,null,'block']}
        >
          캐릭터
        </GridItem>

      </Grid>
      {/* <FontAwesomeIcon
        icon={faHouse}
        size={iconSize}
        style={{ marginBottom: iconMarginBottom }}
      />
      <FontAwesomeIcon
        icon={faStar}
        size={iconSize}
        style={{ marginBottom: iconMarginBottom }}
      />
      <FontAwesomeIcon
        icon={faBell}
        size={iconSize}
        style={{ marginBottom: iconMarginBottom, marginLeft: 4 }}
      />
      <FontAwesomeIcon
        icon={faGear}
        size={iconSize}
        style={{ marginBottom: iconMarginBottom, marginLeft: 2.7 }}
      /> */}
      {/* 유저로그인 */}
      {/* <UserStatus /> */}
      
      
      
      {/* <ReactCalendar/> */}
      {/* 할일입력박스 */}
      {/* <OriginModal></OriginModal> */}
    </MainContainer>    
  );
};

export default MainPage;