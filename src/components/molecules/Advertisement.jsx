import React from 'react';
import classes from '../../styles/Advertisement.module.css';

function Advertisement({ image, description, condition, location, price, link = "#" }) {
    return (
        <div className={classes.Advertisement}>
            <a href={link} className={classes.link}>
                <div className={classes.Advertisement_Image}>
                    <img src={image} alt="product" />
                </div>
                <div className={classes.Advertisement_Info}>
                    <div className={classes.Advertisement_Text_Conteiner}>
                        {description}
                    </div>
                    <div className={classes.current_Item_Condition}>
                        <p>{condition}</p>
                    </div>
                    <div className={classes.item_Location}>
                        <p>{location}</p>
                    </div>
                </div>
                <div className={classes.Advertisement_Cost}>
                    <p>{price}</p>
                </div>
            </a>
        </div>
    );
}

export default Advertisement;
