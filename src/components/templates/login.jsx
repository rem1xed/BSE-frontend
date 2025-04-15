import '../../styles/Login.css'

const App = () => {
  return (
    <div className="login-container">
      <div className="navigation">
        <h1>Home</h1>
        <h1>&rarr;</h1>
        <h1>Login</h1>
      </div>
      <div className="divForNewCust">
        <h1>New Customer?</h1>
        <p>Sign in</p>
      </div>
      <div className="registration">
        <div className="alighElRegist">
          <h1 className="h1InReg">Email address</h1>
          <p className="zirochkaRed">*</p>
          <input
            placeholder="Write your Email"
            type="text"
            name="text"
            className="input"
          />
        </div>
        <div>
          <h1 className="h1InReg">Phone Number</h1>
          <p className="zirochkaRed">*</p>
          <br />
          <input
            placeholder="Write your Phone Number"
            type="text"
            name="text"
            className="input"
          />

          <div>
            <button className="leftSideInLoginEl">Button</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
