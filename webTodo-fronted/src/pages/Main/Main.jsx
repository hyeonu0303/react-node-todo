/*eslint-disable */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {login} from '@/store/userSlice';
import TodoInputModal from "@layout/Main/TodoInputModal";
import TodoContent from "@layout/Main/TodoContent";
import axios from "axios";
import Sidebar from "@layout/Sidebar";
import styled from "styled-components";
import { setAllUniqueDates } from "@/store/dateSlice";
import { insertData, insertMarkDate } from "@/store/dataSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const allData = useSelector(state=>state.data.data)
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const googleName = urlParams.get('googleName');
    if(googleName){
      dispatch(login(googleName));
    }
    const kakaoName = urlParams.get('kakaoName');
    if(kakaoName) dispatch(login(kakaoName));
  },[dispatch]);
    
  const axiosAllData = () => {
    axios.get('/api/data')
      .then((result)=>{

        const allDates = result.data.map(item => item.date).flat();

        const uniqueDates = [...new Set(allDates.sort())];

        dispatch(setAllUniqueDates(uniqueDates))
        dispatch(insertMarkDate(uniqueDates))
        dispatch(insertData(result.data))
      })
  }
  
  
  useEffect(()=>{
    axiosAllData();
  },[])

  console.log()

  return (
    <MainContainer>
      <Sidebar/>
      <ContentWrapper>
        <TodoInputModal getAllData={axiosAllData}/>
        <TodoContent  getAllData={axiosAllData}/>
      </ContentWrapper>
    </MainContainer>    
    )
  }
export default MainPage;

const MainContainer= styled.div`
  display: flex;
  width: 100%;
  height: 100%;

`

const ContentWrapper = styled.div`
  display:flex;
  height: 100%;
  flex:1;
  flex-direction: column;
  padding-right:10px;
  padding-top: 10px;
`
