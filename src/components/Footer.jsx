import React from 'react';
import '../styles/Footer.css';

const Footer = function () {
    return (
        <div className='Footer'>
            <div className="Left-side">
                <ul className="Up-Word">Information</ul>
                <ul><a href="#">About Us</a></ul>
                <ul><a href="#">About Zip</a></ul>
                <ul><a href="#">Privacy Poulcy</a></ul>
                <ul><a href="#">Search</a></ul>
                <ul><a href="#">Teams</a></ul>
                <ul><a href="#">Orders and Returns</a></ul>
                <ul><a href="#">Contact Us</a></ul>
                <ul><a href="#">Advanced Search</a></ul>
            </div>
            <div className="Right-side">
                <ul className="Up-Word">Adress</ul>
                <ul>Adress: 1234 Sreet Adress City Address, 1234</ul>
                <ul>Phones:(00)1234 56789</ul>
                <ul>We are open: Monday-Thursday: 9:00 AM - 5:30 PM</ul>
                <ul>Friday: 9:00 AM - 6:00 PM</ul>
                <ul>Saturday: 11:00 AM - 5:00 PM</ul>
                <ul><a href="#">E-mail: shop@email.com</a></ul>
            </div>
        </div>
    )
}

export default Footer;