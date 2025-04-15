import './AddPage.css'

function AddPage() {
  return (
    <div className="main-container">
      <nav className="breadcrumb-navigation">
        <span>Home</span>
        <span>&rarr;</span>
        <span>add</span>
      </nav>

      <div className="page-content">
        <div className="image-wrapper">
          <div className="arrow-left">
            <div className="arrow-top-left"></div>
            <div className="arrow-bottom-left"></div>
          </div>
          <img
            src="https://ireland.apollo.olxcdn.com/v1/files/6ykrm4qorqzz2-UA/image"
            alt="Tablet"
          />
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
            </div>
            <button>Message</button>
          </div>

          <div className="user-information">
            <p className="user-title">User</p>

            <div className="user-profile">
              <img
                src="https://static-00.iconduck.com/assets.00/user-icon-470x512-joawnpv1.png"
                alt=""
                className="user-profile-image"
              />
              <p className="user-name">Anton</p>
            </div>

            <hr />

            <p className="user-ads">All user's add</p>
          </div>
        </div>
      </div>
      <div className="product-description">
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
