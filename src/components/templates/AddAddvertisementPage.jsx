import { useState, useEffect } from 'react'
import styles from "../../styles/AddAddvertisementPage.module.css"
import { authService } from '../../api/authService'
import { advertisementService } from '../../api/advertisementService'
import Button from '../atoms/Button'
import { useNavigate } from 'react-router-dom'


function AddAddvertisementPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true) // Add loading state
  const [sent, setSent] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    description: '',
    price: '',
    contactName: '',
    email: '',
    phone: '',
    currency: 'UAH',
    city: '',
    region: '',
    images: [],
  })

  const categories = [
    { value: 'electronics', label: 'Електроніка' },
    { value: 'furniture', label: 'Меблі' },
    { value: 'clothes', label: 'Одяг' },
    { value: 'books', label: 'Книги' },
    { value: 'cars', label: 'Автомобілі' },
    { value: 'property', label: 'Нерухомість' },
    { value: 'sports', label: 'Спорт і відпочинок' },
    { value: 'home', label: 'Дім і сад' },
    { value: 'beauty', label: 'Краса і здоров\'я' },
    { value: 'children', label: 'Дитячі товари' },
    { value: 'animals', label: 'Тварини' },
    { value: 'hobby', label: 'Хобі та дозвілля' },
    { value: 'business', label: 'Бізнес та послуги' },
    { value: 'other', label: 'Інше' }
  ]

  const currencies = [
    { value: 'UAH', label: 'UAH' },
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
  ]

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getUser()
        setUser(userData)
        // Pre-fill form data with user info if available
        setFormData(prev => ({
          ...prev,
          contactName: userData?.firstName + ' ' + userData?.lastName || '',
          email: userData?.email || '',
          phone: userData?.phone
        }))
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.slice(0, 8 - formData.images.length).map(file => ({
      id: URL.createObjectURL(file), // тимчасовий ID
      file,
      url: URL.createObjectURL(file)
    }));

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };


  async function fetchUserData () {
    const user = await authService.getUser();
    console.log(user);
  }

  const handleDeleteImage = (id: string) => {
  setFormData(prev => ({
    ...prev,
    images: prev.images.filter(img => img.id !== id)
  }));
};

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("productName", formData.productName);
    form.append("category", formData.category);
    form.append("price", formData.price);
    form.append("description", formData.description);
    form.append("contactName", formData.contactName);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("currency", formData.currency);
    form.append("city", formData.city);
    form.append("region", formData.region);

    console.log(formData.currency);

    formData.images.forEach((img) => {
      form.append("images", img.file); // бекенд має обробляти як масив файлів
    });

    try {
      await advertisementService.createAdvertisement(form);
      setSent(true);
      setShowSuccessModal(true);
      // console.log("Оголошення успішно створено");
    } catch (err) {
      console.error("Помилка при створенні оголошення:", err);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const handleCreateAnother = () => {
    setShowSuccessModal(false);
    setSent(false);
    // Очищуємо форму
    setFormData({
      productName: '',
      category: '',
      description: '',
      price: '',
      contactName: user?.firstName + ' ' + user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      currency: 'UAH',
      city: '',
      region: '',
      images: [],
    });
  };

  const getCategoryLabel = (categoryValue) => {
    const category = categories.find(cat => cat.value === categoryValue)
    return category ? category.label : categoryValue
  }
    
    return (
      <main className={styles.add_main}>
        <div className={styles['min-h-screen'] + ' ' + styles['bg-gray-50']}>
          <div className={styles['max-w-4xl'] + ' ' + styles['mx-auto'] + ' ' + styles['p-6']}>
            <div className={styles['bg-white'] + ' ' + styles['rounded-lg'] + ' ' + styles['shadow-md'] + ' ' + styles['p-8']}>
              <div className={styles.flex + ' ' + styles['items-center'] + ' ' + styles['justify-between'] + ' ' + styles['mb-6']}>
                <div>
                  <h1 className={styles['text-2xl'] + ' ' + styles['font-bold'] + ' ' + styles['text-gray-900']}>Створення оголошення</h1>
                  <p className={styles['text-gray-600'] + ' ' + styles['mt-1']}>Заповніть всі необхідні поля</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className={styles['space-y-6']}>
                <div className={styles.grid + ' ' + styles['grid-cols-1'] + ' ' + styles['lg:grid-cols-2'] + ' ' + styles['gap-8']}>
                  <div className={styles['space-y-6']}>
                    <div>
                      <label className={styles.block + ' ' + styles['text-sm'] + ' ' + styles['font-medium'] + ' ' + styles['text-gray-700'] + ' ' + styles['mb-2']}>
                        Назва товару*
                      </label>
                      <input
                        placeholder="Введіть назву оголошення"
                        type="text"
                        name="productName"
                        className={styles['w-full'] + ' ' + styles['px-4'] + ' ' + styles['py-3'] + ' ' + styles.border + ' ' + styles['border-gray-300'] + ' ' + styles['rounded-lg'] + ' ' + styles['focus:ring-2'] + ' ' + styles['focus:ring-blue-500'] + ' ' + styles['focus:border-transparent']}
                        value={formData.productName}
                        onChange={handleChange}
                        minLength={14}
                        maxLength={80}
                        required
                      />
                    </div>

                    <div>
                      <label className={styles.block + ' ' + styles['text-sm'] + ' ' + styles['font-medium'] + ' ' + styles['text-gray-700'] + ' ' + styles['mb-2']}>
                        Категорія*
                      </label>
                      <select
                        className={styles['w-full'] + ' ' + styles['px-4'] + ' ' + styles['py-3'] + ' ' + styles.border + ' ' + styles['border-gray-300'] + ' ' + styles['rounded-lg'] + ' ' + styles['focus:ring-2'] + ' ' + styles['focus:ring-blue-500'] + ' ' + styles['focus:border-transparent']}
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Оберіть категорію</option>
                        {categories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={styles.block + ' ' + styles['text-sm'] + ' ' + styles['font-medium'] + ' ' + styles['text-gray-700'] + ' ' + styles['mb-2']}>
                        Ціна*
                      </label>
                      <div className={styles.relative + ' ' + styles.oneLine}>
                        <input
                          placeholder="Введіть ціну"
                          type="number"
                          name="price"
                          className={styles['w-full'] + ' ' + styles['px-4'] + ' ' + styles['py-3'] + ' ' + styles['pr-12'] + ' ' + styles.border + ' ' + styles['border-gray-300'] + ' ' + styles['rounded-lg'] + ' ' + styles['focus:ring-2'] + ' ' + styles['focus:ring-blue-500'] + ' ' + styles['focus:border-transparent']}
                          value={formData.price}
                          onChange={handleChange}
                          min={0}
                          max={99999999.99}
                          required
                        />
                        <select
                          name="currency"
                          className={styles['w-full'] + ' ' + styles['px-4'] + ' ' + styles['py-3'] + ' ' + styles['pr-12'] + ' ' + styles.border + ' ' + styles['border-gray-300'] + ' ' + styles['rounded-lg'] + ' ' + styles['focus:ring-2'] + ' ' + styles['focus:ring-blue-500'] + ' ' + styles['focus:border-transparent']}
                          value={formData.currency}
                          onChange={handleChange}
                          required
                        >
                          {currencies.map(currency => (
                          <option key={currency.value} value={currency.value}>
                            {currency.label}
                          </option>
                        ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={styles.block + ' ' + styles['text-sm'] + ' ' + styles['font-medium'] + ' ' + styles['text-gray-700'] + ' ' + styles['mb-2']}>
                        Опис товару*
                      </label>
                      <textarea
                        className={styles['w-full'] + ' ' + styles['px-4'] + ' ' + styles['py-3'] + ' ' + styles.border + ' ' + styles['border-gray-300'] + ' ' + styles['rounded-lg'] + ' ' + styles['focus:ring-2'] + ' ' + styles['focus:ring-blue-500'] + ' ' + styles['focus:border-transparent'] + ' ' + styles['h-32'] + ' ' + styles['resize-none']}
                        placeholder="Детально опишіть товар"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={{height:100}}
                        minLength={50}
                        maxLength={10000}
                        required
                      />
                    </div>

                    
                  </div>

                  <div className={styles['space-y-6']}>
                    <div>
                      <label className={styles.block + ' ' + styles['text-sm'] + ' ' + styles['font-medium'] + ' ' + styles['text-gray-700'] + ' ' + styles['mb-2']}>
                        Фотографії товару (максимум 8)
                      </label>
                      <div className={styles['border-2'] + ' ' + styles['border-dashed'] + ' ' + styles['border-gray-300'] + ' ' + styles['rounded-lg'] + ' ' + styles['p-6'] + ' ' + styles['text-center'] + ' ' + styles['hover:border-blue-400'] + ' ' + styles['transition-colors']}>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className={styles.hidden}
                          id="file-input"
                        />
                        <label htmlFor="file-input" className={styles['cursor-pointer']}>
                          <div className={styles.flex + ' ' + styles['flex-col'] + ' ' + styles['items-center']}>
                            <div className={styles['w-12'] + ' ' + styles['h-12'] + ' ' + styles['bg-blue-100'] + ' ' + styles['rounded-full'] + ' ' + styles.flex + ' ' + styles['items-center'] + ' ' + styles['justify-center'] + ' ' + styles['mb-3']}>
                              <span className={styles['text-blue-600'] + ' ' + styles['text-xl']}>+</span>
                            </div>
                            <span className={styles['text-blue-600'] + ' ' + styles['font-medium']}>Додати фото</span>
                            <span className={styles['text-gray-500'] + ' ' + styles['text-sm'] + ' ' + styles['mt-1']}>або перетягніть файли сюди</span>
                          </div>
                        </label>
                      </div>

                      {formData.images.length > 0 && (
                        <div className={styles.grid + ' ' + styles['grid-cols-2'] + ' ' + styles['gap-3'] + ' ' + styles['mt-4']}>
                          {formData.images.map((img) => (
                            <div className={styles.relative + ' ' + styles.group} key={img.id}>
                              <button
                                type="button"
                                className={styles.absolute + ' ' + styles['-top-2'] + ' ' + styles['-right-2'] + ' ' + styles['bg-red-500'] + ' ' + styles['text-white'] + ' ' + styles['w-6'] + ' ' + styles['h-6'] + ' ' + styles['rounded-full'] + ' ' + styles.flex + ' ' + styles['items-center'] + ' ' + styles['justify-center'] + ' ' + styles['text-sm'] + ' ' + styles['hover:bg-red-600'] + ' ' + styles['z-10'] + ' ' + styles['del-btn']}
                                onClick={() => handleDeleteImage(img.id)}
                              >
                                ×
                              </button>
                              <img
                                src={img.url}
                                alt="Завантажене зображення"
                                className={styles['w-full'] + ' ' + styles['h-24'] + ' ' + styles['object-cover'] + ' ' + styles['rounded-lg']}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles['space-y-6']}>
                  {/* Заголовок секції */}
                  <div className={styles['border-t'] + ' ' + styles['pt-6']}>
                    <h3 className={styles['text-lg'] + ' ' + styles['font-medium'] + ' ' + styles['text-gray-900'] + ' ' + styles['mb-6']}>
                      Контактна інформація
                    </h3>
                  </div>

                  {/* Контейнер для всіх полів */}
                  <div className={styles['grid'] + ' ' + styles['grid-cols-1'] + ' ' + styles['md:grid-cols-2'] + ' ' + styles['gap-6']}>
                    
                    {/* Ім'я */}
                    <div>
                      <label className={styles.block + ' ' + styles['text-sm'] + ' ' + styles['font-medium'] + ' ' + styles['text-gray-700'] + ' ' + styles['mb-2']}>
                        Ваше ім'я*
                      </label>
                      <input
                        placeholder={user}
                        type="text"
                        name="contactName"
                        className={styles['w-full'] + ' ' + styles['px-4'] + ' ' + styles['py-3'] + ' ' + styles.border + ' ' + styles['border-gray-300'] + ' ' + styles['rounded-lg'] + ' ' + styles['focus:ring-2'] + ' ' + styles['focus:ring-blue-500'] + ' ' + styles['focus:border-transparent']}
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className={styles.block + ' ' + styles['text-sm'] + ' ' + styles['font-medium'] + ' ' + styles['text-gray-700'] + ' ' + styles['mb-2']}>
                        Email*
                      </label>
                      <input
                        placeholder={formData.email}
                        type="email"
                        name="email"
                        className={styles['w-full'] + ' ' + styles['px-4'] + ' ' + styles['py-3'] + ' ' + styles.border + ' ' + styles['border-gray-300'] + ' ' + styles['rounded-lg'] + ' ' + styles['focus:ring-2'] + ' ' + styles['focus:ring-blue-500'] + ' ' + styles['focus:border-transparent']}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Телефон */}
                    <div>
                      <label className={styles.block + ' ' + styles['text-sm'] + ' ' + styles['font-medium'] + ' ' + styles['text-gray-700'] + ' ' + styles['mb-2']}>
                        Телефон*
                      </label>
                      <input
                        placeholder={formData.phone}
                        type="tel"
                        name="phone"
                        className={styles['w-full'] + ' ' + styles['px-4'] + ' ' + styles['py-3'] + ' ' + styles.border + ' ' + styles['border-gray-300'] + ' ' + styles['rounded-lg'] + ' ' + styles['focus:ring-2'] + ' ' + styles['focus:ring-blue-500'] + ' ' + styles['focus:border-transparent']}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Область */}
                    <div>
                      <label className={styles.block + ' ' + styles['text-sm'] + ' ' + styles['font-medium'] + ' ' + styles['text-gray-700'] + ' ' + styles['mb-2']}>
                        Область*
                      </label>
                      <input
                        placeholder="Введіть область"
                        type="text"
                        name="region"
                        className={styles['w-full'] + ' ' + styles['px-4'] + ' ' + styles['py-3'] + ' ' + styles.border + ' ' + styles['border-gray-300'] + ' ' + styles['rounded-lg'] + ' ' + styles['focus:ring-2'] + ' ' + styles['focus:ring-blue-500'] + ' ' + styles['focus:border-transparent']}
                        value={formData.region}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Місто - займає повну ширину на мобільних, половину на десктопі */}
                    <div>
                      <label className={styles.block + ' ' + styles['text-sm'] + ' ' + styles['font-medium'] + ' ' + styles['text-gray-700'] + ' ' + styles['mb-2']}>
                        Місто*
                      </label>
                      <input
                        placeholder="Введіть місто"
                        type="text"
                        name="city"
                        className={styles['w-full'] + ' ' + styles['px-4'] + ' ' + styles['py-3'] + ' ' + styles.border + ' ' + styles['border-gray-300'] + ' ' + styles['rounded-lg'] + ' ' + styles['focus:ring-2'] + ' ' + styles['focus:ring-blue-500'] + ' ' + styles['focus:border-transparent']}
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={styles.for_button}>
                      <Button 
                    id="publish"
                    type="submit" 
                    children={"Опублікувати оголошення"}
                  />
                    </div>

                  </div>
                </div>
                <div className={styles.flex + ' ' + styles['justify-end'] + ' ' + styles['pt-6'] + ' ' + styles['border-t']}>
                  
                </div>
              </form>
            </div>
          </div>

          {/* Success Modal */}
          {showSuccessModal && (
            <div 
              className={styles['fixed'] + ' ' + styles['inset-0'] + ' ' + styles['bg-black'] + ' ' + styles['bg-opacity-50'] + ' ' + styles['flex'] + ' ' + styles['items-center'] + ' ' + styles['justify-center'] + ' ' + styles['z-50']}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999
              }}
            >
              <div 
                className={styles['bg-white'] + ' ' + styles['rounded-lg'] + ' ' + styles['shadow-xl'] + ' ' + styles['p-6'] + ' ' + styles['max-w-md'] + ' ' + styles['w-full'] + ' ' + styles['mx-4']}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '24px',
                  maxWidth: '28rem',
                  width: '100%',
                  margin: '0 16px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
              >
                {/* Success Icon */}
                <div 
                  className={styles['flex'] + ' ' + styles['items-center'] + ' ' + styles['justify-center'] + ' ' + styles['mb-4']}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}
                >
                  <div 
                    className={styles['w-16'] + ' ' + styles['h-16'] + ' ' + styles['bg-green-100'] + ' ' + styles['rounded-full'] + ' ' + styles['flex'] + ' ' + styles['items-center'] + ' ' + styles['justify-center']}
                    style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: '#dcfce7',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span 
                      style={{
                        color: '#16a34a',
                        fontSize: '24px',
                        fontWeight: 'bold'
                      }}
                    >
                      ✓
                    </span>
                  </div>
                </div>

                {/* Modal Content */}
                <div style={{ textAlign: 'center' }}>
                  <h3 
                    className={styles['text-lg'] + ' ' + styles['font-semibold'] + ' ' + styles['text-gray-900'] + ' ' + styles['mb-2']}
                    style={{
                      fontSize: '18px',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '8px'
                  }}
                >
                  Оголошення успішно створено!
                </h3>
                <p 
                  className={styles['text-gray-600'] + ' ' + styles['mb-6']}
                  style={{
                    color: '#6b7280',
                    marginBottom: '24px'
                  }}
                >
                  Ваше оголошення "{formData.productName}" було опубліковано та скоро з'явиться на сайті.
                </p>

                {/* Action Buttons */}
                <div 
                  className={styles['flex'] + ' ' + styles['flex-col'] + ' ' + styles['sm:flex-row'] + ' ' + styles['gap-3']}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  {/* Primary Button */}
                  <Button
                    onClick={handleCloseModal}
                    style={{
                      fontWeight: 600,
                      width: '100%',
                      flex: 1,
                      backgroundColor: '#2563eb',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    children={'На головну'}
                  />

                  {/* Secondary Button */}
                  <Button
                    onClick={handleCreateAnother}
                    style={{
                      fontWeight: 600,
                      width: '100%',
                      flex: 1,
                      backgroundColor: '#e5e7eb',
                      color: '#1f2937',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    children={'Створити ще одне'}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </main>
    )
}

export default AddAddvertisementPage