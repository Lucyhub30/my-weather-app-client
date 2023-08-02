const AboutPage = () => {
    let connection_status = "CONNECTED";
    let last_recieved = "22/22/2023 at 17:00"
    let activated = "01/01/2020"
    return(
        <div className="aboutPage">
            <div className="pageContent">
                <h1 className="aboutTitle">About Your Weather Station</h1>
                <br></br>
                <div className="aboutText"><p>Information about your weather station....</p></div>
                <div className="aboutInfo">
                    <p>Connection Status - <b>{connection_status}</b></p> 
                    <p>Weather data last recieved - <b>{last_recieved}</b></p>
                    <p>Weather station first activated - <b>{activated}</b></p>
                </div>
                <br/>
                <p className="settingsLink">To change your weather station preferences, go to <a onClick={() => {window.location.pathname = "/settings"}}>settings</a></p>
                <br/>
            </div>
        </div>
    );
}
export default AboutPage;