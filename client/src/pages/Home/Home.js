import React from "react"
import Navbar from "../../components/Navbar/Navbar"
import './Home.css';  
import Announcement from "../../components/Announcement/Announcement";
import Slider from "../../components/Slider/Slider";
import Categories from "../../components/Categories/Categories";

const Home = () => {
    return (
        <>
            <div>
                <Announcement />
                <Navbar />
                <Slider />
                <Categories />
            </div>
            
        </>
    )
}

export default Home