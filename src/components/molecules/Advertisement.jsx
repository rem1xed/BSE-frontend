import React from 'react';
import classes from '../../styles/Advertisement.module.css';

function Advertisement() {
    return (
        <div className={classes.Advertisement}>
            <div className={classes.Advertisement_Image}>
                <img src="https://uastore.com.ua/files/resized/products/fujitsue734merchtitul.1800x1800w.jpg" alt="" />
            </div>
            <div className={classes.Advertisement_Info}>
                <div className={classes.Advertisement_Text_Conteiner}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, voluptatum?
                </div>
                <div className={classes.current_Item_Condition}>
                    <p>New</p>
                </div>
                <div className={classes.item_Location}>
                    <p>location</p>
                </div>
            </div>
            <div className={classes.Advertisement_Cost}> 
                <p>499$</p>
            </div>
        </div>
    )
}

export default Advertisement;