import MainDisplay from './MainDisplay';
import AirQuality from './AirQuality';
import WeatherPredictions from './WeatherPredictions';
import TempGraph from './TempGraph';
import AdditionalStuff from './AdditionalStuff';
import DustConc from './DustConc';
import Humidity from './Humidity';
import Pressure from './Pressure';
import Altitude from './Altitude';
import Sound from './Sound';
import Light from './Light';
import LightSoundChart from './LightSoundChart';
import HumidityGraph from './HumidityGraph';
import DustGraph from './DustGraph';



const Home = () => {
    
    return(
        <div className="homePage">
            <div className="pageContent">
                <div className="columns">
                    <div className="leftcolumn">
                        <MainDisplay />
                        
                        <div className="myReadings">
                            <AirQuality/>
                            <DustConc/>
                            <Humidity/>
                            <Pressure/>
                        </div>
                        
                        
                        <div className='graphColumns'>
                        
                        <TempGraph/>
                        <HumidityGraph/>
                        
                        </div>
                        <AdditionalStuff/>
                        

                        
                    </div>

                    <div className="right column">
                        
                        <WeatherPredictions /> 
                        <DustGraph/>
                        <div className="otherReadings">
                            <Sound/>
                            <Light/>
                            <Altitude/>
                        </div>
                        <LightSoundChart/>
                        
                    </div>
            
                </div>    
            </div>
            
        </div>
    );
}
export default Home;