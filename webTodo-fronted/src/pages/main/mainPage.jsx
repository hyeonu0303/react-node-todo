import { useEffect, useState } from "react";
import { Grid, GridItem, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGear, faStar, faBell } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import './reactCalendar.css';
import UserStatus from "../../components/UserStatus";
import { useDispatch } from "react-redux";
import {login} from '../../store/userSlice';
import OriginModal from "./component/todoPage";
import moment from 'moment';
import { changeDate } from "../../store/todoSlice";
import axios from 'axios';
import { styled } from "styled-components";

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

  /**날짜변경 */
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //선택한 날짜 todoSlice에 저장
  const [selectedDate, setSelectedDate] = useState(new Date());
  let formatdate = moment(selectedDate).format('YYYY-MM-DD');

  useEffect(()=>{
    dispatch(changeDate(formatdate));
  },[formatdate])

  //이사람에대한 date들을 다 보내서 배열에 저장한다..
  const [mark, setMark] = useState();
  
  /**날짜정보가져옴 */
  useEffect(()=>{
    axios.get('/api/data')
      .then((result)=>{
        setMark(result.data.dates);
      })
  },[])
  
  const Dot = styled.div`
    height: 8px;
    width: 8px;
    background-color: #f87171;
    border-radius: 50%;
    display: flex;
    position:absolute;
  `

  const tileContent = ({ date }) => {
    if (!mark) {
      return null; // Return null when data is not loaded
    }

    if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
      return <Dot />;
    }

    return null; // No Dot for this date
  };
    /**
     * get요청을하면 DB에있는날짜를 가져다줘서 setMark에저장
     * 
     */
  const iconSize = "2x";
  const iconMarginBottom = "1rem";

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Grid
        h="100%"
        templateRows="repeat(12, 1fr)"
        templateColumns="repeat(12, 1fr)"
        gap={4}
      >
        <GridItem
          rowSpan={[1, 12, 12]}
          colSpan={[12, 1, 1]}
          bg="var(--mainColor)"
          textAlign={["center", "left"]}
          padding="2rem"
        >
          <Flex
            direction={["row", "column"]}
            alignItems={["center", "flex-start"]}
            justifyContent={["space-between", "flex-start"]}
            h="100%"
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
          </Flex>
        </GridItem>
        <GridItem
          rowSpan={[3, 5, 12]}
          colSpan={[12, 11, 3]}
          padding={["1rem", "2rem"]}
        >
          <Calendar 
            calendarType="hebrew" //일요일부터시작 지우면 월요일부터
            onChange={handleDateChange} //선택날짜 selectedDate변수에담아줌
            value={selectedDate} //날짜 선택
            minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
            next2Label={null} //>>모양제거
            prev2Label={null} //<<모양제거
            formatDay={(locale, date) => moment(date).format("DD")} //날짜 뒤 '일'제거
            tileContent={tileContent} //Dot넣어주기 위한것(Dot필요없으면 생략!)
          />
          {/* 선택한날짜표시 */}
          <span>{moment(selectedDate).format('YYYY년 MM월 DD일')}</span>
        </GridItem>
        <GridItem rowSpan={[7, 7, 12]} colSpan={[12, 11, 7]} padding={["1rem", "2rem"]}>
          <OriginModal></OriginModal>
        </GridItem>
      </Grid>
    </div>
  );
};

export default MainPage;