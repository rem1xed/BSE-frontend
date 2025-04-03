import React, { useState } from "react";
import "../../styles/Header.css";
import logo from "../../assets/photo-header/logo.png";
import secondaryButton from "../../assets/photo-header/Secondary Button.png";
import iconFilter from "../../assets/photo-header/icon-filter.png";
import iconMoon from "../../assets/photo-header/Vector.png";
import iconHeart from "../../assets/photo-header/Vector-1.png";
import iconUser from "../../assets/photo-header/Icon.png";
import iconChat from "../../assets/photo-header/chat-118.png";

function Header() {
  // Для відкриття/закриття сайдбару
  const [openSidebar, setOpenSidebar] = useState(false);

  // Тогл при кліку на кнопку "filter"
  const handleFilterClick = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <header>
      {/* --------- ВЕРХНІЙ РЯДОК (ЛОГО, ПОШУК, ІКОНКИ) --------- */}
      <div className="BasicContent">
        <a href="#">
          <img
            src={logo} // <--- HERE INSERT YOUR IMAGE
            alt="logo"
            className="logo-header"
            width="36"
            height="36"
          />
        </a>

        <div className="search-bar">
          <input type="text" placeholder="Search the products" />
        </div>

        <div className="right-block">
          <div className="discount-block">
            <a href="#">
              <img
                 src={secondaryButton} // <--- HERE INSERT YOUR IMAGE
                alt="discount"
                className="discount-button"
              />
            </a>
            <p>Only this month</p>
          </div>

          <div className="comunication">
            <a href="#">
              <img
                src={iconMoon} // <--- HERE INSERT YOUR IMAGE
                alt="dark-theme"
                width="18"
                height="18"
              />
            </a>
            <a href="#">
              <img
                src={iconHeart} // <--- HERE INSERT YOUR IMAGE
                alt="like"
                width="18"
                height="18"
              />
            </a>
            <a href="#">
              <img
                src={iconUser} // <--- HERE INSERT YOUR IMAGE
                alt="cabinet"
                width="18"
                height="18"
              />
            </a>
            <a href="#">
              <img
                src={iconChat} // <--- HERE INSERT YOUR IMAGE
                alt="chat"
                width="18"
                height="18"
              />
            </a>
          </div>
        </div>
      </div>

      {/* --------- НИЖНІЙ РЯДОК (КНОПКА FILTER, ПОСИЛАННЯ, DROP-DOWNS) --------- */}
      <div className="nav-row">
        <div className="goods">
          <button className="filter" onClick={handleFilterClick}>
            <img
              src={iconFilter} // <--- HERE INSERT YOUR IMAGE
              alt="filter icon"
              width="18"
              height="18"
            />
            Filter
            <span className="arrow">{openSidebar ? "▲" : "▼"}</span>
          </button>
          <a href="#">Best Sellers</a>
          <a href="#">Today’s Deals</a>
          <a href="#">New Arrivals</a>
          <a href="#">Gift Cards</a>
        </div>

        <div className="dropdowns">
          <select>
            <option>Eng</option>
            <option>Ukr</option>
          </select>
          <select>
            <option>USD ($)</option>
            <option>EUR (€)</option>
          </select>
        </div>
      </div>

      {/* --------- САЙДБАР (відкривається при openSidebar===true) --------- */}
      {openSidebar && (
        <div className="sidebar-container">
          {/* Ліва колонка (категорії) */}
          <div className="sidebar">
            <h3>Categories</h3>
            <ul className="categories-list">
              <li className="category-item">
                <img
                  src="/photo-header/category1.png" // <--- HERE INSERT YOUR IMAGE
                  alt="gamers"
                />
                products for gamers
              </li>
              <li className="category-item">
                <img
                  src="/photo-header/category2.png" // <--- HERE INSERT YOUR IMAGE
                  alt="electronic"
                />
                electronic
              </li>
              <li className="category-item">
                <img
                  src="/photo-header/category3.png" // <--- HERE INSERT YOUR IMAGE
                  alt="children"
                />
                children's goods
              </li>
              <li className="category-item">
                <img
                  src="/photo-header/category4.png" // <--- HERE INSERT YOUR IMAGE
                  alt="business"
                />
                business services
              </li>
              <li className="category-item">
                <img
                  src="/photo-header/category5.png" // <--- HERE INSERT YOUR IMAGE
                  alt="animals"
                />
                animals
              </li>
              <li className="category-item">
                <img
                  src="/photo-header/category6.png" // <--- HERE INSERT YOUR IMAGE
                  alt="transport"
                />
                spare parts for transport
              </li>
              <li className="category-item">
                <img
                  src="/photo-header/category7.png" // <--- HERE INSERT YOUR IMAGE
                  alt="furniture"
                />
                furniture
              </li>
              <li className="category-item">
                <img
                  src="/photo-header/category8.png" // <--- HERE INSERT YOUR IMAGE
                  alt="real-estate"
                />
                real estate
              </li>
              <li className="category-item">
                <img
                  src="/photo-header/category9.png" // <--- HERE INSERT YOUR IMAGE
                  alt="clothing"
                />
                clothing
              </li>
              <li className="category-item">
                <img
                  src="/photo-header/category10.png" // <--- HERE INSERT YOUR IMAGE
                  alt="sport"
                />
                sport goods
              </li>
            </ul>
          </div>

          {/* Права колонка (підкатегорії) */}
          <div className="subcategories">
            <h3>Popular Electronics</h3>
            <div className="subcategory-grid">
              <div className="subcategory">
                <h4>Smartphones</h4>
                <ul>
                  <li>Apple iPhone</li>
                  <li>Samsung</li>
                  <li>Xiaomi</li>
                  <li>Nokia</li>
                  <li>Meizu</li>
                </ul>
              </div>

              <div className="subcategory">
                <h4>Accessories</h4>
                <ul>
                  <li>Accessory Kits</li>
                  <li>Batteries &amp; Battery Packs</li>
                  <li>Cables</li>
                  <li>Car Accessories</li>
                  <li>Charges &amp; Power Adapters</li>
                  <li>FM Transmitters</li>
                  <li>Repair Kits</li>
                  <li>Lens Attachments</li>
                  <li>Mounts &amp; Stands</li>
                  <li>Replacement Parts</li>
                </ul>
              </div>

              <div className="subcategory">
                <h4>Tablets</h4>
                <ul>
                  <li>Apple iPad</li>
                  <li>Android Tablets</li>
                  <li>Tablets with Keyboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
