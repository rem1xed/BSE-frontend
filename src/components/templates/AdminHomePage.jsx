import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import styles from '../../styles/AdminHomePage.module.css';

const AdminHomePage = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [activeTab, setActiveTab] = useState('home');
    const [visiblePanel, setVisiblePanel] = useState(null);

    useEffect(() => {
        if (activeTab === 'home' && chartRef.current) {
            if (chartInstance.current) chartInstance.current.destroy();

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
                    datasets: [
                        {
                            label: 'Кількість скарг',
                            data: [4, 6, 3, 7, 5, 8, 2],
                            borderColor: '#007bff',
                            backgroundColor: 'rgba(0,123,255,0.1)',
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { stepSize: 2 },
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstance.current) chartInstance.current.destroy();
        };
    }, [activeTab]);

    const togglePanel = (id) => {
        setVisiblePanel((prev) => (prev === id ? null : id));
    };

    const renderTabButton = (label, tabId, icon) => (
        <button
            className={`${styles.tab_btn} ${activeTab === tabId ? styles.active : ''}`}
            onClick={() => setActiveTab(tabId)}
        >
            {icon} {label}
        </button>
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
                <h2>Адмін</h2>
                {renderTabButton('Головна', 'home', '🏠')}
                {renderTabButton('Статистика', 'stats', '📊')}
                {renderTabButton('Користувачі', 'users', '👤')}
                {renderTabButton('Оголошення', 'ads', '📦')}
                {renderTabButton('Скарги', 'complaints', '🚨')}
            </div>

            <div className={styles.main_conteiner}>
                {/* Головна */}
                {activeTab === 'home' && (
                    <section className={styles.active}>
                        <header className={styles.header}>
                            <h1>Адмін-Панель BSE — Головна</h1>
                        </header>
                        <div className={styles.container}>
                            <div className={styles.stats_grid}>
                                {[
                                    ['Скарг загалом', '154'],
                                    ['Скарг вирішено', '92'],
                                    ['Скарг за сьогодні', '7'],
                                    ['Активні оголошення', '1 247'],
                                    ['Заблоковані оголошення', '143'],
                                    ['Користувачів всього', '4 582'],
                                    ['Заблокованих користувачів', '37'],
                                ].map(([label, value]) => (
                                    <div className={styles.stat_card} key={label}>
                                        <h3>{label}</h3>
                                        <p>{value}</p>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.chart_block}>
                                <h2>Динаміка скарг за останній тиждень</h2>
                                <canvas ref={chartRef}></canvas>
                            </div>
                        </div>
                    </section>
                )}

                {/* Статистика */}
                {activeTab === 'stats' && (
                    <section className={styles.section}>
                        <header className={styles.header}>
                            <h1>Статистика</h1>
                        </header>
                        <ul>
                            <li>Загалом скарг: 102</li>
                            <li>Вирішено: 87</li>
                            <li>Активних користувачів: 5 412</li>
                            <li>Оголошень сьогодні: 120</li>
                        </ul>
                    </section>
                )}

                {/* Користувачі */}
                {activeTab === 'users' && (
                    <section className={styles.section}>
                        <header className={styles.header}>
                            <h1>Користувачі</h1>
                        </header>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Логін</th>
                                    <th>Email</th>
                                    <th>Статус</th>
                                    <th>Дата</th>
                                    <th>Дії</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>101</td>
                                    <td>andrii_k</td>
                                    <td>andrii@email.com</td>
                                    <td>Активний</td>
                                    <td>2023-12-01</td>
                                    <td><button className={styles.btn}>Переглянути</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                )}

                {/* Оголошення */}
                {activeTab === 'ads' && (
                    <section className={styles.section}>
                        <header className={styles.header}>
                            <h1>Оголошення</h1>
                        </header>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Назва</th>
                                    <th>Користувач</th>
                                    <th>Статус</th>
                                    <th>Дата</th>
                                    <th>Дії</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2001</td>
                                    <td>Продам велосипед</td>
                                    <td>andrii_k</td>
                                    <td>Активне</td>
                                    <td>2024-11-02</td>
                                    <td>
                                        <button className={styles.btn} onClick={() => togglePanel('adView')}>
                                            Переглянути
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {visiblePanel === 'adView' && (
                            <div className={styles.panel_view}>
                                <h3>Оголошення</h3>
                                <p><strong>ID:</strong> 2001</p>
                                <p><strong>Назва:</strong> Продам велосипед</p>
                                <p><strong>Користувач:</strong> andrii_k</p>
                                <div className={styles.actions}>
                                    <button className={styles.btn}>Схвалити</button>
                                    <button className={styles.btn}>Заблокувати</button>
                                    <button className={styles.btn} onClick={() => togglePanel(null)}>Назад</button>
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* Скарги */}
                {activeTab === 'complaints' && (
                    <section className={styles.section}>
                        <header className={styles.header}>
                            <h1>Скарги</h1>
                        </header>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Від кого</th>
                                    <th>На кого</th>
                                    <th>Причина</th>
                                    <th>Статус</th>
                                    <th>Дії</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>501</td>
                                    <td>id:101<br />andrii_k</td>
                                    <td>id:102<br />marina12</td>
                                    <td>Шахрайство</td>
                                    <td><span className={`${styles.badge} ${styles.pending}`}>Очікує</span></td>
                                    <td>
                                        <button className={styles.btn} onClick={() => togglePanel('compView')}>
                                            Переглянути
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {visiblePanel === 'compView' && (
                            <div className={styles.panel_view}>
                                <h3>Скарга</h3>
                                <p><strong>ID:</strong> 501</p>
                                <p><strong>Від:</strong> andrii_k (id:101)</p>
                                <p><strong>На:</strong> marina12 (id:102)</p>
                                <p><strong>Причина:</strong> Шахрайство</p>
                                <p><strong>Опис:</strong> Користувач не надіслав товар після оплати.</p>
                                <div className={styles.actions}>
                                    <button className={styles.btn}>Позначити як виконане</button>
                                    <button className={styles.btn}>Архівувати</button>
                                    <button className={styles.btn} onClick={() => togglePanel(null)}>Назад</button>
                                </div>
                            </div>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
};

export default AdminHomePage;
