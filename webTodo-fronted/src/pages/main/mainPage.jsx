import { useState, useEffect } from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGear, faStar, faBell } from "@fortawesome/free-solid-svg-icons";
import UserStatus from "../../components/UserStatus";
import { useDispatch } from "react-redux";
import {login} from '../../store/userSlice';
import OriginModal from "./component/originModal";
import { MainContainer } from "./mainPageStyle";
import Calendar from './component/Calendar';
import axios from "axios";

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

  const [mark, setMark] = useState();
  
  /**날짜,todo입력정보가져옴 */
  useEffect(()=>{
    axios.get('/api/data')
      .then((result)=>{
        let dates = result.data.importanceData.dates; //날짜데이터
        let contents = result.data.importanceData.contents; //할일목록데이터
        setMark(dates);
        console.log(result.data.contents)
      })
  },[])

  const iconSize = "2x";
  const iconMarginBottom = "1rem";

  return (
    <MainContainer mr='3'>
      <Grid
        h='100%'
        templateRows={'repeat(12,1fr)'}
        templateColumns={'repeat(12,1fr)'}
        gap={4}
      >
        <GridItem
          colSpan={[12,1]}
          rowSpan={[1,12]}
          bg='#c6dbf4'
          w={['100%','100px']}
        >
          <Box
            display='flex'
            flexDirection='column'
            mt='5'
          >
            <FontAwesomeIcon
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
            />
            <UserStatus /> 

          </Box>
        </GridItem>
        
        <GridItem
          colSpan={3}
          rowSpan={4}
          // bg='green.300'
          w='100%'
          h='400px'
          display={['none',null,null,'block']}
          p='2'
          
        >
          <Box 
            display='flex' 
            alignItems='center' 
            justifyContent='center' 
            h='100%' 
            w='100%'
          >
          <Calendar mark={mark}/>
          </Box>
        </GridItem>
        
        <GridItem
          colSpan={[12,10,10,7]}
          rowSpan={2}
          // bg='blue.200'
          mt='2'
        >
          
          <OriginModal/>
        </GridItem>
        
        <GridItem
          colSpan={[12,10,10,7]}
          rowSpan={[8,10]}
          // bg='yellow.400'
          >
          <Box>
            할일내용
          </Box>
          </GridItem>

        <GridItem
          colSpan={3}
          rowSpan={8}
          // bg='blue.800'
          w='400px'
          display={['none',null,null,'block']}
        >
          캐릭터
        </GridItem>

      </Grid>
    </MainContainer>    
  );
};

export default MainPage;