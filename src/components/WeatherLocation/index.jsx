import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types';
import Location from './Location';
import WeatherData from './WeatherData';
import transformWeather from './../../services/transformWeather'
import {getUrlWeatherByCity} from './../../services/getUrlWeatherByCity'
import './styles.css';

class WeatherLocation extends Component {

  constructor(props) {
    super(props);
    const { city } = props
    this.state = {
      city,
      data: null,
    }
  }

  componentDidMount(){
    this.handleUpdateClick();
  }

  handleUpdateClick = () => {
    const api_weather = getUrlWeatherByCity(this.state.city)
    fetch(api_weather).then(resolve => {     
      return resolve.json()
    }).then(data => {
        const newWeather = transformWeather(data);
        this.setState({
        data: newWeather
      })
    })
  }
    
  render() {
    const {onWeatherLocationClick} = this.props
    const {city, data } = this.state;
    return(
      <div className= "weatherLocationCont" onClick= {onWeatherLocationClick}>
        <Location city = {city}/>
        { !data ? <CircularProgress size = {50} /> : <WeatherData data= {data}/> }
      </div>
  )}
}

WeatherLocation.proTypes = {
  city: PropTypes.string.isRequired,
  onWeatherLocationClick: PropTypes.func,
}
export default WeatherLocation;