import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../Api/index';
import { Line, Bar } from 'react-chartjs-2';
import styles from '../Charts/Chart.module.css';



const Charts = ({ data: { confirmed, recovered, deaths, }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await fetchDailyData());
    }

    fetchApi();
  }, [])

  const barChart = (
    confirmed
      ? (
        <Bar
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [{
              label: 'People',
              backgroundColor: ['rgb(118, 118, 201)', 'rgb(112, 221, 112)', 'rgb(209, 83, 83)'
              ],
              data: [confirmed.value, recovered.value, deaths.value],
            },
            ],
          }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },
          }}
        />
      ) : null
  )

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
              backgroundColor: 'rgb(112, 221, 112)',
              fill: true,
            }, {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: 'red',
              backgroundColor: 'rgb(209, 83, 83)',
              fill: true,
            }],
          }}
        />) : null
  );



  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}


export default Charts;