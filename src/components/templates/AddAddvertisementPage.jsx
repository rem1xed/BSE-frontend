import { useState } from 'react'

function AddAddvertisementPage() {
  const [currentPage, setCurrentPage] = useState('list') // 'list' or 'create'
  const [advertisements, setAdvertisements] = useState([])
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    description: '',
    price: '',
    contactName: '',
    email: '',
    phone: '',
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

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files).slice(
      0,
      8 - formData.images.length
    )
    const imageURLs = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
    }))
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...imageURLs] }))
  }

  const handleDeleteImage = (id) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.productName || !formData.category || !formData.description || 
        !formData.price || !formData.contactName || !formData.email || !formData.phone) {
      alert('Будь ласка, заповніть всі обов\'язкові поля')
      return
    }
    
    const newAdvertisement = {
      ...formData,
      id: Date.now(),
    }
    setAdvertisements((prev) => [...prev, newAdvertisement])
    setFormData({
      productName: '',
      category: '',
      description: '',
      price: '',
      contactName: '',
      email: '',
      phone: '',
      images: [],
    })
    setCurrentPage('list')
  }

  const getCategoryLabel = (categoryValue) => {
    const category = categories.find(cat => cat.value === categoryValue)
    return category ? category.label : categoryValue
  }

  if (currentPage === 'create') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Створення оголошення</h1>
                <p className="text-gray-600 mt-1">Заповніть всі необхідні поля</p>
              </div>
              <button 
                onClick={() => setCurrentPage('list')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                ← Назад до списку
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Назва товару*
                    </label>
                    <input
                      placeholder="Наприклад: iPhone 12 Pro"
                      type="text"
                      name="productName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.productName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Категорія*
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ціна*
                    </label>
                    <div className="relative">
                      <input
                        placeholder="Наприклад: 10000"
                        type="text"
                        name="price"
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                      <span className="absolute right-3 top-3 text-gray-500">грн</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Опис товару*
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                      placeholder="Детально опишіть товар"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Фотографії товару (максимум 8)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="file-input"
                      />
                      <label htmlFor="file-input" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                            <span className="text-blue-600 text-xl">+</span>
                          </div>
                          <span className="text-blue-600 font-medium">Додати фото</span>
                          <span className="text-gray-500 text-sm mt-1">або перетягніть файли сюди</span>
                        </div>
                      </label>
                    </div>

                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {formData.images.map((img) => (
                          <div className="relative group" key={img.id}>
                            <button
                              type="button"
                              className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm hover:bg-red-600 z-10"
                              onClick={() => handleDeleteImage(img.id)}
                            >
                              ×
                            </button>
                            <img
                              src={img.url}
                              alt="Завантажене зображення"
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Контактна інформація</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ваше ім'я*
                        </label>
                        <input
                          placeholder="Наприклад: Іван"
                          type="text"
                          name="contactName"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.contactName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email*
                        </label>
                        <input
                          placeholder="Наприклад: example@gmail.com"
                          type="email"
                          name="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Телефон*
                        </label>
                        <input
                          placeholder="Наприклад: 0991234567"
                          type="tel"
                          name="phone"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t">
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Опублікувати оголошення
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Оголошення</h1>
            <p className="text-gray-600 mt-1">Знайдіть те, що шукаєте</p>
          </div>
          <button 
            onClick={() => setCurrentPage('create')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            + Додати оголошення
          </button>
        </div>

        {advertisements.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📢</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Поки що немає оголошень</h3>
            <p className="text-gray-600 mb-6">Станьте першим, хто створить оголошення!</p>
            <button 
              onClick={() => setCurrentPage('create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Створити оголошення
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advertisements.map((ad) => (
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow" key={ad.id}>
                {ad.images.length > 0 && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={ad.images[0].url} 
                      alt={ad.productName} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{ad.productName}</h3>
                    <div className="text-lg font-bold text-blue-600 ml-2">{ad.price} грн</div>
                  </div>
                  
                  <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm mb-3">
                    {getCategoryLabel(ad.category)}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{ad.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3">
                    <span className="font-medium">{ad.contactName}</span>
                    <span>Сьогодні</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AddAddvertisementPage