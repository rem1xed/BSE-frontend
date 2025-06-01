import React from "react";
import classes from "../../styles/supportPage.module.css"; 
import QRCode from "../../assets/photo-QR-code/QR-code.png";
function SupportPage() {
    return (
        <main className={classes.support_page}>
            <div className={classes.support_card}>
                <h2 className={classes.support_title}>На каву <i class="fa-solid fa-heart"></i></h2>
                <p className={classes.support_description}>
                    Якщо вам подобається наш проект, ми будемо вдячні за вашу підтримку!
                </p>

                <p>ви можете підтримати за цим QA-кодом</p>
                <p>|</p>
                <p>V</p>
                <img
                    src={QRCode}
                    alt="QR Code for Support"
                    className={classes.support_qr_code}>
                </img>

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
        </main>
    );
}

export default SupportPage;
