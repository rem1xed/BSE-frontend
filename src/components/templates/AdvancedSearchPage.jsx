import React from "react";
import classes from "../../styles/AdvancedSearchPage.module.css";

function AdvancedSearchPage() {
  return (
    <main className={classes.advanced_search_page}>
      <div className={classes.search_card}>
        <h2 className={classes.search_title}> Розширений Пошук</h2>

        <p className={classes.search_description}>
          Наш розширений пошук допоможе вам швидше знайти потрібний товар. Використовуйте різноманітні фільтри, щоб отримати максимально точні результати.
        </p>

        <div className={classes.search_section}>
          <h3 className={classes.section_title}> Категорії</h3>
          <p>
            Ви можете обрати категорії товарів, що вас цікавлять: електроніка, одяг, побутова техніка, книги, іграшки та багато іншого.
          </p>
        </div>

        <div className={classes.search_section}>
          <h3 className={classes.section_title}> Ціна</h3>
          <p>
            Задайте діапазон ціни, щоб бачити лише ті товари, які відповідають вашому бюджету. Наприклад, від 200 до 1000 грн.
          </p>
        </div>

        <div className={classes.search_section}>
          <h3 className={classes.section_title}> Рейтинг</h3>
          <p>
            Обирайте лише товари з хорошими відгуками. Ви можете відфільтрувати товари з рейтингом від 4 зірок і вище.
          </p>
        </div>

        <div className={classes.search_section}>
          <h3 className={classes.section_title}> Розташування</h3>
          <p>
            Пошукайте товари поблизу вас. Оберіть місто чи регіон, де ви хочете знайти товар.
          </p>
        </div>

        <div className={classes.search_section}>
          <h3 className={classes.section_title}> Стан товару</h3>
          <p>
            Вас цікавлять лише нові речі чи вживані? Оберіть відповідний параметр і ми покажемо тільки релевантні пропозиції.
          </p>
        </div>

        <div className={classes.search_section}>
          <h3 className={classes.section_title}> Параметри таргетингу</h3>
          <p>
            Алгоритми таргетингу допоможуть вам знайти товари, які відповідають вашим інтересам. Вони враховують ваші попередні пошуки та покупки.
          </p>
        </div>

        <p className={classes.search_thanks}>
          Вдосконалена система пошуку — ваш помічник у світі покупок. Скористайтесь нею вже зараз і переконайтесь у її зручності!
        </p>
      </div>
    </main>
  );
}

export default AdvancedSearchPage;
