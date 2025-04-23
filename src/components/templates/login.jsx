import classes from '../../styles/Login.module.css'

const App = () => {
  return (
    <div className={classes.login_container}>
      <div className={classes.navigation}>
        <h1>Home</h1>
        <h1>&rarr;</h1>
        <h1>Login</h1>
      </div>
      <div className={classes.divForNewCust}>
        <h1>New Customer?</h1>
        <p>Sign in</p>
      </div>
      <div className={classes.registration}>
        <div className={classes.alighElRegist}>
          <h1 className={classes.h1InReg}>Email address</h1>
          <p className={classes.zirochkaRed}>*</p>
          <input
            placeholder="Write your Email"
            type="text"
            name="text"
            className="input"
          />
        </div>
        <div>
          <h1 className={classes.h1InReg}>Phone Number</h1>
          <p className={classes.zirochkaRed}>*</p>
          <br />
          <input
            placeholder="Write your Phone Number"
            type="text"
            name="text"
            className="input"
          />

          <div>
            <button className={classes.leftSideInLoginEl}>Button</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default App
