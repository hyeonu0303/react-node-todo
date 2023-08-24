import { useEffect, useState } from "react";
import { Grid, GridItem, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGear, faStar, faBell } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import './reactCalendar.css';
import UserStatus from "../../components/UserStatus";
import { useDispatch,useSelector } from "react-redux";
import {login} from '../../store/userSlice';
import OriginModal from "./addTodo/originModal";
import moment from 'moment';
import { changeDate } from "../../store/todoSlice";


const MainPage = () => {
  let dispatch = useDispatch();
  const todo = useSelector(state=>state.todo);
  
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const googleName = urlParams.get('googleName');
    if(googleName){
      dispatch(login(googleName));
    }
    const kakaoName = urlParams.get('kakaoName');
    if(kakaoName) dispatch(login(kakaoName));
  },[dispatch]);


  //선택한 날짜 todoSlice에 저장
  const [selectedDate, setSelectedDate] = useState(new Date());
  let formatdate = moment(selectedDate).format('YYYY-MM-DD');
  useEffect(()=>{
    dispatch(changeDate(formatdate));
  },[formatdate])
  //확인용
  console.log(todo);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const iconSize = "2x";
  const iconMarginBottom = "1rem";

  /* let date = useQuery(['date',formatdate],()=>{
    axios.get(`/data?date=${formatdate}`)
      .then((result)=>{
        console.log('요청됨'+result.data);
        return result.data;
      })
  }) */
  
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
            onChange={handleDateChange}  
            value={selectedDate} 
            minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
            next2Label={null}
            prev2Label={null}
            formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
          />
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