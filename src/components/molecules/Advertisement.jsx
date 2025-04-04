import React from 'react';
import '../../styles/Advertisement.css';

function Advertisement() {
    return (
        <div className="Advertisement">
            <div className="Advertisement-image">
                <img src="https://uastore.com.ua/files/resized/products/fujitsue734merchtitul.1800x1800w.jpg" alt="" />
            </div>
            <div className="Advertisement-info">
                <div className="Advertisement-text-conteiner">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, voluptatum?
                </div>
                <div className="current-item-condition">
                    <p>New</p>
                </div>
                <div className="item-location">
                    <p>location</p>
                </div>
            </div>
            <div className="Advertisement-cost"> 
                <p>499$</p>
            </div>
        </div>
    )
}

export default Advertisement;