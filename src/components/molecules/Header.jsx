import React, { useState } from "react";
import style from "../../styles/Header.module.css";

import logo from "../../assets/photo-header/logo.png";
import secondaryButton from "../../assets/photo-header/Secondary Button.png";
import iconFilter from "../../assets/photo-header/icon-filter.png";
import iconMoon from "../../assets/photo-header/Vector.png";
import iconHeart from "../../assets/photo-header/Vector-1.png";
import iconUser from "../../assets/photo-header/Icon.png";
import iconChat from "../../assets/photo-header/chat-118.png";

// Імпортуємо зображення категорій
import category1 from "../../assets/photo-header/category1.png";
import category2 from "../../assets/photo-header/category2.png";
import category3 from "../../assets/photo-header/category3.png";
import category4 from "../../assets/photo-header/category4.png";
import category5 from "../../assets/photo-header/category5.png";
import category6 from "../../assets/photo-header/category6.png";
import category7 from "../../assets/photo-header/category7.png";
import category8 from "../../assets/photo-header/category8.png";
import category9 from "../../assets/photo-header/category9.png";
import category10 from "../../assets/photo-header/category10.png";

function Header() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeCategory, setActiveCategory] = useState("electronics");

  const handleFilterClick = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleCategoryClick = (categoryKey) => {
    setActiveCategory(categoryKey);
  };

  const subcategories = {
    gamers: {
      title: "Gaming Products",
      data: [
        { title: "Consoles", items: ["PlayStation", "Xbox", "Nintendo Switch"] },
        { title: "Accessories", items: ["Gamepads", "Headsets", "Chairs"] },
      ],
    },
    electronics: {
      title: "Popular Electronics",
      data: [
        { title: "Smartphones", items: ["iPhone", "Samsung", "Xiaomi"] },
        { title: "Tablets", items: ["iPad", "Android Tablets"] },
      ],
    },
    children: {
      title: "Children's Goods",
      data: [
        { title: "Toys", items: ["Educational Toys", "Action Figures"] },
        { title: "Clothing", items: ["Boys", "Girls", "Baby"] },
      ],
    },
    business: {
      title: "Business Services",
      data: [
        { title: "Office", items: ["Printers", "Paper", "Furniture"] },
        { title: "Software", items: ["CRM", "Accounting", "Cloud"] },
      ],
    },
    animals: {
      title: "Animal Products",
      data: [
        { title: "For Dogs", items: ["Food", "Leashes", "Toys"] },
        { title: "For Cats", items: ["Litter Boxes", "Scratchers", "Treats"] },
      ],
    },
    transport: {
      title: "Transport & Spare Parts",
      data: [
        { title: "Cars", items: ["Tires", "Batteries", "Lights"] },
        { title: "Bikes", items: ["Helmets", "Pedals", "Chains"] },
      ],
    },
    furniture: {
      title: "Home Furniture",
      data: [
        { title: "Living Room", items: ["Sofas", "Tables", "TV Stands"] },
        { title: "Bedroom", items: ["Beds", "Wardrobes", "Nightstands"] },
      ],
    },
    realestate: {
      title: "Real Estate",
      data: [
        { title: "Residential", items: ["Apartments", "Houses"] },
        { title: "Commercial", items: ["Offices", "Warehouses"] },
      ],
    },
    clothing: {
      title: "Clothing",
      data: [
        { title: "Men", items: ["Jackets", "Jeans", "Shirts"] },
        { title: "Women", items: ["Dresses", "Skirts", "Blouses"] },
      ],
    },
    sport: {
      title: "Sport Goods",
      data: [
        { title: "Gym", items: ["Dumbbells", "Yoga Mats"] },
        { title: "Outdoor", items: ["Bikes", "Balls", "Skates"] },
      ],
    },
  };

  return (
    <header>
      <div className={style.BasicContent}>
        <a href="#">
          <img src={logo} alt="logo" className={style.logo_header} width="36" height="36" />
        </a>

        <div className={style.search_bar}>
          <input type="text" placeholder="Search the products" />
        </div>

        <div className={style.right_block}>
          <div className={style.discount_block}>
            <a href="#">
              <img src={secondaryButton} alt="discount" className={style.discount_button} />
            </a>
            <p>Only this month</p>
          </div>

          <div className={style.comunication}>
            <a href="#">
              <img src={iconMoon} alt="dark-theme" width="18" height="18" />
              {/* add here <i> (it's like a text) from fontawesome.com instead <img> */}
              {/* use <button> instead <a> ?? */}
              </a>
            <a href="#"><img src={iconHeart} alt="like" width="18" height="18" /></a>
            <a href="#"><img src={iconUser} alt="cabinet" width="18" height="18" /></a>
            <a href="#"><img src={iconChat} alt="chat" width="18" height="18" /></a>
          </div>
        </div>
      </div>

      <div className={style.nav_row}>
        <div className={style.goods}>
          <button className={style.filter} onClick={handleFilterClick}>
            <img src={iconFilter} alt="filter icon" width="18" height="18" />
            Filter <span className={style.arrow}>{openSidebar ? "▲" : "▼"}</span>
          </button>
          <a href="#">Best Sellers</a>
          <a href="#">Today’s Deals</a>
          <a href="#">New Arrivals</a>
          <a href="#">Gift Cards</a>
        </div>

        <div className={style.dropdowns}>
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

      {openSidebar && (
        <div className={style.sidebar_container}>
          <div className={style.sidebar}>
            <h3>Categories</h3>
            <ul className={style.categories_list}>
              <li className={style.category_item} onClick={() => handleCategoryClick("gamers")}>
                <img src={category1} alt="gamers" /> products for gamers
              </li>
              <li className={style.category_item} onClick={() => handleCategoryClick("electronics")}>
                <img src={category2} alt="electronic" /> electronic
              </li>
              <li className={style.category_item} onClick={() => handleCategoryClick("children")}>
                <img src={category3} alt="children" /> children's goods
              </li>
              <li className={style.category_item} onClick={() => handleCategoryClick("business")}>
                <img src={category4} alt="business" /> business services
              </li>
              <li className={style.category_item} onClick={() => handleCategoryClick("animals")}>
                <img src={category5} alt="animals" /> animals
              </li>
              <li className={style.category_item} onClick={() => handleCategoryClick("transport")}>
                <img src={category6} alt="transport" /> spare parts for transport
              </li>
              <li className={style.category_item} onClick={() => handleCategoryClick("furniture")}>
                <img src={category7} alt="furniture" /> furniture
              </li>
              <li className={style.category_item} onClick={() => handleCategoryClick("realestate")}>
                <img src={category8} alt="real-estate" /> real estate
              </li>
              <li className={style.category_item} onClick={() => handleCategoryClick("clothing")}>
                <img src={category9} alt="clothing" /> clothing
              </li>
              <li className={style.category_item} onClick={() => handleCategoryClick("sport")}>
                <img src={category10} alt="sport" /> sport goods
              </li>
            </ul>
          </div>

          <div className={style.subcategories}>
            <h3>{subcategories[activeCategory].title}</h3>
            <div className={style.subcategory_grid}>
              {subcategories[activeCategory].data.map((group, index) => (
                <div className={style.subcategory} key={index}>
                  <h4>{group.title}</h4>
                  <ul>
                    {group.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
