import React from 'react';
import '../styles/Footer.css';

const Footer = function () {
    return (
        <div className='Footer'>
            <div className="Left-side">
                <ul>Information</ul>
                <ul>About Us</ul>
                <ul>About Zip</ul>
                <ul>Privacy Poulcy</ul>
                <ul>Search</ul>
                <ul>Teams</ul>
                <ul>Orders and Returns</ul>
                <ul>Contact Us</ul>
                <ul>Advanced Search</ul>
            </div>
            <div className="Right-side">
                <ul>Adress</ul>
                <ul>Adress: 1234 Sreet Adress City Address, 1234</ul>
                <ul>Phones:(00)1234 56789</ul>
                <ul>We are open: Monday-Thursday: 9:00 AM - 5:30 PM</ul>
                <ul>Friday: 9:00 AM - 6:00 PM</ul>
                <ul>Saturday: 11:00 AM - 5:00 PM</ul>
                <ul>E-mail: shop@email.com</ul>
            </div>
        </div>
    )
}

export default Footer;