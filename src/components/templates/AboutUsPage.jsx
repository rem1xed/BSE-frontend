import React from 'react';
import classes from '../../styles/AboutUsPage.module.css';

function AboutUsPage() {
    return (
        <div className={classes.main_cont}>
            <div className={classes.up_info}>
                <h1>About BSE</h1>
                <img 
                    src="https://via.placeholder.com/300x200.png?text=BSE+Platform" 
                    alt="BSE team photo" 
                    className={classes.photo} 
                />
                <h2>BSE - онлайн платформа оголошень</h2>
                <h3 className={classes.slogan}>Buy, Sell, Enjoy</h3>
                <p>
                    <strong>BSE</strong> – це сучасна онлайн-платформа для розміщення оголошень про продаж нових і вживаних речей, яка стане корисною як для підприємців, так і для приватних осіб. 
                    Мінімалістичний дизайн, зручна система фільтрації та прозора взаємодія між продавцем і покупцем роблять користування платформою простим та комфортним. 
                    Окрім основного функціоналу, передбачена можливість отримання бонусів, які можна використовувати для просування оголошень чи отримання знижок. 
                    Також доступна інтеграція з Google Meet для швидкої організації відеодзвінків, а для додаткової безпеки передбачено функцію запису розмови, 
                    що дозволяє зберігати важливі деталі угод.
                </p>
            </div>

            <div className={classes.team_section}>
                <h2>Команда проєкту</h2>
                <p><strong>Капітан команди:</strong> Віталій Струтинський — також Fullstack розробник</p>
                <h3>Члени команди:</h3>
                <ul>
                    <li><strong>Нерідний Тарас</strong> — відповідальний за бази даних та backend частину</li>
                    <li><strong>Липко Михайло</strong> — відповідальний за DevOps та backend частину</li>
                    <li><strong>Думас Роман</strong> — відповідальний frontend частину</li>
                    <li><strong>Магоцький Орест</strong> — відповідальний за frontend та дизайн</li>
                    <li><strong>Огоновський Роман</strong> — відповідальний за frontend частину</li>
                    <li><strong>Гулечко Юрій</strong> — відповідальний за тестування</li>
                </ul>
            </div>
        </div>
    );
}

export default AboutUsPage;
