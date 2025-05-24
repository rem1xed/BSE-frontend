import React from "react";
import "../../styles/supportPage.css"; // або використай CSS-модулі, якщо так заведено в тебе
import QACode from "../../assets/photo-QA-code/QA-code.png";
function SupportPage() {
    return (
        <div className="support-page">
            <div className="support-card">
                <h2 className="support-title">На каву <i class="fa-solid fa-heart"></i></h2>
                <p className="support-description">
                    Якщо вам подобається наш проект, ми будемо вдячні за вашу підтримку!
                </p>

                <p>ви можете підтримати за цим QA-кодом</p>
                <p>|</p>
                <p>V</p>
                <img
                    src={QACode} // Замініть на URL вашого QR-коду
                    alt="QR Code for Support"
                    className="support-qr-code">
                </img>

                <p style={{ margin: "1em" }}>Або переходьте за посиланням</p>
                <a
                    href="https://send.monobank.ua/jar/5aa2emfAnp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="support-button-link"
                >
                    <button className="support-button">Підтримати</button>
                </a>
                <p className="support-thanks">Дякуємо за вашу підтримку!</p>
            </div>
        </div>
    );
}

export default SupportPage;
