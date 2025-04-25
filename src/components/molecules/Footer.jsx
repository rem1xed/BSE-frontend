import React from 'react';
import style from '../../styles/Footer.module.css';

const Footer = function () {
    return (
        <div className={style.Footer}>
            <div className={style.Left_side}>
                <ul>
                    <li className={style.Up_Word}>Information</li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">About Zip</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Search</a></li>
                    <li><a href="#">Teams</a></li>
                    <li><a href="#">Orders and Returns</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Advanced Search</a></li>
                </ul>
            </div>
            <div className={style.Right_side}>
                <ul>
                    <li className={style.Up_Word}>Adress</li>
                    <li>Adress: 1234 Sreet Adress City Address, 1234</li>
                    <li>Phones:(00)1234 56789</li>
                    <li>We are open: Monday-Thursday: 9:00 AM - 5:30 PM</li>
                    <li>Friday: 9:00 AM - 6:00 PM</li>
                    <li>Saturday: 11:00 AM - 5:00 PM</li>
                    <li><a href="#">E-mail: shop@email.com</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;