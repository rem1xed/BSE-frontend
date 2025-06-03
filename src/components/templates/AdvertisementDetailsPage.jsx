import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import style from '../../styles/AdvertisementDetailsPage.module.css'
import Button from '../atoms/Button'
import { advertisementService } from '../../api/advertisementService'
import googleMeetImage from '../../assets/advertisement/google_meet_48.png'

function AdvertisementDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Стан для даних оголошення
  const [advertisement, setAdvertisement] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarAds, setSimilarAds] = useState([]);

  // Завантаження даних оголошення
  useEffect(() => {
    const fetchAdvertisement = async () => {
      if (!id) return
      
      try {
        setLoading(true)
        setError(null)
        
        // Завантажуємо основні дані оголошення
        const adData = await advertisementService.getAdvertisementBySlug(id);
        const favData = await advertisementService.isFavorite(id);
        setAdvertisement(adData);
        setIsFavorite(favData);

        console.log(advertisement)
        console.log(isFavorite)
        // setAdvertisement({...adData});
        // console.log(adData);
        // console.log(advertisement);
        // console.log(adData.images);
        // setIsFavorite(adData.advertisement.isFavorite || false)
        
        // Збільшуємо кількість переглядів
        // await advertisementService.incrementViews(id)
        


        // Завантажуємо схожі оголошення
        // const similarData = await advertisementService.getSimilarAdvertisements(id, 4)
        // setSimilarAds(similarData.advertisements || [])
        


      } catch (err) {
        console.error('Помилка завантаження оголошення:', err)
        setError(err.response?.data?.message || 'Помилка завантаження даних')
      } finally {
        setLoading(false)
      }
    }

    fetchAdvertisement()
  }, [id])

  // Обробка додавання/видалення з обраного
  const handleToggleFavorite = async () => {
    if (!advertisement) return
    
    try {
      if (isFavorite) {
        await advertisementService.removeFromFavorites(advertisement.id)
        setIsFavorite(false)
      } else {
        await advertisementService.addToFavorites(advertisement.id)
        setIsFavorite(true)
      }
    } catch (err) {
      console.error('Помилка зміни статусу обраного:', err)
    }
  }

  // Навігація по зображеннях
  const handlePrevImage = () => {
    if (advertisement?.images?.length > 1) {
      setCurrentImageIndex(prev => 
        prev === 0 ? advertisement.images.length - 1 : prev - 1
      )
    }
  }

  const handleNextImage = () => {
    if (advertisement?.images?.length > 1) {
      setCurrentImageIndex(prev => 
        prev === advertisement.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  // Форматування дати
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  // Форматування ціни
  const formatPrice = (price, currency = '$') => {
    return `${price.toLocaleString()}${currency}`
  }

  if (loading) {
    return (
      <main className={style.main_loading_container}>
        <div className={style.loading}>Завантаження...</div>
      </main>
    )
  }

  if (error) {
    return (
      <main className={style.main_error_container}>
        <div className={style.error}>
          <h4>Помилка: {error}</h4>
          <Button 
          onClick={() => navigate('/')}
          id={style.return_home}>
            На головну
          </Button>
        </div>
      </main>
    )
  }

  if (error?.response?.status === 400) {
    console.log(advertisement);
    return (
      <main className={style.main_error_container}>
        <div className={style.not_found}>
          <p>Оголошення не знайдено</p>
          <Button 
          onClick={() => navigate('/')}
          id={style.return_home}>
            На головну
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className={style.main_container}>
      <nav className={style.breadcrumb_navigation}>
        <span onClick={() => navigate('/')}>Home</span>
        <span>&rarr;</span>
        <span onClick={() => navigate(`/category/${advertisement.category.id}`)}>
          {advertisement.category.name}
        </span>
        <span>&rarr;</span>
        <span>{advertisement.title}</span>
      </nav>

      <div className={style.page_content}>
        <div className={style.image_wrapper}>
          {advertisement.images?.length > 1 && (
            <div className={style.arrow_left} onClick={handlePrevImage}>
              <div className={style.arrow_top_left}></div>
              <div className={style.arrow_bottom_left}></div>
            </div>
          )}
          
          <img
            src={advertisement.images?.[currentImageIndex] || '/placeholder-image.jpg'}
            alt={advertisement.title}
            onError={(e) => {
              if (!e.target.src.includes('placeholder-image.jpg')) {
                e.target.src = '/placeholder-image.jpg';
              }
            }}
          />
          
          {advertisement.images?.length > 1 && (
            <div className={style.arrow_right} onClick={handleNextImage}>
              <div className={style.arrow_top_right}></div>
              <div className={style.arrow_bottom_right}></div>
            </div>
          )}

          {advertisement.images?.length > 1 && (
            <div className={style.image_indicators}>
              {advertisement.images.map((_, index) => (
                <span
                  key={index}
                  className={`${style.indicator} ${
                    index === currentImageIndex ? style.active : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className={style.product_details}>
          <div className={style.product_info}>
            <div className={style.product_text}>
              <p className={style.product_location}>
                {advertisement.location} – {formatDate(advertisement.createdAt)}
              </p>
              <h2 className={style.product_title}>
                {advertisement.title}
              </h2>
              <p className={style.product_price}>
                {formatPrice(advertisement.price, advertisement.currency)}
              </p>
              
              <div className={style.product_actions}>
                <Button 
                onClick={handleToggleFavorite} 
                id="saveButton">
                  <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
                  {isFavorite ? ' Видалити з обраного' : ' Додати в обране'}
                </Button>

                <Button 
                onClick={() => navigate(`/messages/new?userId=${advertisement.author.id}`)}
                id="messageButton">
                  Message
                </Button>

                <Button 
                onClick={() => navigate(`/messages/new?userId=${advertisement.author.id}`)}
                id={style.googleMeetButton}>
                  Plan A Meet <img src={googleMeetImage} alt="" />
                </Button>
              </div>
            
            </div>
          </div>

          <div className={style.user_information}>
            <p className={style.user_title}>Користувач</p>

            <div className={style.user_profile}>
              <div className={style.user_avatar}>
                {advertisement.author?.avatar ? (
                  <img src={advertisement.author?.avatar} alt={advertisement.author.contactName} />
                ) : (
                  <i className="fa-solid fa-user"></i>
                )}
              </div>
              <div className={style.user_details}>
                <p className={style.user_name}>
                  {advertisement.contactName}
                </p>
                <p className={style.user_member_since}>
                  На сайті з {formatDate(advertisement.author.createdAt)}
                </p>
                {advertisement.author?.rating && (
                  <div className={style.user_rating}>
                    <span>Рейтинг: {advertisement.author?.rating}/5</span>
                    <div className={style.stars}>
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fa-${i < advertisement.author?.rating ? 'solid' : 'regular'} fa-star`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <hr />

            <p 
              className={style.user_ads}
              onClick={() => navigate(`/user/${advertisement.author.id}/ads`)}
            >
              Всі оголошення користувача ({advertisement.author?.adsCount || 0})
            </p>
          </div>
        </div>
      </div>
      
      <div className={style.product_description}>
        <h1>Опис товару</h1>
        <div 
          className={style.description_content}
          dangerouslySetInnerHTML={{ __html: advertisement.description }}
        />
        
        {advertisement.specifications && Object.keys(advertisement.specifications).length > 0 && (
          <div className={style.specifications}>
            <h3>Характеристики</h3>
            <div className={style.specs_grid}>
              {Object.entries(advertisement.specifications).map(([key, value]) => (
                <div key={key} className={style.spec_item}>
                  <span className={style.spec_key}>{key}:</span>
                  <span className={style.spec_value}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {advertisement.tags && advertisement.tags.length > 0 && (
        <div className={style.product_tags}>
          <h3>Теги</h3>
          <div className={style.tags_container}>
            {advertisement.tags.map((tag, index) => (
              <span 
                key={index} 
                className={style.tag}
                onClick={() => navigate(`/search?tag=${encodeURIComponent(tag)}`)}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className={style.product_stats}>
        <div className={style.stat_item}>
          <i className="fa-solid fa-eye"></i>
          <span>Переглядів: {advertisement.views || 0}</span>
        </div>
        <div className={style.stat_item}>
          <i className="fa-solid fa-clock"></i>
          <span>Оновлено: {formatDate(advertisement.updatedAt)}</span>
        </div>
        {advertisement.isPromoted && (
          <div className={style.stat_item}>
            <i className="fa-solid fa-star"></i>
            <span>Піднято в топ</span>
          </div>
        )}
      </div>

      {similarAds.length > 0 && (
        <div className={style.similar_ads}>
          <h3>Схожі оголошення</h3>
          <div className={style.similar_ads_grid}>
            {similarAds.map((ad) => (
              <div 
                key={ad.id} 
                className={style.similar_ad_card}
                onClick={() => navigate(`/ad/${ad.id}`)}
              >
                <img src={ad.images?.[0] || '/placeholder-image.jpg'} alt={ad.title} />
                <div className={style.similar_ad_info}>
                  <h4>{ad.title}</h4>
                  <p className={style.similar_ad_price}>
                    {formatPrice(ad.price, ad.currency)}
                  </p>
                  <p className={style.similar_ad_location}>{ad.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={style.report_section}>
        <Button 
          variant="secondary"
          onClick={() => {
            const reason = prompt('Вкажіть причину скарги:')
            if (reason) {
              advertisementService.reportAdvertisement(advertisement.id, reason)
                .then(() => alert('Скаргу надіслано'))
                .catch(() => alert('Помилка при надсиланні скарги'))
            }
          }}
        >
          <i className="fa-solid fa-flag"></i>
          Поскаржитися
        </Button>
      </div>
    </main>
  )
}

export default AdvertisementDetailsPage;