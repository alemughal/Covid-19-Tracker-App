import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from '../CountryPicker/CountryPicker.module.css';
import { fetchCountries } from '../../Api';

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setFetchedCountries(await fetchCountries());
    }
    fetchApi();
  }, [setFetchedCountries]);

  // console.log(fetchedCountries)
  return (
    <FormControl className={styles.conatiner}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        {fetchedCountries.map((country, ind) => <option key={ind} value={country}> {country} </option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker;