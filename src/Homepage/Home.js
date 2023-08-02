import MainDisplay from './MainDisplay';
import AirQuality from './AirQuality';
import DataReading from './DataReadings';
import WeatherPredictions from './WeatherPredictions';
import Graph from './Graph';
import AdditionalStuff from './AdditionalStuff';



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

                
            </div>

            <div className="right column">
                
                <WeatherPredictions /> 
                <div className="otherReadings">
                    <DataReading/>
                    <DataReading/>
                    <DataReading/>
                </div>
                <Graph/>
            </div>
            
            </div>
            <div className="additional"><AdditionalStuff/></div>
            
            
        </div>
    );
}
export default Home;