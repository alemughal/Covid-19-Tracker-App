import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../Api/index';
import { Line, Bar } from 'react-chartjs-2';
import styles from '../Charts/Chart.module.css';


function Charts() {
  const [dailyData, setDailyData] = useState([])
  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await fetchDailyData());
    }

    console.log(dailyData)


    fetchApi();
  })

  const lineChart = (
    dailyData.length
      ? (
        <Line
          data={{
            labels: dailyData.map(({ date }) => date),
            datasets: [{
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "blue",
              fill: true,
            }, {
              data: dailyData.map(({ recovered }) => recovered),
              label: "Recovered",
              borderColor: 'green',
              fill: true,
            }, {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: 'red',
              fill: true,
            }],
          }}
        />) : null
  );

  return (
    <div className={styles.container}>
      {lineChart}
    </div>
  )
}


export default Charts;