import { useState } from 'react'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)
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
    setShowForm(false)
  }

  return (
    <div className="main-container">
      <button className="add-button" onClick={() => setShowForm(true)}>
        Додати оголошення
      </button>

      {showForm && (
        <div className="modal-overlay">
          <div className="form-container-large">
            <button className="close-button" onClick={() => setShowForm(false)}>
              ×
            </button>
            <h1>Створення оголошення</h1>
            <p>Заповніть всі необхідні поля</p>

            <form onSubmit={handleSubmit}>
              <div className="form-columns">
                <div className="form-left">
                  <label>
                    Назва товару*
                    <input
                      placeholder="Наприклад: iPhone 12 Pro"
                      type="text"
                      name="productName"
                      className="input"
                      value={formData.productName}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label>
                    Категорія*
                    <select
                      className="input"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Оберіть категорію</option>
                      <option value="electronics">Електроніка</option>
                      <option value="furniture">Меблі</option>
                      <option value="clothes">Одяг</option>
                      <option value="books">Книги</option>
                    </select>
                  </label>

                  <label>
                    Ціна*
                    <input
                      placeholder="Наприклад: 10000"
                      type="text"
                      name="price"
                      className="input"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label>
                    Опис товару*
                    <textarea
                      className="textarea"
                      placeholder="Детально опишіть товар"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </label>
                </div>

                <div className="form-right">
                  <label>
                    Фотографії товару (максимум 8)
                    <div className="file-upload">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        id="file-input"
                      />
                      <label htmlFor="file-input" className="file-upload-label">
                        <span>+ Додати фото</span>
                      </label>
                    </div>
                  </label>

                  <div className="grid-container">
                    {formData.images.map((img) => (
                      <div className="grid-item" key={img.id}>
                        <button
                          type="button"
                          className="delete-button"
                          onClick={() => handleDeleteImage(img.id)}
                        >
                          ×
                        </button>
                        <img
                          src={img.url}
                          alt="Завантажене зображення"
                          className="image"
                        />
                      </div>
                    ))}
                  </div>

                  <h3>Контактна інформація</h3>

                  <label>
                    Ваше ім'я*
                    <input
                      placeholder="Наприклад: Іван"
                      type="text"
                      name="contactName"
                      className="input"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label>
                    Email*
                    <input
                      placeholder="Наприклад: example@gmail.com"
                      type="email"
                      name="email"
                      className="input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label>
                    Телефон*
                    <input
                      placeholder="Наприклад: 0991234567"
                      type="tel"
                      name="phone"
                      className="input"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
              </div>

              <button type="submit" className="submit-button">
                Опублікувати оголошення
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="advertisements-container">
        {advertisements.map((ad) => (
          <div className="advertisement-card" key={ad.id}>
            {ad.images.length > 0 && (
              <div className="advertisement-image">
                <img src={ad.images[0].url} alt={ad.productName} />
              </div>
            )}
            <div className="advertisement-content">
              <div className="advertisement-header">
                <h3>{ad.productName}</h3>
                <div className="advertisement-price">{ad.price} грн</div>
              </div>
              <div className="advertisement-category">
                {ad.category === 'electronics' && 'Електроніка'}
                {ad.category === 'furniture' && 'Меблі'}
                {ad.category === 'clothes' && 'Одяг'}
                {ad.category === 'books' && 'Книги'}
              </div>
              <p className="advertisement-description">{ad.description}</p>
              <div className="advertisement-footer">
                <span className="advertisement-contact">{ad.contactName}</span>
                <span className="advertisement-date">Сьогодні</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
