import React from 'react';
import style from '../../styles/Footer.module.css';
import Button from '../atoms/Button';
const Footer = function () {
    return (
        <footer >
            <div className={style.side_left}>
                    <h2 className={style.footer_header}>Information</h2>
                <ul className={style.list_left}>
                    <li className={style.list_element_left}><a className={style.link} href="About-Us">About Us</a></li>
                    <li className={style.list_element_left}><a className={style.link} href="#">About Zip</a></li>
                    <li className={style.list_element_left}><a className={style.link} href="#">Privacy Policy</a></li>
                    <li className={style.list_element_left}><a className={style.link} href="Support">Buy a Coffee for Us :)</a></li>
                    <li className={style.list_element_left}><a className={style.link} href="#">Teams</a></li>
                    <li className={style.list_element_left}><a className={style.link} href="#">Orders and Returns</a></li>
                    <li className={style.list_element_left}><a className={style.link} href="#">Contact Us</a></li>
                    <li className={style.list_element_left}><a className={style.link} href="#">Advanced Search</a></li>
                </ul>
            </div>
            <div className={style.side}>
                <ul className={style.list}>
                    <li className={style.list_element}>Address: 1234 Sreet Address City Address, 1234</li>
                    <li className={style.list_element}><a className={style.link} href="tel:(00)123456789">Phones:<span className={style.span_footer}>(00) 1234 56789</span></a></li>
                    <li className={style.list_element}>We are open: Monday-Thursday: 9:00 AM - 5:30 PM</li>
                    <li className={style.list_element}>Friday: 9:00 AM - 6:00 PM</li>
                    <li className={style.list_element}>Saturday: 11:00 AM - 5:00 PM</li>
                    <li className={style.list_element}><a className={style.link} href="mailto:shop@email.com">E-mail: <span className={style.span_footer}>shop@email.com</span></a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;