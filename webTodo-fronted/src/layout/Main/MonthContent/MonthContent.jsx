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
    if (allData) {
      const targetDate = YearMonth;

      const filterDataByMonth = allData
          .filter(item => item.date.startsWith(targetDate))
          .map(item => ({
            date: moment(item.date).format('DD'),
            content: item.content}));

      const groupedData = filterDataByMonth.reduce((acc, curr) => {
        const existingItem = acc.find(item => item.date === curr.date);
        if (existingItem) {
            existingItem.content.push(curr.content);
        } else {
            acc.push({ date: curr.date, content: [curr.content] });
        }
        return acc;
      }, []);

      setChangeData(groupedData); // 2. 상태 업데이트
    }
  }, [allData,YearMonth]); 
  
  const copyData = [...changeData];
  /**날짜 정렬 */
  const sortedData = copyData.sort((a,b)=>{
    return parseInt(a.date) - parseInt(b.date);
  })

  console.log(sortedData)

    return(
      <MonthWrapper>
        {
          sortedData.map((item,index)=>(
            <>
              <p key={index}>{item.date}</p>
              {
                item.content.map((content,i)=>(
                  <p key={i}>
                    {content}
                  </p>
                ))
              }
              <br/>              
            </>
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



