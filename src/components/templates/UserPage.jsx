import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../styles/UserPage.module.css';
import Advertisement from '../molecules/Advertisement';
import Button from '../atoms/Button';

const UserPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            setLoading(true);

            const fakeUser = {
                id,
                firstName: 'Остап',
                lastName: 'Бандера',
                avatar: 'https://i.pravatar.cc/150?u=user' + id,
                createdAt: '2024-10-15T10:20:30.000Z',
                userAdvertisements: [
                    {
                        id: 1,
                        description: 'Продам козацьку шаблю, справжня, з музею.',
                        price: '1000₴'
                    },
                    {
                        id: 2,
                        description: 'Кімната у Львові, біля Політехніки. Тепла і з видом.',
                        price: '5000₴/міс'
                    },
                    {
                        id: 3,
                        description: 'Старовинна люлька.',
                        price: '300₴'
                    }
                ],
                reviews: [
                    { id: 1, author: 'Марічка', text: 'Порядний продавець, все супер!' },
                    { id: 2, author: 'Ігор', text: 'Рекомендую, чесна людина.' }
                ]
            };

            setUser(fakeUser);
            setLoading(false);
        };

        loadUser();
    }, [id]);

    if (loading) return <p>Завантаження...</p>;
    if (!user) return <p>Користувача не знайдено або доступ заборонено</p>;

    return (
        <div className={styles.page}>
            <div className='left-conteiner'>
                <div className={styles.userCard}>
                    {user.avatar ? (
                        <img src={user.avatar} alt="avatar" className={styles.avatar} />
                    ) : (
                        <div className={styles.noAvatar}>Фото відсутнє</div>
                    )}
                    <h3>{user.firstName} {user.lastName}</h3>
                    <p>На сайті з: {new Date(user.createdAt).toLocaleDateString()}</p>
                    <button
                        className={styles.logoutButton}
                        onClick={() => console.log('Logout clicked')}
                    >
                        Вийти з профілю
                    </button>
                </div>
                <div className={styles.reviewsContainer}>
                    <h4>Відгуки:</h4>
                    {user.reviews && user.reviews.length > 0 ? (
                        user.reviews.map(review => (
                            <div key={review.id} className={styles.review}>
                                <strong>{review.author}:</strong> <span>{review.text}</span>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noReviews}>Відгуків ще нема</p>
                    )}
                </div>
            </div>
            <div className={styles.adsContainer}>
                <h4>Оголошення:</h4>
                {user.userAdvertisements && user.userAdvertisements.length > 0 ? (
                    user.userAdvertisements.map(ad => (
                        <Advertisement key={ad.id} {...ad} />
                    ))
                ) : (
                    <p className={styles.noAds}>Оголошень поки нема</p>
                )}
            </div>


        </div>
    );
};

export default UserPage;
