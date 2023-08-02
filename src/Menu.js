import React from "react";
import {MenuData} from "./MenuData";

const Menu = () => {

    return (
        <div className="navbar">
            <ul>
                
            {MenuData.map((val,key)=>{
                return(
                    <li className={val.cName} key={key} onClick={() => {window.location.pathname = val.link}}> 
                        <div>{val.icon}</div>
                    </li>

                )
            })}
            </ul>
        </div>
    )
}
export default Menu;