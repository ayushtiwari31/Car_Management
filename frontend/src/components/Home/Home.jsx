import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link,NavLink } from "react-router-dom";
import background1 from '../../assets/background1.jpg';
import background2 from '../../assets/background2.jpg'; // Optional: Add another background image
import background3 from '../../assets/background3.jpg';

function Home() {
    
    const backgrounds = [background1, background2,background3];

    
    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically change background every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
        }, 2000); 

        return () => clearInterval(interval);
    }, [backgrounds.length]);

    return (
     
        <div className="homepage" style={{ backgroundImage: `url(${backgrounds[currentIndex]})` }}>
            <div className="content">
                <h1>Drive Your Collection Online: The Ultimate Car Management Hub!</h1>
                <p>Your Personal Car Showcase: Upload, Edit, and Explore!</p>
                <div className="buttons">
                <Link to="login" >
                    <button className="btn login-home">Login</button>
                </Link>
                <Link to="signup" >
                    <button className="btn signup">Sign Up</button>
                </Link>
                </div>
            </div>
        </div>

    );
}

export default Home;
