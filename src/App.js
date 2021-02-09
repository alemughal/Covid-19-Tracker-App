import React from 'react';
import Cards from './Components/Cards/Cards';
import Charts from './Components/Charts/Charts';
import CoutryPicker from './Components/CountryPicker/CountryPicker';
// import logo from './logo.svg';
import styles from './App.module.css';
import { fetchData } from './Api/index';


class App extends React.Component {
  state = {
    data : {}
  }
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({data : fetchedData})

  }


  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <Cards data={data} />
        <Charts />
        <CoutryPicker />
      </div>
    )
  }
}


export default App;