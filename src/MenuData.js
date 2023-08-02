import React from "react";

//Importing the icons for menu
import { BsFillHouseFill } from 'react-icons/bs'
import { GiSettingsKnobs } from 'react-icons/gi'
import { BsBellFill } from 'react-icons/bs'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { IoMdSettings } from 'react-icons/io'

//Menu data
export const MenuData = [
    {   
        //Title of the link
        title: "Home",
        //Icon
        icon: <BsFillHouseFill />,
        //Link
        link: "/",
        //Class name
        cName: "menuIcon homeIcon"
    },
    {
        title: "About",
        icon: <GiSettingsKnobs />,
        link: "/about",
        cName: "menuIcon aboutIcon"
    },
    {
        title: "Notifications",
        icon: <BsBellFill />,
        link: "/notifications",
        cName: "menuIcon notificationsIcon"
    },
    {
        title: "Help",
        icon: <BsFillQuestionCircleFill />,
        link: "/help",
        cName: "menuIcon helpIcon"
    },
    {
        title: "Settings",
        icon: <IoMdSettings />,
        link: "/settings",
        cName: "menuIcon settingsIcon"
    }
]
