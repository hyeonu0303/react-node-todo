import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {login} from '@/store/userSlice';
import TodoInputModal from "@layout/Main/TodoInputModal";
import axios from "axios";
import Sidebar from "@layout/Sidebar";
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

  const [markDate, setMarkDate] = useState();
  const [allData, setAllData] = useState();

  /**날짜 데이터*/
  useEffect(()=>{
    axios.get('/api/data')
      .then((result)=>{
        const dates = new Set();

        result.data.forEach((item) => {
          dates.add(item.date);
        });

        let datesArray = [...dates];
        setMarkDate(datesArray)
        setAllData(result.data);
      })
    },[])

  return (
    <MainContainer>
      <Sidebar markDate={markDate}/>
      <ContentWrapper>
        <TodoInputModal/>
      </ContentWrapper>
      </MainContainer>    
    )

    


    /* {/*   <Grid
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
          
          <TodoInputModal/>
        </GridItem>
        
        <GridItem
          colSpan={[12,10,10,7]}
          rowSpan={[8,10]}
          // bg='yellow.400'
          >
          <Box>
            {
              allData ?
              <TodoContent allData={allData}/>
              : <p>데이터로딩중...</p>
            }
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

      </Grid> */}

export default MainPage;


import styled from "styled-components";

export const MainContainer= styled.div`
  display: flex;
  width: 100%;
  height: 100%
`

export const ContentWrapper = styled.div`
  display:flex;
  height: 100%;
  flex:1;
  flex-direction: column;
`
