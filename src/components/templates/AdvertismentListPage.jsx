import React from 'react';
import Footer from '../molecules/Footer';
import Advertisement from '../molecules/Advertisement';
import classes from '../../styles/AdvertismentListPage.module.css';

function AdvertismentListPage() {
    return (
        <div classame={classes.Page}>
            <div className={classes.advertisList}>
                <h1 >Advertisement</h1>

                <div className={classes.Advertisement_Conteiner}>
                    <Advertisement />
                    <Advertisement />
                    <Advertisement />
                    <Advertisement />
                    <Advertisement />
                    <Advertisement />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AdvertismentListPage;