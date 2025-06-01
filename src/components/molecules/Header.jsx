import React, { useState, useRef, useEffect } from "react";

import style from "../../styles/Header.module.css";

import iconFilter from "../../assets/photo-header/icon-filter.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faHeart, faUser } from "@fortawesome/free-regular-svg-icons"; // regular
import { faLaptop, faMobileScreen, faBabyCarriage, faSuitcase, faDog, faCouch, faScrewdriverWrench, faKey, faShirt, faVolleyball } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// або для деяких з них — solid:
import { faUser as faUserSolid, faHeart as faHeartSolid, faComments as faCommentsSolid } from "@fortawesome/free-solid-svg-icons";
import { authService } from "../../api/authService";


function Header() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); 
  const [isSidebarFadingOut, setIsSidebarFadingOut] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("electronics");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);
  const [isUserMenuMobileOpen, setIsUserMenuMobileOpen] = useState(false);
  const userMenuMobileRef = useRef(null);
  const [isUser, setIsUser] = useState({
    firstName: ''
  }); 

  useEffect(() => {
  const loadUser = async () => {
    if (authService.isUserAuthenticated()) {
      try {
        const user = await authService.getUser();
        setIsUser({
          firstName: user.firstName
        });
        console.log("User loaded:", user);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    }
  };

  loadUser();
}, []);

  
  const handleFilterClick = () => {
    if (isSidebarVisible && !isSidebarFadingOut) {
      // Закриваємо з fadeOut
      setIsSidebarFadingOut(true);
      setTimeout(() => {
        setIsSidebarVisible(false);
        setIsSidebarFadingOut(false);
      }, 300); // тривалість fadeOut у CSS
    } else if (!isSidebarVisible) {
      // Відкриваємо з fadeIn
      setIsSidebarVisible(true);
    }
  };
  
  useEffect(() => {
    function handleClickOutside(event) {
      console.log("clicked:", event.target);
      console.log(
        "insideMenu?", userMenuRef.current?.contains(event.target),
        "insideBtn?", userButtonRef.current?.contains(event.target)
      );
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  

  useEffect(() => {
    function handleClickOutsideMobile(event) {
      if (userMenuMobileRef.current && !userMenuMobileRef.current.contains(event.target)) {
        setIsUserMenuMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideMobile);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMobile);
    };
  }, []);
  
  
  
  const navigate = useNavigate();
  
  const goToAccount = () => {
    navigate("/account");
    setIsUserMenuOpen(false);
  };
  const toggleUserMenuMobile = () => {
    setIsUserMenuMobileOpen(prev => !prev);
  };
  
  const handleCategoryClick = (categoryKey) => {
    setActiveCategory(categoryKey);
  };

    
    const toggleTheme = () => {
          setIsDarkTheme(!isDarkTheme);
    const html = document.body;
    const current = html.classList.contains('dark') ? 'light' : 'dark';
    html.className = current;
  
    window.dispatchEvent(new CustomEvent('themeChange', { detail: current }));
  };
  
  
  const toggleUserMenu = () => {
    setIsUserMenuOpen(prev => !prev);
  };

  const toggleBurger = () => {
    setIsBurgerOpen(!isBurgerOpen);
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
    <header className={isDarkTheme ? style.darkTheme : ""}>

      <div className={style.mobile_header}>

      <div className={style.phone_left_mobile}>
      <div className={style.burger} onClick={toggleBurger}>
        <div className={`${style.line} ${isBurgerOpen ? style.openTop : ""}`}></div>
        <div className={`${style.line} ${isBurgerOpen ? style.openMiddle : ""}`}></div>
        <div className={`${style.line} ${isBurgerOpen ? style.openBottom : ""}`}></div>
      </div>
      <a onClick={() => {navigate('/')}} className={style.logo_header_mobile}>BSE</a>
      </div>
        {isBurgerOpen && (
            <div className={`${style.burgerMenu} ${style.fadeIn}`}>
          <button className={style.filter_mobile} onClick={handleFilterClick}>
            <img src={iconFilter} alt="filter icon" width="18" height="18" />
            Filter 
            </button>
            <button onClick={() => {navigate('/add')}} className={style.burger_item}>Create advertisement</button>

            <a className={style.burger_item}>New Arrivals</a>
            <a className={style.burger_item}>Best Sellers</a>
            <a className={style.burger_item}>Today’s Deals</a>
            <a className={style.burger_item}>Gift Cards</a>
            </div>
      )}
        <div className={style.phone_right_mobile} style={{ position: "relative" }}>
  <button onClick={toggleTheme} className={style.iconButton_mob}>
    <FontAwesomeIcon icon={faMoon} className={style.icon_com_mob_btn} />
  </button>

  <button className={style.iconButton_mob}><FontAwesomeIcon icon={faHeart} className={style.icon_com_mob} /></button>

  <button onClick={toggleUserMenuMobile} className={style.iconButton_mob}>
    <FontAwesomeIcon icon={isUser ? faUserSolid : faUser} className={style.icon_com_mob_btn} />
  </button>

  {isUserMenuMobileOpen && (
    <div ref={userMenuMobileRef} className={`${style.userMenuMobile} ${style.fadeIn}`}>
      {isUser ? (
        <>
          <div
            className={style.userMenuHeader}
            onClick={() => {
              goToAccount();
              setIsUserMenuMobileOpen(false);
            }}
          >
            {isUser}Welcome back, {isUser.firstName}
          </div>
          <button
            onClick={() => {
              authService.logout();
              setIsUserMenuMobileOpen(false);
            }}
            className={style.userMenuButton}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <div className={style.userMenuHeader}>
            <FontAwesomeIcon icon={faUser} /> Not signed In
          </div>
          <ul className={style.userMenuList}>
            <li className={style.userMenuListItem}>
              <Link to="/login" className={style.userMenuLink} onClick={() => setIsUserMenuMobileOpen(false)}>
                Sign In
              </Link>
            </li>
            <li className={style.userMenuListItem}>
              <Link to="/register" className={style.userMenuLink} onClick={() => setIsUserMenuMobileOpen(false)}>
                Sign Up
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  )}
</div>

      </div>

      <div className={style.BasicContent}>
        <a onClick={() => {navigate('/')}} className={style.logo}>BSE
        </a>

        <div className={style.dropdown_button_container}>
            <button className={style.filter} onClick={handleFilterClick}>
              <img src={iconFilter}  alt="filter icon" width="18" height="18" />
              Categories <span className={style.arrow}>{openSidebar ? "^" : "v"}</span>
            </button>
          </div>

          <div className={style.search_bar}>
            <input type="text" placeholder="Search the products" />
        </div>
        
        <button onClick={() => {navigate('/add')}} className={style.filter}>Create advertisement</button>
          <div className={style.dropdowns}>
            <select>
              <option value={"ENG"}>Eng</option>
              <option value={"UKR"}>Ukr</option>
            </select>
            <select>
              <option value={"UAH"}>UAH (₴)</option>
              <option value={"USD"}>USD ($)</option>
              <option value={"EUR"}>EUR (€)</option>
            </select>
          </div>
          <div className={style.comunication} style={{ position: "relative" }}>
  <button onClick={toggleTheme} className={style.iconButton}>
    <FontAwesomeIcon icon={faMoon} className={style.icon_com} />
  </button>
  <button className={style.iconButton}>
    <FontAwesomeIcon icon={faHeart} className={style.icon_com} />
  </button>

  <button
         ref={userButtonRef}
         onClick={toggleUserMenu}
         className={style.iconButton}
         aria-expanded={isUserMenuOpen}
       >
    <FontAwesomeIcon icon={isUser ? faUserSolid : faUser} className={style.icon_com} />
  </button>

  {/* Меню користувача */}
  {isUserMenuOpen && (
  <div ref={userMenuRef} className={`${style.userMenu} ${style.fadeIn}`}>
    {isUser ? (
      <>
        <div
          className={style.userMenuHeader}
          onClick={goToAccount}
        >
          Welcome back, {isUser.firstName}
        </div>
        <button
          onClick={() => {authService.logout()}}
          className={style.userMenuButton}
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <div className={style.userMenuHeader}>
          <FontAwesomeIcon icon={faUser} /> Not signed In
        </div>
        <ul className={style.userMenuList}>
          <li className={style.userMenuListItem}>
            <Link to="/login" className={style.userMenuLink} onClick={() => setIsUserMenuOpen(false)}>
              Sign In
            </Link>
          </li>
          <li className={style.userMenuListItem}>
            <Link to="/register" className={style.userMenuLink} onClick={() => setIsUserMenuOpen(false)}>
              Sign Up
            </Link>
          </li>
        </ul>
      </>
    )}
  </div>
)}

</div>

          
        </div>

        {isSidebarVisible && (
          <div className={`${style.sidebar_container} ${isSidebarFadingOut ? style.fadeOut : style.fadeIn}`}>
            <div className={style.sidebar}>
              <h3>Categories</h3>
              <ul className={style.categories_list}>
                <li className={style.category_item} onClick={() => handleCategoryClick("gamers")}>
                <FontAwesomeIcon icon={faLaptop} /> products for gamers
                </li>
                <li className={style.category_item} onClick={() => handleCategoryClick("electronics")}>
                <FontAwesomeIcon icon={faMobileScreen} /> electronic
                </li>
                <li className={style.category_item} onClick={() => handleCategoryClick("children")}>
                <FontAwesomeIcon icon={faBabyCarriage} /> children's goods
                </li>
                <li className={style.category_item} onClick={() => handleCategoryClick("business")}>
                <FontAwesomeIcon icon={faSuitcase} /> business services
                </li>
                <li className={style.category_item} onClick={() => handleCategoryClick("animals")}>
                <FontAwesomeIcon icon={faDog} /> animals
                </li>
                <li className={style.category_item} onClick={() => handleCategoryClick("transport")}>
                <FontAwesomeIcon icon={faScrewdriverWrench} /> spare parts for transport
                </li>
                <li className={style.category_item} onClick={() => handleCategoryClick("furniture")}>
                <FontAwesomeIcon icon={faCouch} /> furniture
                </li>
                <li className={style.category_item} onClick={() => handleCategoryClick("realestate")}>
                <FontAwesomeIcon icon={faKey} /> real estate
                </li>
                <li className={style.category_item} onClick={() => handleCategoryClick("clothing")}>
                <FontAwesomeIcon icon={faShirt} /> clothing
                </li>
                <li className={style.category_item} onClick={() => handleCategoryClick("sport")}>
                <FontAwesomeIcon icon={faVolleyball} /> sport goods
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
