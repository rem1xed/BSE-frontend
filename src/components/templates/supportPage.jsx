import React from "react";
import classes from "../../styles/supportPage.module.css"; 
import QRCode from "../../assets/photo-QR-code/QR-code.png";
import AdBanner from "../../media/Ad_Banner.png";

function SupportPage() {
    return (
        <main className={classes.support_page}>
            {/* Лівий банер */}
            <div className={classes.left_banner}>
                <img 
                    src={AdBanner} 
                    alt="Advertisement" 
                    className={classes.banner_image} 
                    onClick={() => window.open('https://example.com', '_blank')}
                />
            </div>

            <div className={classes.support_card}>
                <h2 className={classes.support_title}>На каву <i className="fa-solid fa-heart"></i></h2>
                <p className={classes.support_description}>
                    Якщо вам подобається наш проект, ми будемо вдячні за вашу підтримку!
                </p>

                <p>ви можете підтримати за цим QA-кодом</p>
                <p>|</p>
                <p>V</p>
                <img
                    src={QRCode}
                    alt="QR Code for Support"
                    className={classes.support_qr_code}
                />

                <p style={{ margin: "1em" }}>Або переходьте за посиланням</p>
                <a
                    href="https://send.monobank.ua/jar/5aa2emfAnp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.support_button_link}
                >
                    <button className={classes.support_button}>Підтримати</button>
                </a>
                <p className={classes.support_thanks}>Дякуємо за вашу підтримку!</p>
            </div>

            {/* Правий банер */}
            <div className={classes.right_banner}>
                <img 
                    src={AdBanner} 
                    alt="Advertisement" 
                    className={classes.banner_image} 
                    onClick={() => window.open('https://example.com', '_blank')}
                />
            </div>
        </main>
    );
}

export default SupportPage;