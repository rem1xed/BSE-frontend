import React, { useEffect, useState, useCallback } from 'react';
import Footer from '../molecules/Footer';
import Advertisement from '../molecules/Advertisement';
import classes from '../../styles/AdvertismentListPage.module.css';
import axios from 'axios';
import { BaseUrl } from '../../api/api';

function AdvertismentListPage() {
  const [ads, setAds] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMoreAds = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:1488/advertisement?page=${page}&limit=6`);
      const newAds = res.data.data;
      console.log(newAds)
      console.log('Завантажено оголошень:', newAds.length, 'на сторінці', page);

      if (newAds.length === 0) {
        setHasMore(false);
      } else {
        setAds((prev) => {
          // Перевіряємо на дублікати за ID
          const existingIds = new Set(prev.map(ad => ad.id));
          const uniqueNewAds = newAds.filter(ad => !existingIds.has(ad.id));
          
          return [...prev, ...uniqueNewAds];
        });
        
        // Перевіряємо чи це остання сторінка
        if (page >= res.data.totalPages) {
          setHasMore(false);
        } else {
          setPage(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Помилка при завантаженні оголошень:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // Початкове завантаження
  useEffect(() => {
    loadMoreAds();
  }, []); // Видалили залежності

  // Обробник скролу
  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottom && !loading && hasMore) {
        loadMoreAds();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreAds, loading, hasMore]); // Оновлені залежності

  return (
    <div className={classes.Page}>
      <div className={classes.advertisList}>
        <h1>Advertisements</h1>
        <div className={classes.Advertisement_Container}>
          {ads.map((item) => (
            <Advertisement
              key={item.id}
              image={item.images?.[0] || 'https://via.placeholder.com/300'}
              description={item.description}
              condition={item.condition || 'Not noticed'}
              location={`${item.city}, ${item.region}`}
              price={`${item.price} ${item.currency || '₴'}`}
              link={`/advertisement/${item.id}`}
            />
          ))}
        </div>
        {loading && <p>Завантаження...</p>}
        {!hasMore && ads.length > 0 && <p>Це всі оголошення 🙂</p>}
        {!hasMore && ads.length === 0 && <p>Оголошень не знайдено</p>}
      </div>
    </div>
  );
}

export default AdvertismentListPage;