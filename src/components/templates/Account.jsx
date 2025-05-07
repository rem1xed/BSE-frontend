import user_png from "../../media/user.png";
import style from "../../styles/Account.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService"; // Імпортуємо authService

export default function Account() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Додаємо флаг для відстеження монтування компонента
    let isMounted = true;

    const fetchUser = async () => {
      try {
        // Спочатку перевіряємо, чи є токен авторизації
        if (!authService.isAuthenticated()) {
          navigate('/login');
          return;
        }

        // Використовуємо authService замість прямого axios запиту
        const userData = await authService.getProfile();
        
        // Оновлюємо стан лише якщо компонент все ще змонтований
        if (isMounted) {
          if (userData.isAuthenticated) {
            setUser(userData);
          } else {
            // Видаляємо дані авторизації, якщо вони недійсні
            authService.logout();
            navigate('/login');
          }
        }
      } catch (err) {
        console.error('Не вдалося отримати дані користувача:', err);
        // Перенаправляємо тільки якщо це помилка авторизації та компонент ще змонтований
        if (isMounted && err.response && (err.response.status === 401 || err.response.status === 403)) {
          authService.logout();
          navigate('/login');
        }
      } finally {
        // Встановлюємо флаг завершення завантаження
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    // Функція очистки для useEffect
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  // Показуємо індикатор завантаження доки отримуємо дані
  if (loading) {
    return (
      <div className={style.outer_container}>
        <div className={style.container}>
          <div className="text-center p-8">
            <p>Завантаження даних профілю...</p>
          </div>
        </div>
      </div>
    );
  }

  // Компоненти залишаються тими самими...
  const AccountInfoContainer = () => {
    // Перевіряємо, чи є дані користувача перед відображенням
    if (!user) {
      return <div>Інформація про користувача недоступна</div>;
    }

    return (
      <>
        <div className={style.head}>
          <h3>Welcome, {user.firstName || 'User'}</h3>
          <p>{new Date().toLocaleDateString('uk-UA', {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</p>
        </div>
        <div className={style.body}>
          <div className={style.body_inner}>
            <div className={style.info_1}>
              <div className={style.short_info_container}>
                <div className={style.photo_container}>
                  <img src={user_png} alt="User Photo" className={style.user_photo} />
                </div>
                <div className={style.name_and_email_container}>
                  <h3>{user.firstName || ''} {user.lastName || ''}</h3>
                  <p>{user.email || ''}</p>
                </div>
              </div>
              <div className={style.edit_container}>
                <button className={style.edit_button}>Edit</button>
              </div>
            </div>
            <div className={style.info_2}>
              <div className={style.info_column}>
                <div className={style.info_row}>
                  <p>Full Name</p>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    defaultValue={user.firstName || ''}
                    placeholder="Your full name"
                  />
                </div>
                <div className={style.info_row}>
                  <p>Gender</p>
                  <select name="gender" id="gender" defaultValue={user.gender || '--Choose gender--'}>
                    <option value="--Choose gender--">--Choose gender--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className={style.info_row}>
                  <p>Your Password</p>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your password"
                  />
                </div>
              </div>
              <div className={style.info_column}>
                <div className={style.info_row}>
                  <p>Nickname</p>
                  <input
                    type="text"
                    name="nickname"
                    id="nickname"
                    defaultValue={user.nickname || ''}
                    placeholder="Your nickname"
                  />
                </div>
                <div className={style.info_row}>
                  <p>Email</p>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={user.email || ''}
                    placeholder="Your email"
                  />
                </div>
                <div className={style.info_row}>
                  <p>Phone number</p>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    defaultValue={user.phone || ''}
                    placeholder="Your phone number"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Інші компоненти з оригінального коду залишаються без змін...
  const OrdersContainer = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Мої замовлення</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Дата</th>
            <th className="p-2 text-left">Статус</th>
            <th className="p-2 text-left">Сума</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="p-2">#1001</td>
            <td className="p-2">15.04.2025</td>
            <td className="p-2 text-green-500">Доставлено</td>
            <td className="p-2">1250 грн</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="p-2">#1002</td>
            <td className="p-2">10.04.2025</td>
            <td className="p-2 text-yellow-500">В обробці</td>
            <td className="p-2">450 грн</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const SavedContainer = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Збережені товари</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="border rounded-lg p-4">
            <div className="bg-gray-200 h-32 rounded mb-2"></div>
            <h3 className="font-bold">Товар #{item}</h3>
            <p className="text-gray-600">1200 грн</p>
            <div className="flex mt-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 text-sm">До кошика</button>
              <button className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm">Видалити</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ReviewsContainer = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Мої відгуки</h2>
      <div className="space-y-4">
        <div className="border-b pb-4">
          <div className="flex items-center mb-2">
            <div className="bg-gray-200 w-12 h-12 rounded mr-2"></div>
            <div>
              <h3 className="font-bold">Товар #1</h3>
              <div className="flex text-yellow-500">★★★★☆</div>
            </div>
          </div>
          <p className="text-gray-700">Дуже задоволений покупкою. Хороша якість, швидка доставка.</p>
          <p className="text-sm text-gray-500 mt-1">Додано: 05.04.2025</p>
        </div>
        <div className="border-b pb-4">
          <div className="flex items-center mb-2">
            <div className="bg-gray-200 w-12 h-12 rounded mr-2"></div>
            <div>
              <h3 className="font-bold">Товар #2</h3>
              <div className="flex text-yellow-500">★★★☆☆</div>
            </div>
          </div>
          <p className="text-gray-700">Нормальний товар, але є невеликі недоліки.</p>
          <p className="text-sm text-gray-500 mt-1">Додано: 01.04.2025</p>
        </div>
      </div>
    </div>
  );

  const NewsletterContainer = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Підписки на розсилки</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h3 className="font-bold">Новини та акції</h3>
            <p className="text-sm text-gray-600">Щотижнева розсилка з новинами та акціями</p>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="news" className="mr-2" defaultChecked />
            <label htmlFor="news">Підписаний</label>
          </div>
        </div>
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h3 className="font-bold">Персональні пропозиції</h3>
            <p className="text-sm text-gray-600">Спеціальні пропозиції на основі ваших інтересів</p>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="personal" className="mr-2" />
            <label htmlFor="personal">Підписатися</label>
          </div>
        </div>
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Зберегти налаштування</button>
    </div>
  );

  const AdvertisementContainer = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Створення нової реклами</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Назва реклами</label>
          <input type="text" className="w-full p-2 border rounded" placeholder="Введіть назву реклами" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Опис</label>
          <textarea className="w-full p-2 border rounded" rows="4" placeholder="Введіть опис реклами"></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Бюджет</label>
          <input type="number" className="w-full p-2 border rounded" placeholder="Введіть бюджет" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Зображення</label>
          <input type="file" className="w-full p-2" />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Створити рекламу</button>
      </form>
    </div>
  );

  const ProfileSettingsContainer = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Налаштування профілю</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Ім'я</label>
          <input type="text" className="w-full p-2 border rounded" defaultValue={user?.firstName || "Користувач"} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" className="w-full p-2 border rounded" defaultValue={user?.email || "user@example.com"} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Телефон</label>
          <input type="tel" className="w-full p-2 border rounded" defaultValue={user?.phone || "+380 XX XXX XX XX"} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Змінити пароль</label>
          <input type="password" className="w-full p-2 border rounded mb-2" placeholder="Поточний пароль" />
          <input type="password" className="w-full p-2 border rounded mb-2" placeholder="Новий пароль" />
          <input type="password" className="w-full p-2 border rounded" placeholder="Підтвердження паролю" />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Зберегти зміни</button>
      </form>
    </div>
  );

  const DashboardContainer = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Вітаємо у вашому особистому кабінеті!</h2>
      <p className="mb-4">Будь ласка, виберіть один із розділів меню для перегляду вмісту.</p>
    </div>
  );

  // Функція для рендерингу відповідного контейнера
  const renderContainer = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContainer />;
      case 'account':
        return <AccountInfoContainer />;
      case 'orders':
        return <OrdersContainer />;
      case 'saved':
        return <SavedContainer />;
      case 'reviews':
        return <ReviewsContainer />;
      case 'newsletter':
        return <NewsletterContainer />;
      case 'advertisement':
        return <AdvertisementContainer />;
      case 'settings':
        return <ProfileSettingsContainer />;
      default:
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Вітаємо у вашому особистому кабінеті!</h2>
            <p className="mb-4">Будь ласка, виберіть один із розділів меню для перегляду вмісту.</p>
          </div>
        );
    }
  };

  return (
    <div className={style.outer_container}>
      <div className={style.container}>
        <div className={style.left}>
          <div className={style.title_outer}>
            <div className={style.breadcrumb}> Home {'>'} My Account</div>
            <div className={style.title_inner}>
              <h2>My Account</h2>
            </div>
          </div>
          <div className={style.navigation}>
            <div className={style.buttons}>
              <div className={style.button_inner}>
                <span className={activeSection === 'dashboard' ? style.active_span : ''}></span>
                <button 
                  className={style.nav_button}
                  onClick={() => setActiveSection('dashboard')}
                >
                  Account Dashboard
                </button>
              </div>
              <div className={style.button_inner}>
                <span className={activeSection === 'account' ? style.active_span : ''}></span>
                <button 
                  className={style.nav_button}
                  onClick={() => setActiveSection('account')}
                >
                  Account Information
                </button>
              </div>
              <div className={style.button_inner}>
                <span className={activeSection === 'orders' ? style.active_span : ''}></span>
                <button 
                  className={style.nav_button}
                  onClick={() => setActiveSection('orders')}
                >
                  My Orders
                </button>
              </div>
            </div>
            <hr className={style.line}/>
            <div className={style.buttons}>
              <div className={style.button_inner}>
                <span className={activeSection === 'saved' ? style.active_span : ''}></span>
                <button 
                  className={style.nav_button}
                  onClick={() => setActiveSection('saved')}
                >
                  Saved
                </button>
              </div>
            </div>
            <hr className={style.line}/>
            <div className={style.buttons}>
              <div className={style.button_inner}>
                <span className={activeSection === 'reviews' ? style.active_span : ''}></span>
                <button 
                  className={style.nav_button}
                  onClick={() => setActiveSection('reviews')}
                >
                  My Product Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={style.right}>
          {renderContainer()}
        </div>
      </div>
    </div>
  );
}