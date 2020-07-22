import React, { Component } from 'react';
import weatherHandler from './fetcher.js';
import './App.css';

/* 
 * handles the form to search city and displays the searched city
 */
class CountrySearch extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        window.addEventListener("keydown",  (e) => {
            if(e.keyCode == 13){
                this.handleSubmit();
            }
        });
    }

    handleNameChange(e) {
        this.props.onCityChange(e.target.value);
    }

    handleSubmit() {
        this.props.onCitySubmit();
    } 

    render() {
        return (
            <div className="countrySearch">
                <input className="locationInput" placeholder={this.props.searchMessage} value={this.props.cityName} onChange={this.handleNameChange}/>
                <button className="submitButton" onClick={this.handleSubmit}></button>
                <h1 className="displayname">
                    {this.props.displayName}
                </h1>
            </div>
        );
    }
}

/*
    Displays the current temperature and clouds
    props:
    displayName: the current city the weather is shown for
    currentTemp: current temperature
    clouds: current state of clouds
*/
class PrimaryWeather extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <div className="primaryweather"> 
            <div className="weathergrid">
                <div className="leftweather">
                    <p className="mintemp">
                        min: {this.props.minTemp}&#8451;
                    </p>
                </div>
                <div className="centreweather">
                    <p className="currenttemp">
                        {this.props.currentTemp}&#8451;
                    </p>
                </div>
                <div className="rightweather">
                    <p className="maxtemp">
                        max: {this.props.maxTemp}&#8451;
                    </p>                    
                </div>
            </div>
            </div>   
        );
    }
}

/*
 * Displays the weather, wind, humidity and visibility
 */
class SecondaryWeather extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="secondaryweather">
                <p className="clouds" className="secondaryweathericons">
                    {this.props.clouds}
                </p>
                <p className="humidity" className="secondaryweathericons">
                    humidity: {this.props.humidity}%
                </p>     
                <p className="visibility" className="secondaryweathericons">
                    visibility: {this.props.visibility}m
                </p>
                <p className="wind" className="secondaryweathericons">
                    wind: {this.props.wind}m/s
                </p> 
            </div>
        );
    }
}       

/*
 *Displays the time of Fetch and receive of the api call
 */
class TimeFetch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <div>
                <p className="timeget">Requested at {this.props.requestedTime}</p>
                <p className="timereceived">Received at {this.props.receivedTime}</p>
            </div>
        );
    }
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            cityName: "Perth",
            displayName: "",
            clouds: "",
            currentTemperature: "",
            minimumTemperature: "",
            maximumTemperature: "",
            pressure: "",
            humidity: "",
            visibility: "",
            wind: "",
            requestedTime: "",
            receivedTime: "",
            searchMessage: "Enter your city here"
        };
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCitySubmit = this.handleCitySubmit.bind(this);
        //set it to perth as default and load the page
        this.updateVariables(); 
    }

    handleCityChange(newName) {
        this.setState({cityName: newName});
    }

    handleCitySubmit() {
        if(this.state.cityName != ""){
            this.updateVariables();
        }
    }

    async updateVariables() {
        try{
        const jsonObj = await weatherHandler(this.state.cityName);
        this.setState({displayName: this.state.cityName});
        this.setState({
            cityName: "",
            clouds: jsonObj[0]["Clouds"],
            currentTemperature: jsonObj[0]["Current Temperature"],
            minimumTemperature: jsonObj[0]["Minimum Temperature"],
            maximumTemperature: jsonObj[0]["Maximum Temperature"],
            pressure: jsonObj[0]["Pressure"],
            humidity: jsonObj[0]["Humidity"],
            visibility: jsonObj[0]["Visibility"],
            wind: jsonObj[0]["Wind"],
            requestedTime: jsonObj[1],
            receivedTime: jsonObj[2],
            searchMessage: "Enter your city here"
        });
        }
        catch(error){
            this.setState({searchMessage: "Invalid City Name", cityName: ""}); 
        }
    }
        
    render() {
        return ( 
            <div className="App">
                <CountrySearch cityName={this.state.cityName} onCityChange={this.handleCityChange} onCitySubmit={this.handleCitySubmit} searchMessage={this.state.searchMessage} displayName={this.state.displayName}/>
                <PrimaryWeather currentTemp={this.state.currentTemperature} minTemp={this.state.minimumTemperature} maxTemp={this.state.maximumTemperature}/>
                <SecondaryWeather clouds={this.state.clouds} humidity={this.state.humidity} visibility={this.state.visibility} wind={this.state.wind} />
                <TimeFetch requestedTime={this.state.requestedTime} receivedTime={this.state.receivedTime}/>
            </div>
        );
    }
}

export default App;
