import React from "react"
import Navbar from "../../components/Navbar/Navbar"
import './Home.css';  
import Announcement from "../../components/Announcement/Announcement";
import Slider from "../../components/Slider/Slider";

const Home = () => {
    return (
        <>
            <div>
                <Announcement />
                <Navbar />
                <Slider />
            </div>
            
        </>
    )
}

export default Home