import MainDisplay from './MainDisplay';
import AirQuality from './AirQuality';
import DataReading from './DataReadings';
import WeatherPredictions from './WeatherPredictions';
import Graph from './Graph';
import AdditionalStuff from './AdditionalStuff';
import Settings from './Settings';


const Home = () => {
    
    return(
        <div className="homePage">
            
            <div className="columns">
            <div className="leftcolumn">
                <MainDisplay />
                <div className="myReadings">
                    <AirQuality/>
                    <DataReading/>
                    <DataReading/>
                    <DataReading/>
                </div>
                <Graph/>
                <Graph/>

                <AdditionalStuff/>
            </div>

            <div className="right column">
                <Settings/>
                <WeatherPredictions /> 
                <div className="otherReadings">
                    <DataReading/>
                    <DataReading/>
                    <DataReading/>
                </div>
                <Graph/>
            </div>
            
            </div>
            
        </div>
    );
}
export default Home;