import classes from '../../styles/addPage.module.css'

function AddPage() {
  return (
    <div className={classes.main_container}>
      <nav className={classes.breadcrumb_navigation}>
        <span>Home</span>
        <span>&rarr;</span>
        <span>add</span>
      </nav>

      <div className={classes.page_content}>
        <div className={classes.image_wrapper}>
          <div className={classes.arrow_left}>
            <div className={classes.arrow_top_left}></div>
            <div className={classes.arrow_bottom_left}></div>
          </div>
          <img
            src="https://ireland.apollo.olxcdn.com/v1/files/6ykrm4qorqzz2-UA/image"
            alt="Tablet"
          />
          <div className={classes.arrow_right}>
            <div className={classes.arrow_top_right}></div>
            <div className={classes.arrow_bottom_right}></div>
          </div>
        </div>

        <div className={classes.product_details}>
          <div className={classes.product_info}>
            <div className={classes.product_text}>
              <p className={classes.product_location}>
                London, Carlron vale – 02.01.2025
              </p>
              <h2 className={classes.product_title}>
                Lenovo Tab M11 with Pen 15.6 MULTITOUCH All-In-On
              </h2>
              <p className={classes.product_price}>599$</p>
            </div>
            <button>Message</button>
          </div>

          <div className={classes.user_information}>
            <p className={classes.user_title}>User</p>

            <div className={classes.user_profile}>
              <img
                src="https://static-00.iconduck.com/assets.00/user-icon-470x512-joawnpv1.png"
                alt=""
                className={classes.user_profile_image}
              />
              <p className={classes.user_name}>Anton</p>
            </div>

            <hr />

            <p className={classes.user_ads}>All user's add</p>
          </div>
        </div>
      </div>
      <div className={classes.product_description}>
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
