<<<<<<< HEAD
import style from '../../styles/AddPage.module.css'

function AddPage() {
  return (
    <div className={style.main_container}>
      <nav className={style.breadcrumb_navigation}>
=======
import './AddPage.css'

function AddPage() {
  return (
    <div className="main-container">
      <nav className="breadcrumb-navigation">
>>>>>>> develop
        <span>Home</span>
        <span>&rarr;</span>
        <span>add</span>
      </nav>

<<<<<<< HEAD
      <div className={style.page_content}>
        <div className={style.image_wrapper}>
          <div className={style.arrow_left}>
            <div className={style.arrow_top_left}></div>
            <div className={style.arrow_bottom_left}></div>
=======
      <div className="page-content">
        <div className="image-wrapper">
          <div className="arrow-left">
            <div className="arrow-top-left"></div>
            <div className="arrow-bottom-left"></div>
>>>>>>> develop
          </div>
          <img
            src="https://ireland.apollo.olxcdn.com/v1/files/6ykrm4qorqzz2-UA/image"
            alt="Tablet"
          />
<<<<<<< HEAD
          <div className={style.arrow_right}>
            <div className={style.arrow_top_right}></div>
            <div className={style.arrow_bottom_right}></div>
          </div>
        </div>

        <div className={style.product_details}>
          <div className={style.product_info}>
            <div className={style.product_text}>
              <p className={style.product_location}>
                London, Carlron vale – 02.01.2025
              </p>
              <h2 className={style.product_title}>
                Lenovo Tab M11 with Pen 15.6 MULTITOUCH All-In-On
              </h2>
              <p className={style.product_price}>599$</p>
=======
          <div className="arrow-right">
            <div className="arrow-top-right"></div>
            <div className="arrow-bottom-right"></div>
          </div>
        </div>

        <div className="product-details">
          <div className="product-info">
            <div className="product-text">
              <p className="product-location">
                London, Carlron vale – 02.01.2025
              </p>
              <h2 className="product-title">
                Lenovo Tab M11 with Pen 15.6 MULTITOUCH All-In-On
              </h2>
              <p className="product-price">599$</p>
>>>>>>> develop
            </div>
            <button>Message</button>
          </div>

<<<<<<< HEAD
          <div className={style.user_information}>
            <p className={style.user_title}>User</p>

            <div className={style.user_profile}>
              <img
                src="https://static-00.iconduck.com/assets.00/user-icon-470x512-joawnpv1.png"
                alt=""
                className={style.user_profile_image}
              />
              <p className={style.user_name}>Anton</p>
=======
          <div className="user-information">
            <p className="user-title">User</p>

            <div className="user-profile">
              <img
                src="https://static-00.iconduck.com/assets.00/user-icon-470x512-joawnpv1.png"
                alt=""
                className="user-profile-image"
              />
              <p className="user-name">Anton</p>
>>>>>>> develop
            </div>

            <hr />

<<<<<<< HEAD
            <p className={style.user_ads}>All user's add</p>
          </div>
        </div>
      </div>
      <div className={style.product_description}>
=======
            <p className="user-ads">All user's add</p>
          </div>
        </div>
      </div>
      <div className="product-description">
>>>>>>> develop
        <h1>product description</h1>
        <p>
          Tablet in excellent condition, perfect for study, work, or
          entertainment – includes charger and works flawlessly.
        </p>
      </div>
    </div>
  )
}

export default AddPage
