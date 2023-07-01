import React from "react";
import './Navbar.css';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from "@material-ui/core";

const Navbar = () => {
    return (
        <div className="nav-container">
            <div className="nav-wrapper">
                <div className="left">
                    <span className="nav-language">EN</span>
                    <div className="search-container">
                        <input />
                        <Search  style={{color:"gray", fontSize:16}}/>
                        
                    </div>

                </div>
                <div className="center">
                    <h2 clasName="logo">LAMA.</h2>
                </div>
                <div className="right">
                    <div className="menuItem">REGISTER</div>
                    <div className="menuItem">SIGN IN</div>
                    <div className="menuItem">
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar