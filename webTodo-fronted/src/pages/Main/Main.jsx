import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {login} from '@/store/userSlice';
import TodoInputModal from "@layout/Main/TodoInputModal";
import TodoContent from "@layout/Main/TodoContent";
import axios from "axios";
import Sidebar from "@layout/Sidebar";
import styled from "styled-components";

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
        <TodoContent allData={allData}/>
      </ContentWrapper>
    </MainContainer>    
    )
  }
export default MainPage;

const MainContainer= styled.div`
  display: flex;
  width: 100%;
  height: 100%
`

const ContentWrapper = styled.div`
  display:flex;
  height: 100%;
  flex:1;
  flex-direction: column;
`