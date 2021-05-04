import React,{useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./App.css";

import DetailDay from './components/Day/DetailDay';
import Days from "./components/Days/Days";
import UseScript from "./UseScript";

const App =() => {


  useEffect(() => {

    fetchData();
  
  }, []);

  UseScript("https://unpkg.com/ionicons@5.4.0/dist/ionicons.js");


  const daysInWeek = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [dailyForecast, setDailyForecast] = useState([]);
  
  const fetchData = async () => {
    
    
    
    const apiKey = "75f0ce8e280c94504c81b2e5a39e5c9b";
    const [lon, lat] = [105.8833, 21.1167];
    const exclude = "alerts"; // exclude = current,minutely,hourly,daily,alerts
    const cors_api_host = "https://cors-anywhere.herokuapp.com/";
    
    const endPoint = `${cors_api_host}api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}`;
    const data = await fetch(endPoint, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const dailyJson = await data.json();
    const dataEveryday = dailyJson.daily;
    const dataResult = await getDaySpecific(dataEveryday);
    const removeLastDay = dataResult.pop();

    //waiting for fetching
   // setDailyForecast({data: dataResult, isFetching: true});

    console.log(dataResult);

    setDailyForecast(dataResult);
  };

  const getDaySpecific = async (arrDays) => {
    return arrDays.map((item, index) => {
      const converseDate = EpochToDate(item.dt);
      const current = new Date();
      const currentTime = current.getHours() + ":" + ( (current.getMinutes() < 10) ? "0" + current.getMinutes() : current.getMinutes() );
      const amOrPm = current.getHours() < 12 ? 'am' : 'pm';
      const todayTime = currentTime + amOrPm +', '+ monthNames[converseDate.getMonth()] + ' ' + converseDate.getDate();

      const sunriseDate = EpochToDate(item.sunrise).getHours() + ":" + ( (EpochToDate(item.sunrise).getMinutes() < 10) ? "0" + EpochToDate(item.sunrise).getMinutes() : EpochToDate(item.sunrise).getMinutes() );
      const sunsetDate = EpochToDate(item.sunset).getHours() + ":" + ( (EpochToDate(item.sunset).getMinutes() < 10) ? "0" + EpochToDate(item.sunset).getMinutes() : EpochToDate(item.sunset).getMinutes() );

      const sunriseTime = sunriseDate + (EpochToDate(item.sunrise).getHours() < 12 ? 'am' : 'pm');
      const sunsetTime = sunsetDate + (EpochToDate(item.sunset).getHours() < 12 ? 'am' : 'pm');
      
      return {
        id: index + 2000,
        title: daysInWeek[converseDate.getDay()],
        today: todayTime,
        sunrise: sunriseTime,
        sunset: sunsetTime,
        windSpeed: item.wind_speed,
        description: item.weather[0].description,
        clouds: item.clouds,
        rain: item.rain,
        pops: item.pop,
        image: item.weather[0].icon,
        temp: (item.temp.day - 273.15).toFixed(2)
      };
    });
  };

  // Remove
  const generateUniqueKey = () => {
    return Math.random().toString(36).substr(2, 9);
  }

  //Epoch To Date
  const EpochToDate = (epoch) => {
    if (epoch < 10000000000) epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
    var epoch = epoch + new Date().getTimezoneOffset() * -1; //for timeZone
    return new Date(epoch);
  };



  return (
    <Router>
      <div className="App">
        <h1 className="Title">Forecast in next 7 days weather</h1>
        <Link to="/" className="Logo">Weather Locally</Link>
        <Switch>
          <Route path='/' exact >
            <Days forecast={dailyForecast}/>
          </Route>
          <Route 
              path='/day/:id' 
              render={(props) => (<DetailDay forecast= {dailyForecast} {...props} />)}      
          />
        </Switch>
  
      </div>
    </Router>
    
  );
  
}

export default App;
