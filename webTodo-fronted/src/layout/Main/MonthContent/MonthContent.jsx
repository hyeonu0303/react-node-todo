import React from "react";
import styled from "@emotion/styled";
import { useEffect, useState} from "react";
import { useSelector } from 'react-redux'
import moment from "moment";
const MonthContent = ({allData}) => {
  console.log(allData); // 모든 데이터

  let YearMonth = useSelector(state => state.date.selectMonth)
  console.log(YearMonth) //YYYY-MM 데이터

  const [changeData, setChangeData] = useState([]); //변경된 데이터
  /**
   * 모든데이터 date:01, content:[Array] 형식으로 변경로직
   */
  useEffect(() => {
    if (allData && YearMonth) {
      // 현재 선택된 년도와 월에 해당하는 데이터만 필터링
      const filteredData = allData.filter(item => 
        item.date.some(d => d.startsWith(YearMonth))
      );
  
      // 필터링된 데이터를 기반으로 새로운 배열 생성
      const newArr = filteredData.flatMap(({content, date}) => 
        date.map(c => ({
          content: content,
          date: moment(c).format('DD')
        }))
      );
      console.log(newArr);
      // 새로운 배열을 그룹화
      const groupedData = newArr.reduce((acc, curr) => {
        const existingItem = acc.find(item => item.date === curr.date);
        console.log(existingItem);
        if (existingItem) {
          existingItem.content.push(curr.content);
        } else {
          acc.push({ date: curr.date, content: [curr.content] });
        }
        return acc;
      }, []);
  
      setChangeData(groupedData);
    }
  }, [allData, YearMonth]);
  
  // allData,YearMonth
  
  
  const copyData = [...changeData];
  /**날짜 정렬 */
  const sortedData = copyData.sort((a,b)=>{
    return parseInt(a.date) - parseInt(b.date);
  })

  /**
   * {date:'', content:[]} 이런식으로 데이터변형
   */
  console.log(sortedData)

    return(
      <MonthWrapper>
        {
          sortedData.map((item,index)=>(
            <React.Fragment key={index}>
              <p>{item.date}</p>
              {
                item.content.map((content,i)=>(
                  <p key={i}>
                    {content}
                  </p>
                ))
              }
              <br/>              
              </React.Fragment>
          ))
        }
      </MonthWrapper>
    );
  
}

export default MonthContent;

const MonthWrapper = styled.div`
  font-size:1rem;
  padding:0 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  `




