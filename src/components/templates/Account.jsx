import user_png from "../../media/user.png"
import style from "../../styles/Account.module.css"
import { useState } from "react";
import Button from "../atoms/Button"
import Input from "../atoms/Input"
import { authService } from '../../services/authService';
import { useNavigate } from "react-router-dom";

export default function Account(){
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  // Компоненти контейнерів залишаються без змін...
  const AccountInfoContainer = () => (
    <>
      <div className={style.head}>
          <h3>Welcome, User</h3>
          <p>Mon 14, April, 2025</p>
      </div>
      <div className={style.body}>
        <div className={style.body_inner}>
          <div className={style.info_1}>
            <div className={style.short_info_container}>
              <div className={style.photo_container}>
                <img src={user_png} alt="User Photo" className={style.user_photo} />
              </div>
              <div className={style.name_and_email_container}>
                <h3>User User</h3>
                <p>user@example.com</p>
              </div>
            </div>
            <div className={style.edit_container}>
              <Button className={style.edit_button}>Edit</Button>
            </div>
          </div>
          <div className={style.info_2}>
            <div className={style.info_column}>
              <div className={style.info_row}>
                <p>Full Name</p>
                <Input
                  type="text"
                  name=""
                  id=""
                  placeholder="Your full name"
                />
              </div>
              <div className={style.info_row}>
                <p>Gender</p>
                <select name="" id="">
                  <option value="--Choose gender--">
                    --Choose gender--
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className={style.info_row}>
                <p>Your Password</p>
                <Input
                  type="text"
                  name=""
                  id=""
                  placeholder="Your password"
                />
              </div>
            </div>
            <div className={style.info_column}>
              <div className={style.info_row}>
                <p>Nickname</p>
                <Input
                  type="text"
                  name=""
                  id=""
                  placeholder="Your nickname"
                />
              </div>
              <div className={style.info_row}>
                <p>Email</p>
                <Input
                  type="text"
                  name=""
                  id=""
                  placeholder="Your email"
                />
              </div>
              <div className={style.info_row}>
                <p>Phone number</p>
                <Input
                  type="text"
                  name=""
                  id=""
                  placeholder="Your phone number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

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
              <Button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 text-sm">До кошика</Button>
              <Button className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm">Видалити</Button>
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
            <Input type="checkbox" id="news" className="mr-2" checked />
            <label htmlFor="news">Підписаний</label>
          </div>
        </div>
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h3 className="font-bold">Персональні пропозиції</h3>
            <p className="text-sm text-gray-600">Спеціальні пропозиції на основі ваших інтересів</p>
          </div>
          <div className="flex items-center">
            <Input type="checkbox" id="personal" className="mr-2" />
            <label htmlFor="personal">Підписатися</label>
          </div>
        </div>
      </div>
      <Button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Зберегти налаштування</Button>
    </div>
  );

  const AdvertisementContainer = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Створення нової реклами</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Назва реклами</label>
          <Input type="text" className="w-full p-2 border rounded" placeholder="Введіть назву реклами" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Опис</label>
          <textarea className="w-full p-2 border rounded" rows="4" placeholder="Введіть опис реклами"></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Бюджет</label>
          <Input type="number" className="w-full p-2 border rounded" placeholder="Введіть бюджет" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Зображення</label>
          <Input type="file" className="w-full p-2" />
        </div>
        <Button className="bg-blue-500 text-white px-4 py-2 rounded">Створити рекламу</Button>
      </form>
    </div>
  );

  const ProfileSettingsContainer = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Налаштування профілю</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Ім'я</label>
          <Input type="text" className="w-full p-2 border rounded" value="Користувач" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <Input type="email" className="w-full p-2 border rounded" value="user@example.com" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Телефон</label>
          <Input type="tel" className="w-full p-2 border rounded" value="+380 XX XXX XX XX" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Змінити пароль</label>
          <Input type="password" className="w-full p-2 border rounded mb-2" placeholder="Поточний пароль" />
          <Input type="password" className="w-full p-2 border rounded mb-2" placeholder="Новий пароль" />
          <Input type="password" className="w-full p-2 border rounded" placeholder="Підтвердження паролю" />
        </div>
        <Button className="bg-blue-500 text-white px-4 py-2 rounded">Зберегти зміни</Button>
      </form>
    </div>
  );

  const DashboardContainer = () => (
    <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Вітаємо у вашому особистому кабінеті!</h2>
            <p className="mb-4">Будь ласка, виберіть один із розділів меню для перегляду вмісту.</p>
          </div>
  );

  const PreferencesContainer = () => {
  return (
    <>
      <div className={style.preferences_container}>
        <div className={style.head}>
          <h3>Мої Уподобання</h3>
          <p>Налаштуйте свій профіль</p>
        </div>
        <div className={style.body}>
          <div className={style.body_inner}>
            {/* Personal Information */}
            <div className={style.form_group}>
              <div className={style.form_grid}>
                <div>
                  <label className={style.form_label}>Ваш вік</label>
                  <select className={style.select_field}>
                    <option value="">Виберіть ваш вік</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45+">45+</option>
                  </select>
                </div>
                <div>
                  <label className={style.form_label}>Ваша країна</label>
                  <select className={style.select_field}>
                    <option value="">Виберіть вашу країну</option>
                    <option value="ukraine">Україна</option>
                    <option value="poland">Польща</option>
                    <option value="germany">Німеччина</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Region and City */}
            <div className={style.form_group}>
              <div className={style.form_grid}>
                <div>
                  <label className={style.form_label}>Регіон</label>
                  <select className={style.select_field}>
                    <option value="">Виберіть ваш регіон</option>
                    <option value="kyiv">Київська область</option>
                    <option value="lviv">Львівська область</option>
                    <option value="odesa">Одеська область</option>
                  </select>
                </div>
                <div>
                  <label className={style.form_label}>Ваше місто/село</label>
                  <select className={style.select_field}>
                    <option value="">Виберіть ваше місто/село</option>
                    <option value="kyiv">Київ</option>
                    <option value="lviv">Львів</option>
                    <option value="odesa">Одеса</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Interests */}
            <div className={style.form_group}>
              <label className={style.form_label}>Інтереси</label>
              <div className={style.interests_grid}>
                <div className={style.interest_item}>
                  <Input type="checkbox" id="sports" className={style.interest_checkbox} />
                  <label htmlFor="sports" className={style.interest_label}>Спорт</label>
                </div>
                <div className={style.interest_item}>
                  <Input type="checkbox" id="tech" className={style.interest_checkbox} />
                  <label htmlFor="tech" className={style.interest_label}>Технології</label>
                </div>
                <div className={style.interest_item}>
                  <Input type="checkbox" id="extremeSports" className={style.interest_checkbox} />
                  <label htmlFor="extremeSports" className={style.interest_label}>Екстрем. спорт</label>
                </div>
                <div className={style.interest_item}>
                  <Input type="checkbox" id="auto" className={style.interest_checkbox} />
                  <label htmlFor="auto" className={style.interest_label}>Автомобілі</label>
                </div>
                <div className={style.interest_item}>
                  <Input type="checkbox" id="film" className={style.interest_checkbox} />
                  <label htmlFor="film" className={style.interest_label}>Фільми та музика</label>
                </div>
                <div className={style.interest_item}>
                  <Input type="checkbox" id="travel" className={style.interest_checkbox} />
                  <label htmlFor="travel" className={style.interest_label}>Подорожі</label>
                </div>
                <div className={style.interest_item}>
                  <Input type="checkbox" id="cooking" className={style.interest_checkbox} />
                  <label htmlFor="cooking" className={style.interest_label}>Кулінарія</label>
                </div>
                <div className={style.interest_item}>
                  <Input type="checkbox" id="education" className={style.interest_checkbox} />
                  <label htmlFor="education" className={style.interest_label}>Освіта</label>
                </div>
                <div className={style.interest_item}>
                  <Input type="checkbox" id="fashion" className={style.interest_checkbox} />
                  <label htmlFor="fashion" className={style.interest_label}>Мода</label>
                </div>
                <div className={style.interest_item}>
                  <Input type="checkbox" id="art" className={style.interest_checkbox} />
                  <label htmlFor="art" className={style.interest_label}>Мистецтво</label>
                </div>
                <div className={style.interest_item}>
                  <Input type="checkbox" id="health" className={style.interest_checkbox} />
                  <label htmlFor="health" className={style.interest_label}>Здоров'я та фітнес</label>
                </div>
              </div>
            </div>
            
            {/* Professional Information */}
            <div className={style.form_group}>
              <div className={style.form_grid}>
                <div>
                  <label className={style.form_label}>Професія / посада</label>
                  <select className={style.select_field}>
                    <option value="">Виберіть професію або посаду</option>
                    <option value="developer">Розробник</option>
                    <option value="manager">Менеджер</option>
                    <option value="student">Студент</option>
                  </select>
                </div>
                <div>
                  <label className={style.form_label}>Галузь</label>
                  <select className={style.select_field}>
                    <option value="">Виберіть галузь</option>
                    <option value="it">Інформаційні технології</option>
                    <option value="finance">Фінанси</option>
                    <option value="healthcare">Охорона здоров'я</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Education */}
            <div className={style.form_group}>
              <div className={style.form_grid}>
                <div>
                  <label className={style.form_label}>Рівень освіти</label>
                  <select className={style.select_field}>
                    <option value="">Виберіть рівень освіти</option>
                    <option value="highschool">Середня освіта</option>
                    <option value="bachelor">Бакалавр</option>
                    <option value="master">Магістр</option>
                    <option value="phd">Доктор наук</option>
                  </select>
                </div>
                <div>
                  <label className={style.form_label}>Навчальний заклад (якщо доступно)</label>
                  <select className={style.select_field}>
                    <option value="">Виберіть навчальний заклад</option>
                    <option value="knu">КНУ ім. Шевченка</option>
                    <option value="kpi">КПІ ім. Сікорського</option>
                    <option value="lnu">ЛНУ ім. Франка</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Social Networks */}
            <div className={style.social_networks}>
              <label className={style.form_label}>Виберіть соціальну мережу, де ви активні</label>
              <select className={style.select_field} style={{ marginBottom: '1rem' }}>
                <option value="">Виберіть соціальну мережу</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter</option>
                <option value="linkedin">LinkedIn</option>
              </select>
              
              <div className={style.social_field}>
                <label className={style.social_label}>Додайте посилання на ваш Instagram</label>
                <Input type="text" className={style.input_field} placeholder="https://instagram.com/username" />
              </div>
              
              <div className={style.social_field}>
                <label className={style.social_label}>Додайте посилання на ваш Facebook</label>
                <Input type="text" className={style.input_field} placeholder="https://facebook.com/username" />
              </div>
            </div>
            
            <Button className={style.button_save}>
              Зберегти налаштування
            </Button>
          </div>
        </div>
      </div>
    </>
  );
  };
  // Функція для рендерингу відповідного контейнера
  const renderContainer = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContainer/>
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
      case 'preferences':
        return <PreferencesContainer />;
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
    <main className={style.outer_container}>
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
                <Button 
                  className={style.nav_button}
                  onClick={() => setActiveSection('dashboard')}
                >
                  Account Dashboard
                </Button>
              </div>
              <div className={style.button_inner}>
                <span className={activeSection === 'account' ? style.active_span : ''}></span>
                <Button 
                  className={style.nav_button}
                  onClick={() => setActiveSection('account')}
                >
                  Account Information
                </Button>
              </div>
              <div className={style.button_inner}>
                <span className={activeSection === 'orders' ? style.active_span : ''}></span>
                <Button 
                  className={style.nav_button}
                  onClick={() => setActiveSection('orders')}
                >
                  My Orders
                </Button>
              </div>
            </div>
            <hr className={style.line}/>
            <div className={style.buttons}>
              <div className={style.button_inner}>
                <span className={activeSection === 'saved' ? style.active_span : ''}></span>
                <Button 
                  className={style.nav_button}
                  onClick={() => setActiveSection('saved')}
                >
                  Saved
                </Button>
              </div>
            </div>
            <hr className={style.line}/>
            <div className={style.buttons}>
              <div className={style.button_inner}>
                <span className={activeSection === 'reviews' ? style.active_span : ''}></span>
                <Button 
                  className={style.nav_button}
                  onClick={() => setActiveSection('reviews')}
                >
                  My Product Reviews
                </Button>
              </div>
              <div className={style.button_inner}>
                <span className={activeSection === 'preferences' ? style.active_span : ''}></span>
                <Button 
                  className={style.nav_button}
                  onClick={() => setActiveSection('preferences')}
                >
                  My Preferences
                </Button>
              </div>
            </div>
          </div>
          <Button onClick={() => {authService.logout(); navigate("/login")}}>
            Logout
          </Button>
        </div>
        <div className={style.right}>
          {renderContainer()}
        </div>
      </div>
    </main>
  );
}