import style from '../../styles/AddPage.module.css'
import Button from '../atoms/Button'

function AddPage() {
  return (
    <div className={style.main_container}>
      <nav className={style.breadcrumb_navigation}>
        <span>Home</span>
        <span>&rarr;</span>
        <span>add</span>
      </nav>

      <div className={style.page_content}>
        <div className={style.image_wrapper}>
          <div className={style.arrow_left}>
            <div className={style.arrow_top_left}></div>
            <div className={style.arrow_bottom_left}></div>
          </div>
          <img
            src="https://ireland.apollo.olxcdn.com/v1/files/6ykrm4qorqzz2-UA/image"
            alt="Tablet"
          />
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
            </div>
            <Button children={"Message"} />
          </div>

          <div className={style.user_information}>
            <p className={style.user_title}>User</p>

            <div className={style.user_profile}>
              <p className={style.user_name}>
                <i className="fa-solid fa-user"></i>
                Anton
              </p>
            </div>

            <hr />

            <p className={style.user_ads}>All user's advertisements</p>
          </div>
        </div>
      </div>
      
      <div className={style.product_description}>
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