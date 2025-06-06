import user_png from "../../media/user.png";
import style from "../../styles/Account.module.css";
import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { authService } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import { settings } from "../../api/settingsService";
import AdBanner from "../../media/Ad_Banner.png";

// --- AccountInfoContainer ---
function AccountInfoContainer({ userData, fetchUser }) {
  function fetchDate(){
    const date =  new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return day + '-' + month + '-' + year;
  }

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={style.head}>
        <h3>Welcome, {userData.firstName}</h3>
        <p>{fetchDate()}</p>
      </div>
      <div className={style.body}>
        <div className={style.body_inner}>
          <div className={style.info_1}>
            <div className={style.short_info_container}>
              <div className={style.photo_container}>
                <img src={user_png} alt="User Photo" className={style.user_photo} />
              </div>
            </div>
            <div className={style.edit_container}>
              <Button className={style.edit_button}>Edit</Button>
            </div>
          </div>
          <div className={style.info_2}>
            <div className={style.info_column}>
              <div className={style.info_row}>
                <p>First Name</p>
                <Input
                  type="text"
                  name=""
                  id=""
                  value={userData.firstName}
                  placeholder="Your first name"
                />
              </div>
              <div className={style.info_row}>
                <p>Gender</p>
                <select name="" id="">
                  <option value="--Choose gender--">--Choose gender--</option>
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
                  value="********"
                  placeholder="Your password"
                />
              </div>
            </div>
            <div className={style.info_column}>
              <div className={style.info_row}>
                <p>Last Name</p>
                <Input 
                type="text" 
                name="" 
                id=""
                value={userData.lastName}
                placeholder="Your last name" />
              </div>
              <div className={style.info_row}>
                <p>Email</p>
                <Input
                  type="text"
                  name=""
                  id=""
                  value={userData.email}
                  placeholder="Your email"
                />
              </div>
              <div className={style.info_row}>
                <p>Phone number</p>
                <Input
                  type="text"
                  name=""
                  id=""
                  value={userData.phoneNumber}
                  placeholder="Your phone number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// --- OrdersContainer ---
function OrdersContainer({ style }) {
  return (
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
            <td className={style.text_green_500}>Доставлено</td>
            <td className="p-2">1250 грн</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="p-2">#1002</td>
            <td className="p-2">10.04.2025</td>
            <td className={style.text_yellow_500}>В обробці</td>
            <td className="p-2">450 грн</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// --- SavedContainer ---
function SavedContainer({ style }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Збережені товари</h2>
      <div className={style.space_y_4}>
        {[1, 2, 3].map((item) => (
          <div key={item} className={style.pb_4}>
            <div className="bg-gray-200 h-32 rounded mb-2"></div>
            <h3 className="font-bold">Товар #{item}</h3>
            <p className="text-gray-600">1200 грн</p>
            <div className={style.mt_2}>
              <Button className={style.buyButton}>Buy</Button>
              <Button className={style.buyButton}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- ReviewsContainer ---
function ReviewsContainer({ style }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Мої відгуки</h2>
      <div className={style.space_y_4}>
        <div className={style.pb_4}>
          <div className="flex items-center mb-2">
            <div className="bg-gray-200 w-12 h-12 rounded mr-2"></div>
            <div>
              <h3 className="font-bold">Товар #1</h3>
              <div className={style.text_yellow_500}>★★★★☆</div>
            </div>
          </div>
          <p className="text-gray-700">Дуже задоволений покупкою. Хороша якість, швидка доставка.</p>
          <p className="text-sm text-gray-500 mt-1">Додано: 05.04.2025</p>
        </div>
        <div className={style.pb_4}>
          <div className="flex items-center mb-2">
            <div className="bg-gray-200 w-12 h-12 rounded mr-2"></div>
            <div>
              <h3 className="font-bold">Товар #2</h3>
              <div className={style.text_yellow_500}>★★★☆☆</div>
            </div>
          </div>
          <p className="text-gray-700">Нормальний товар, але є невеликі недоліки.</p>
          <p className="text-sm text-gray-500 mt-1">Додано: 01.04.2025</p>
        </div>
      </div>
    </div>
  );
}

// --- NewsletterContainer ---
function NewsletterContainer() {
  return (
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
}

// --- AdvertisementContainer ---
function AdvertisementContainer() {
  return (
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
}

// --- ProfileSettingsContainer ---
function ProfileSettingsContainer() {
  return (
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
}

// --- DashboardContainer ---
function DashboardContainer() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Вітаємо у вашому особистому кабінеті!</h2>
      <p className="mb-4">Будь ласка, виберіть один із розділів меню для перегляду вмісту.</p>
    </div>
  );
}

// --- PreferencesContainer ---
function PreferencesContainer({ style }) {
  const [prefData, setPrefData] = useState({
    age: "",
    country: "",
    region: "",
    city: "",
    interests: [],
    profession: "",
    industry: "",
    educationLevel: "",
    educationInstitution: "",
    socialNetwork: "",
    instagramLink: "",
    facebookLink: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchPreferences = async () => {
      setIsLoading(true);
      try {
        const data = await settings.get_targeting_parameters();
        if (!data) {
          setPrefData({
            age: "",
            city: "",
            country: "",
            educationInstitution: "",
            educationLevel: "",
            facebookLink: "",
            industry: "",
            instagramLink: "",
            interests: [],
            profession: "",
            region: "",
            socialNetwork: "",
          });
          return;
        }
        
        const {
          id,
          userId,
          createdAt,
          updatedAt,
          ...cleanData
        } = data;
        
        setPrefData({
          ...cleanData,
          interests: Array.isArray(data.interests) ? data.interests : [],
        });
      } catch (error) {
        // handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchPreferences();
  }, []);

  const handlePrefChange = (e) => {
    const { name, value, type, checked, id } = e.target;
    if (type === "checkbox") {
      setPrefData((prev) => {
        const currentInterests = Array.isArray(prev.interests) ? prev.interests : [];
        let updated = [...currentInterests];
        if (checked) {
          updated.push(id);
        } else {
          updated = updated.filter((i) => i !== id);
        }
        return { ...prev, interests: updated };
      });
    } else {
      setPrefData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const isInterestSelected = (id) => {
    return Array.isArray(prefData.interests) && prefData.interests.includes(id);
  };

  const savePreferences = async () => {
    setSaveStatus({ type: "info", message: "Збереження..." });
    try {
      const dataToSave = {
        age: prefData.age || "",
        country: prefData.country || "",
        region: prefData.region || "",
        city: prefData.city || "",
        interests: Array.isArray(prefData.interests) ? prefData.interests : [],
        profession: prefData.profession || "",
        industry: prefData.industry || "",
        educationLevel: prefData.educationLevel || "",
        educationInstitution: prefData.educationInstitution || "",
        socialNetwork: prefData.socialNetwork || "",
        instagramLink: prefData.instagramLink || "",
        facebookLink: prefData.facebookLink || "",
      };
      
      const response = await settings.save_targeting_parameters(dataToSave);
      setSaveStatus({ type: "success", message: "Налаштування збережено успішно!" });
      setTimeout(() => {
        setSaveStatus({ type: "", message: "" });
      }, 3000);
    } catch (error) {
      setSaveStatus({ type: "error", message: "Помилка збереження налаштувань" });
    }
  };

  if (isLoading) {
    return (
      <div className={style.preferences_container}>
        <div className={style.head}>
          <h3>Завантаження...</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={style.preferences_container}>
        <div className={style.head}>
          <h3>Мої Уподобання</h3>
          <p>Налаштуйте свій профіль</p>
        </div>
        <div className={style.body}>
          <div className={style.body_inner}>
            {saveStatus.message && (
              <div className={`${style.status_message} ${style[saveStatus.type]}`}>
                {saveStatus.message}
              </div>
            )}
            <div className={style.form_group}>
              <div className={style.form_grid}>
                <div>
                  <label className={style.form_label}>Ваш вік</label>
                  <select
                    name="age"
                    value={prefData.age || ""}
                    className={style.select_field}
                    onChange={handlePrefChange}
                  >
                    <option value="">Виберіть ваш вік</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45+">45+</option>
                  </select>
                </div>
                <div>
                  <label className={style.form_label}>Ваша країна</label>
                  <select
                    name="country"
                    value={prefData.country || ""}
                    className={style.select_field}
                    onChange={handlePrefChange}
                  >
                    <option value="">Виберіть вашу країну</option>
                    <option value="ukraine">Україна</option>
                    <option value="poland">Польща</option>
                    <option value="germany">Німеччина</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={style.form_group}>
              <div className={style.form_grid}>
                <div>
                  <label className={style.form_label}>Регіон</label>
                  <select
                    name="region"
                    value={prefData.region || ""}
                    className={style.select_field}
                    onChange={handlePrefChange}
                  >
                    <option value="">Виберіть ваш регіон</option>
                    <option value="kyiv">Київська область</option>
                    <option value="lviv">Львівська область</option>
                    <option value="odesa">Одеська область</option>
                  </select>
                </div>
                <div>
                  <label className={style.form_label}>Ваше місто/село</label>
                  <select
                    name="city"
                    value={prefData.city || ""}
                    className={style.select_field}
                    onChange={handlePrefChange}
                  >
                    <option value="">Виберіть ваше місто/село</option>
                    <option value="kyiv">Київ</option>
                    <option value="lviv">Львів</option>
                    <option value="odesa">Одеса</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={style.form_group}>
              <label className={style.form_label}>Інтереси</label>
              <div className={style.interests_grid}>
                {[
                  { id: "sports", label: "Спорт" },
                  { id: "tech", label: "Технології" },
                  { id: "extremeSports", label: "Екстрем. спорт" },
                  { id: "auto", label: "Автомобілі" },
                  { id: "film", label: "Фільми та музика" },
                  { id: "travel", label: "Подорожі" },
                  { id: "cooking", label: "Кулінарія" },
                  { id: "education", label: "Освіта" },
                  { id: "fashion", label: "Мода" },
                  { id: "art", label: "Мистецтво" },
                  { id: "health", label: "Здоров'я та фітнес" },
                ].map(({ id, label }) => (
                  <div className={style.interest_item} key={id}>
                    <Input
                      type="checkbox"
                      id={id}
                      name="interests"
                      className={style.interest_checkbox}
                      checked={isInterestSelected(id)}
                      onChange={handlePrefChange}
                    />
                    <label htmlFor={id} className={style.interest_label}>
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className={style.form_group}>
              <div className={style.form_grid}>
                <div>
                  <label className={style.form_label}>Професія / посада</label>
                  <select
                    name="profession"
                    value={prefData.profession || ""}
                    className={style.select_field}
                    onChange={handlePrefChange}
                  >
                    <option value="">Виберіть професію або посаду</option>
                    <option value="developer">Розробник</option>
                    <option value="manager">Менеджер</option>
                    <option value="student">Студент</option>
                  </select>
                </div>
                <div>
                  <label className={style.form_label}>Галузь</label>
                  <select
                    name="industry"
                    value={prefData.industry || ""}
                    className={style.select_field}
                    onChange={handlePrefChange}
                  >
                    <option value="">Виберіть галузь</option>
                    <option value="it">ІТ</option>
                    <option value="finance">Фінанси</option>
                    <option value="healthcare">Охорона здоров'я</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={style.form_group}>
              <div className={style.form_grid}>
                <div>
                  <label className={style.form_label}>Рівень освіти</label>
                  <select
                    name="educationLevel"
                    value={prefData.educationLevel || ""}
                    className={style.select_field}
                    onChange={handlePrefChange}
                  >
                    <option value="">Виберіть рівень освіти</option>
                    <option value="highschool">Середня освіта</option>
                    <option value="bachelor">Бакалавр</option>
                    <option value="master">Магістр</option>
                    <option value="phd">Доктор наук</option>
                  </select>
                </div>
                <div>
                  <label className={style.form_label}>Навчальний заклад</label>
                  <select
                    name="educationInstitution"
                    value={prefData.educationInstitution || ""}
                    className={style.select_field}
                    onChange={handlePrefChange}
                  >
                    <option value="">Виберіть навчальний заклад</option>
                    <option value="knu">КНУ ім. Шевченка</option>
                    <option value="kpi">КПІ ім. Сікорського</option>
                    <option value="lnu">ЛНУ ім. Франка</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={style.social_networks}>
              <label className={style.form_label}>Виберіть соціальну мережу</label>
              <select
                name="socialNetwork"
                value={prefData.socialNetwork || ""}
                className={style.select_field}
                style={{ marginBottom: "1rem" }}
                onChange={handlePrefChange}
              >
                <option value="">Виберіть соціальну мережу</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter</option>
                <option value="linkedin">LinkedIn</option>
              </select>
              <div className={style.social_field}>
                <label className={style.social_label}>Instagram</label>
                <Input
                  type="text"
                  name="instagramLink"
                  className={style.input_field}
                  placeholder="https://instagram.com/username"
                  value={prefData.instagramLink || ""}
                  onChange={handlePrefChange}
                />
              </div>
              <div className={style.social_field}>
                <label className={style.social_label}>Facebook</label>
                <Input
                  type="text"
                  name="facebookLink"
                  className={style.input_field}
                  placeholder="https://facebook.com/username"
                  value={prefData.facebookLink || ""}
                  onChange={handlePrefChange}
                />
              </div>
            </div>
            <Button className={style.button_save} onClick={savePreferences}>
              Зберегти налаштування
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// --- Main Account Component ---
export default function Account() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showLoader, setShowLoader] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    nickname: "",
    gender: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const data = await authService.getUser();
      setUserData({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phone,
      });
    } catch (error) {
      // handle error
    }
  };

  const handleLogout = async () => {
    setShowLoader(true);
    try {
      await authService.logout();
      setTimeout(() => {
        navigate("/");
      }, 600);
    } catch (error) {
      setShowLoader(false);
    }
  };

  const renderContainer = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContainer />;
      case "account":
        return <AccountInfoContainer userData={userData} fetchUser={fetchUser} />;
      case "orders":
        return <OrdersContainer style={style} />;
      case "saved":
        return <SavedContainer style={style} />;
      case "reviews":
        return <ReviewsContainer style={style} />;
      case "newsletter":
        return <NewsletterContainer />;
      case "advertisement":
        return <AdvertisementContainer />;
      case "settings":
        return <ProfileSettingsContainer />;
      case "preferences":
        return <PreferencesContainer style={style} />;
      default:
        return <DashboardContainer />;
    }
  };

  return (
    <main className={style.outer_container}>
      {/* Банер зліва */}
      <div className={style.left_banner}>
        <img src={AdBanner} alt="Advertisement" className={style.banner_image} />
      </div>

      <div className={style.container}>
        <div className={style.left}>
          <div className={style.title_outer}>
            <div className={style.breadcrumb}> Home {" > "} My Account</div>
            <div className={style.title_inner}>
              <h2>My Account</h2>
            </div>
          </div>
          <div className={style.navigation}>
            <div className={style.buttons}>
              <div className={style.button_inner}>
                <span className={activeSection === "dashboard" ? style.active_span : ""}></span>
                <Button className={style.nav_button} onClick={() => setActiveSection("dashboard")}>
                  Account Dashboard
                </Button>
              </div>
              <div className={style.button_inner}>
                <span className={activeSection === "account" ? style.active_span : ""}></span>
                <Button className={style.nav_button} onClick={() => setActiveSection("account")}>
                  Account Information
                </Button>
              </div>
              <div className={style.button_inner}>
                <span className={activeSection === "orders" ? style.active_span : ""}></span>
                <Button className={style.nav_button} onClick={() => setActiveSection("orders")}>
                  My Orders
                </Button>
              </div>
            </div>
            <hr className={style.line} />
            <div className={style.buttons}>
              <div className={style.button_inner}>
                <span className={activeSection === "saved" ? style.active_span : ""}></span>
                <Button className={style.nav_button} onClick={() => setActiveSection("saved")}>
                  Saved
                </Button>
              </div>
            </div>
            <hr className={style.line} />
            <div className={style.buttons}>
              <div className={style.button_inner}>
                <span className={activeSection === "reviews" ? style.active_span : ""}></span>
                <Button className={style.nav_button} onClick={() => setActiveSection("reviews")}>
                  My Product Reviews
                </Button>
              </div>
              <div className={style.button_inner}>
                <span className={activeSection === "preferences" ? style.active_span : ""}></span>
                <Button className={style.nav_button} onClick={() => setActiveSection("preferences")}>
                  My Preferences
                </Button>
              </div>
            </div>
          </div>
          <Button 
          onClick={handleLogout}
          children={'Logout'}
          id={style.logout_button}
          />
        </div>
        <div className={style.right}>{renderContainer()}</div>
      </div>

      {/* Банер справа */}
      <div className={style.right_banner}>
        <img src={AdBanner} alt="Advertisement" className={style.banner_image} />
      </div>
    </main>
  );
}