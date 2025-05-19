import React, { useEffect, useState } from 'react';
import Footer from '../molecules/Footer';
import Advertisement from '../molecules/Advertisement';
import classes from '../../styles/AdvertismentListPage.module.css';

function AdvertismentListPage() {
    const [ads, setAds] = useState([]);
    const [page, setPage] = useState(1);

    const generateMockAds = (count) => {
        const templates = [
            {
                image: 'https://uastore.com.ua/files/resized/products/fujitsue734merchtitul.1800x1800w.jpg',
                description: 'Ноутбук Fujitsu Lifebook E734 — компактний та надійний пристрій для роботи.',
                condition: 'Б/у',
                location: 'Львів, Україна',
                price: '499$'
            },
            {
                image: 'https://images.samsung.com/is/image/samsung/p6pim/ua/sm-a546ezkdsek/gallery/ua-galaxy-a54-5g-sm-a546-sm-a546ezkdsek-535853812?$684_547_PNG$',
                description: 'Смартфон Samsung Galaxy A54 5G — потужність і стиль.',
                condition: 'Новий',
                location: 'Київ, Україна',
                price: '899$'
            },
            {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCCSK7b-InrH1inTlyZlZYcn5zSC1H7NEoQ&s',
                description: 'Ігрова консоль Sony PlayStation 5 Digital Edition.',
                condition: 'Б/у',
                location: 'Одеса, Україна',
                price: '599$'
            },
        ];

        const result = [];
        for (let i = 0; i < count; i++) {
            const template = templates[i % templates.length];
            result.push({ ...template, id: Date.now() + Math.random() });
        }
        return result;
    };

    const loadMoreAds = () => {
        const newAds = generateMockAds(6); // по 6 штук за раз
        setAds((prev) => [...prev, ...newAds]);
    };

    useEffect(() => {
        loadMoreAds(); // initial load
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
            if (bottom) {
                loadMoreAds();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={classes.Page}>
            <div className={classes.advertisList}>
                <h1>Advertisement</h1>
                <div className={classes.Advertisement_Conteiner}>
                    {ads.map((item) => (
                        <Advertisement
                            key={item.id}
                            image={item.image}
                            description={item.description}
                            condition={item.condition}
                            location={item.location}
                            price={item.price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdvertismentListPage;
