//Import useState and useEffect
import React, { useState, useEffect } from "react";

const AboutPage = () => {

    //The values of these variables will change depending on the connection with the weather station
    let connection_status = "SUCCESSFUL";
    let last_recieved = "22/22/2023 at 17:00"
    let activated = "01/01/2020"


    return(
        <div className="aboutPage">
            <div className="pageContent">
                <h1 className="aboutTitle">About Your Weather Station</h1>
                <br></br>
                <div className="aboutText"><p>This app collects and displays data collected directly by your weather station. </p>
                <p>The main display on the home screen includes temperature, humidity, air pressure, estimated altitude, dust concentration, light and sound readings from your local environment.</p>
                <p >Visit the <a className="pageLink"onClick={() => {window.location.pathname = "/"}}>USER INSTRUCTIONS</a> page for more information on how to set up your weather station.</p></div>
                <div className="aboutInfo">
                    <p>Connection Status - <b>{connection_status}</b></p> 
                    <p>Weather data last recieved - <b>{last_recieved}</b></p>
                    <p>Weather station first activated - <b>{activated}</b></p>
                </div>
                <br/>
                <p className="pageLink">To view the data collected by your weather station, <a onClick={() => {window.location.pathname = "/"}}>home</a></p>
                <br/>
            </div>
        </div>
    );
}
export default AboutPage;