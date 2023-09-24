const HelpPage= () => {
    
    return(
        <div className="helpPage">
            
            <div className="pageContent">
                <div className="aboutAppText">
                    <h2>How to use your weather system</h2>
                    
                    <p className="helpText">Welcome to the weather app!</p>
                    <p className="helpText">This app connects directly with your weather station and allows you to monitor and track trends in your local environment.</p>
                    
                </div>
                <div className="helpColumns">
                    <div className="setUpBack">
                        <h2>Setting up your weather station</h2>
                        <p className="setUpText">1. First ensure that the weather station battery is fully charged. To check make sure the yellow light is no longer illuminated when charging.</p>
                        <p className="setUpText">2. To turn on the weather station, ensure that the power supply is attached to the particle argon. You can either leave the weather station plugged in, or attach the battery.</p>
                        <p className="setUpText">3. A green flashing light shows the device is trying to connect to the internet. A breathing cyan light shows that the device has successfully connected to the internet via WiFi.</p>
                        <p className="setUpText">4. Place the weather station in its case and place it in the desired location.</p>
                        <p className="setUpText">5. Wait between 20-45 minutes to receive weather readings, or press the 'reset' button on the particle argon to manually take a reading.</p>
                    </div>
                    <div className="howToText">
                        <h2>How to use this app</h2>
                        <p className="setUpAppText">1. To check the weather station is connected, go to the <a className="pageLink" onClick={() => {window.location.pathname = "/about"}}><em>"About Your Weather Station"</em></a> page and see if it is active. You may need to wait between 20-45 minutes before receiving your first reading.</p>
                        <p className="setUpAppText">2. The home page contains the main display for your weather data. Here, you can find current readings. Keep track of trends in your environment using graphs and charts.</p>
                        <p className="setUpAppText">3. On the main display, you can find 14-day weather predictions for minimum temperature, maximum temperature, and precipitation. Look at the personalised predictions graph to see predicted trends in temperature over the next week.</p>
                        <p className="setUpAppText">4. The history page contains a log of the last 100 readings taken by your weather station.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HelpPage;