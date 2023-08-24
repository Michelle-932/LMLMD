import React from 'react'
import blacklogo from '../images/lmlmdblack.png'

const Footer = () => {
    
    


    return (
        <div className="footer">
            <img className="footer-logo" src={blacklogo}/>
            <span>Love Me, Love My Dog © 2023 <a href="https://www.michellekirkland.io" target="_blank" rel="noopener noreferrer">Michelle Kirkland</a></span>
        </div>
    )
}

export default Footer