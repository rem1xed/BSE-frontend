import styles from "../../styles/RegistrationPage.module.css";
import Input from "../atoms/Input";

export default function RegistrationPage() {
  return (
    <div className={styles.container}>
        <div className={styles.upper_inner_container}>
            <h1>Register</h1>
        </div>

        <div className={styles.lower_inner_container}>

            <div className={styles.left_container}>

                <div className={styles.input_container}>
                    <label htmlFor="user_email">Email Address:</label>
                    <Input type="email" name="user_email"/>
                </div>

                <div className={styles.input_container}>
                    <label htmlFor="user_name">Your name:</label>
                    <Input type="text" name="user_name"/>
                </div>

                <div className={styles.input_container}>
                    <label htmlFor="user_pass">Password:</label>
                    <Input type="password" name="user_pass"/>
                </div>

                <div className={styles.input_container}>
                    <label htmlFor="user_tel">Phone number:</label>
                    <Input type="tel" name="user_tel"/>
                </div>

                <div className={styles.button_container}>
                    <button type="submit">Register</button>
                </div>
              
            </div>

          <div className={styles.right_container}>
            <div className={styles.inner_container}>
                <h2>Have an account?</h2>
                <button type="submit">Sign In</button>
            </div>
          </div>
        </div>
    </div>
  );
}