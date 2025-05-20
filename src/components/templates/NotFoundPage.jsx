import style from  "../../styles/NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <main className={style.not_found_container}>
      <div className={style.glass_card}>
        <h1>404 Page not found.</h1>
        <h3>Try to check the link or go to <a className={style.home_link} href="/">main page</a></h3>
      </div>
    </main>
  );
}