import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import styles from '../../styles/AdminHomePage.module.css';
import { getFormData } from '../../api/contactForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
    faHouse, 
    faUser, 
    faBox, 
    faExclamationTriangle, 
    faQuestion 
} from '@fortawesome/free-solid-svg-icons';
import { getAllUsers } from '../../api/authService';

library.add(faHouse, faUser, faBox, faExclamationTriangle, faQuestion);

const AdminHomePage = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [activeTab, setActiveTab] = useState('home');
    const [visiblePanel, setVisiblePanel] = useState(null);
    
    // States для різних даних
    const [users, setUsers] = useState([]);
    const [ads, setAds] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);

    // Дані за замовчуванням (можна видалити після підключення API)
    const defaultStats = {
        totalComplaints: 154,
        resolvedComplaints: 92,
        todayComplaints: 7,
        activeAds: 1247,
        blockedAds: 143,
        totalUsers: 4582,
        blockedUsers: 37,
    };

    const weeklyComplaintsData = [4, 6, 3, 7, 5, 8, 2];
    const weeklyLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

    // ============= КОРИСТУВАЧІ =============
    
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getAllUsers();
            console.log('Response users:', response);
            
            // Адаптуємо дані з response.data
            const usersData = response.data.map(user => ({
                id: user.id,
                username: `${user.firstName} ${user.lastName}`, 
                email: user.email,
                phone: user.phone, // Адаптуйте під вашу логіку
                createdAt: user.createdAt
            }));
            
            setUsers(usersData);
            
        } catch (error) {
            console.error('Помилка завантаження користувачів:', error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const viewUser = (userId) => {
        console.log('Переглянути користувача:', userId);
        // Додайте вашу логіку
    };

    const blockUser = async (userId) => {
        try {
            // await api.post(`/admin/users/${userId}/block`);
            console.log('Заблокувати користувача:', userId);
            // Оновити список користувачів
            fetchUsers();
        } catch (error) {
            console.error('Помилка блокування користувача:', error);
        }
    };

    const unblockUser = async (userId) => {
        try {
            // await api.post(`/admin/users/${userId}/unblock`);
            console.log('Розблокувати користувача:', userId);
            fetchUsers();
        } catch (error) {
            console.error('Помилка розблокування користувача:', error);
        }
    };

    // ============= ОГОЛОШЕННЯ =============
    const fetchAds = async () => {
        setLoading(true);
        try {
            // const response = await api.get('/admin/ads');
            // setAds(response.data);
            
            setAds([
                { id: 2001, title: 'Продам велосипед', username: 'andrii_k', status: 'Активне', createdAt: '2024-11-02' },
                { id: 2002, title: 'Куплю ноутбук', username: 'marina12', status: 'На модерації', createdAt: '2024-11-01' },
            ]);
        } catch (error) {
            console.error('Помилка завантаження оголошень:', error);
        } finally {
            setLoading(false);
        }
    };

    const viewAd = (adId) => {
        console.log('Переглянути оголошення:', adId);
        setVisiblePanel(`adView-${adId}`);
    };

    const approveAd = async (adId) => {
        try {
            // await api.post(`/admin/ads/${adId}/approve`);
            console.log('Схвалити оголошення:', adId);
            fetchAds();
            setVisiblePanel(null);
        } catch (error) {
            console.error('Помилка схвалення оголошення:', error);
        }
    };

    const rejectAd = async (adId) => {
        try {
            // await api.post(`/admin/ads/${adId}/reject`);
            console.log('Відхилити оголошення:', adId);
            fetchAds();
            setVisiblePanel(null);
        } catch (error) {
            console.error('Помилка відхилення оголошення:', error);
        }
    };

    const blockAd = async (adId) => {
        try {
            // await api.post(`/admin/ads/${adId}/block`);
            console.log('Заблокувати оголошення:', adId);
            fetchAds();
            setVisiblePanel(null);
        } catch (error) {
            console.error('Помилка блокування оголошення:', error);
        }
    };

    // ============= СКАРГИ =============
    const fetchComplaints = async () => {
        setLoading(true);
        try {
            // const response = await api.get('/admin/complaints');
            // setComplaints(response.data);
            
            setComplaints([
                { 
                    id: 501, 
                    fromUser: { id: 101, username: 'andrii_k' },
                    toUser: { id: 102, username: 'marina12' },
                    reason: 'Шахрайство',
                    description: 'Користувач не надіслав товар після оплати.',
                    status: 'Очікує',
                    createdAt: '2024-11-01'
                },
            ]);
        } catch (error) {
            console.error('Помилка завантаження скарг:', error);
        } finally {
            setLoading(false);
        }
    };

    const viewComplaint = (complaintId) => {
        console.log('Переглянути скаргу:', complaintId);
        setVisiblePanel(`complaintView-${complaintId}`);
    };

    const resolveComplaint = async (complaintId) => {
        try {
            // await api.post(`/admin/complaints/${complaintId}/resolve`);
            console.log('Вирішити скаргу:', complaintId);
            fetchComplaints();
            setVisiblePanel(null);
        } catch (error) {
            console.error('Помилка вирішення скарги:', error);
        }
    };

    const archiveComplaint = async (complaintId) => {
        try {
            // await api.post(`/admin/complaints/${complaintId}/archive`);
            console.log('Архівувати скаргу:', complaintId);
            fetchComplaints();
            setVisiblePanel(null);
        } catch (error) {
            console.error('Помилка архівування скарги:', error);
        }
    };

    // ============= ПИТАННЯ =============
    const fetchQuestions = async () => {
    setLoading(true);
    try {
        const response = await getFormData();
        console.log(response);
        
        // Перевіряємо чи є дані
        if (response.data && Array.isArray(response.data)) {
            // Трансформуємо дані з сервера до потрібного формату
            const transformedData = response.data.map(item => ({
                id: item.id,
                fromUser: { 
                    username: item.fullName, 
                    phone: item.phone, 
                    email: item.email 
                },
                subject: 'Питання з форми',
                message: item.problem,
                status: 'Нове',
                createdAt: new Date(item.createdAt).toLocaleDateString('uk-UA')
            }));
            
            setQuestions(transformedData);
        } else {
            setQuestions([]);
        }
        
    } catch (error) {
        console.error('Помилка завантаження питань:', error);
        setQuestions([]); // Встановлюємо порожній масив при помилці
    } finally {
        setLoading(false);
    }
};

    const viewQuestion = (questionId) => {
        console.log('Переглянути питання:', questionId);
        setVisiblePanel(`questionView-${questionId}`);
    };

    const answerQuestion = async (questionId, answer) => {
        try {
            // await api.post(`/admin/questions/${questionId}/answer`, { answer });
            console.log('Відповісти на питання:', questionId, answer);
            fetchQuestions();
            setVisiblePanel(null);
        } catch (error) {
            console.error('Помилка відповіді на питання:', error);
        }
    };

    const closeQuestion = async (questionId) => {
        try {
            // await api.post(`/admin/questions/${questionId}/close`);
            console.log('Закрити питання:', questionId);
            fetchQuestions();
            setVisiblePanel(null);
        } catch (error) {
            console.error('Помилка закриття питання:', error);
        }
    };

    // ============= СТАТИСТИКА =============
    const fetchStats = async () => {
        try {
            // const response = await api.get('/admin/stats');
            // setStats(response.data);
            
            setStats(defaultStats);
        } catch (error) {
            console.error('Помилка завантаження статистики:', error);
            setStats(defaultStats);
        }
    };

    // ============= EFFECTS =============
    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        switch (activeTab) {
            case 'users':
                fetchUsers();
                break;
            case 'ads':
                fetchAds();
                break;
            case 'complaints':
                fetchComplaints();
                break;
            case 'questions':
                fetchQuestions();
                break;
            default:
                break;
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 'home' && chartRef.current) {
            if (chartInstance.current) chartInstance.current.destroy();

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: weeklyLabels,
                    datasets: [
                        {
                            label: 'Кількість скарг',
                            data: weeklyComplaintsData,
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

    // ============= HELPER FUNCTIONS =============
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

    const getStatusBadge = (status) => {
        const statusClasses = {
            'Очікує': `${styles.badge} ${styles.pending}`,
            'Вирішено': `${styles.badge} ${styles.resolved}`,
            'Активний': `${styles.badge} ${styles.active}`,
            'Заблокований': `${styles.badge} ${styles.blocked}`,
            'На модерації': `${styles.badge} ${styles.pending}`,
        };
        return <span className={statusClasses[status] || styles.badge}>{status}</span>;
    };

    // ============= RENDER =============
    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
                <h2>Адмін</h2>
                {renderTabButton('Головна', 'home', <FontAwesomeIcon icon="fa-solid fa-house" />)}
                {renderTabButton('Користувачі', 'users', <FontAwesomeIcon icon="fa-solid fa-user" />)}
                {renderTabButton('Оголошення', 'ads', <FontAwesomeIcon icon="fa-solid fa-box" />)}
                {renderTabButton('Скарги', 'complaints', <FontAwesomeIcon icon="fa-solid fa-exclamation-triangle" />)}
                {renderTabButton('Питання', 'questions', <FontAwesomeIcon icon="fa-solid fa-question" />)}
            </div>

            <div className={styles.main_conteiner}>
                {loading && <div className={styles.loading}>Завантаження...</div>}

                {/* Головна */}
                {activeTab === 'home' && (
                    <section className={styles.active}>
                        <header className={styles.header}>
                            <h1>Адмін-Панель BSE — Головна</h1>
                        </header>
                        <div className={styles.container}>
                            <div className={styles.stats_grid}>
                                {[
                                    ['Скарг загалом', stats.totalComplaints],
                                    ['Скарг вирішено', stats.resolvedComplaints],
                                    ['Скарг за сьогодні', stats.todayComplaints],
                                    ['Активні оголошення', stats.activeAds],
                                    ['Заблоковані оголошення', stats.blockedAds],
                                    ['Користувачів всього', stats.totalUsers],
                                    ['Заблокованих користувачів', stats.blockedUsers],
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

                {/* Користувачі */}
                {activeTab === 'users' && (
                    <section className={styles.section}>
                        <header className={styles.header}>
                            <h1>Користувачі</h1>
                            <button className={styles.refresh_btn} onClick={fetchUsers}>
                                🔄 Оновити
                            </button>
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
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{getStatusBadge(user.status)}</td>
                                        <td>{user.createdAt}</td>
                                        <td>
                                            <button className={styles.btn} onClick={() => viewUser(user.id)}>
                                                Переглянути
                                            </button>
                                            {user.status === 'Активний' ? (
                                                <button className={styles.btn} style={{backgroundColor:"red"}} onClick={() => blockUser(user.id)}>
                                                    Заблокувати
                                                </button>
                                            ) : (
                                                <button className={styles.btn} style={{backgroundColor:"green"}} onClick={() => unblockUser(user.id)}>
                                                    Розблокувати
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}

                {/* Оголошення */}
                {activeTab === 'ads' && (
                    <section className={styles.section}>
                        <header className={styles.header}>
                            <h1>Оголошення</h1>
                            <button className={styles.refresh_btn} onClick={fetchAds}>
                                🔄 Оновити
                            </button>
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
                                {ads.map((ad) => (
                                    <tr key={ad.id}>
                                        <td>{ad.id}</td>
                                        <td>{ad.title}</td>
                                        <td>{ad.username}</td>
                                        <td>{getStatusBadge(ad.status)}</td>
                                        <td>{ad.createdAt}</td>
                                        <td>
                                            <button className={styles.btn} onClick={() => viewAd(ad.id)}>
                                                Переглянути
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Панель перегляду оголошення */}
                        {ads.map((ad) => 
                            visiblePanel === `adView-${ad.id}` && (
                                <div className={styles.panel_view} key={`panel-${ad.id}`}>
                                    <h3>Оголошення</h3>
                                    <p><strong>ID:</strong> {ad.id}</p>
                                    <p><strong>Назва:</strong> {ad.title}</p>
                                    <p><strong>Користувач:</strong> {ad.username}</p>
                                    <p><strong>Статус:</strong> {ad.status}</p>
                                    <div className={styles.actions}>
                                        <button className={styles.btn} style={{backgroundColor:"green"}} onClick={() => approveAd(ad.id)}>
                                            Схвалити
                                        </button>
                                        <button className={styles.btn} style={{backgroundColor:"#e8d300"}} onClick={() => rejectAd(ad.id)}>
                                            Відхилити
                                        </button>
                                        <button className={styles.btn} style={{backgroundColor:"red"}} onClick={() => blockAd(ad.id)}>
                                            Заблокувати
                                        </button>
                                        <button className={styles.btn} style={{backgroundColor:"#6c6a68"}} onClick={() => togglePanel(null)}>
                                            Назад
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </section>
                )}

                {/* Скарги */}
                {activeTab === 'complaints' && (
                    <section className={styles.section}>
                        <header className={styles.header}>
                            <h1>Скарги</h1>
                            <button className={styles.refresh_btn} onClick={fetchComplaints}>
                                🔄 Оновити
                            </button>
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
                                {complaints.map((complaint) => (
                                    <tr key={complaint.id}>
                                        <td>{complaint.id}</td>
                                        <td>
                                            id:{complaint.fromUser.id}<br />
                                            {complaint.fromUser.username}
                                        </td>
                                        <td>
                                            id:{complaint.toUser.id}<br />
                                            {complaint.toUser.username}
                                        </td>
                                        <td>{complaint.reason}</td>
                                        <td>{getStatusBadge(complaint.status)}</td>
                                        <td>
                                            <button className={styles.btn} onClick={() => viewComplaint(complaint.id)}>
                                                Переглянути
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Панель перегляду скарги */}
                        {complaints.map((complaint) => 
                            visiblePanel === `complaintView-${complaint.id}` && (
                                <div className={styles.panel_view} key={`panel-${complaint.id}`}>
                                    <h3>Скарга</h3>
                                    <p><strong>ID:</strong> {complaint.id}</p>
                                    <p><strong>Від:</strong> {complaint.fromUser.username} (id:{complaint.fromUser.id})</p>
                                    <p><strong>На:</strong> {complaint.toUser.username} (id:{complaint.toUser.id})</p>
                                    <p><strong>Причина:</strong> {complaint.reason}</p>
                                    <p><strong>Опис:</strong> {complaint.description}</p>
                                    <div className={styles.actions}>
                                        <button className={styles.btn} onClick={() => resolveComplaint(complaint.id)}>
                                            Позначити як вирішене
                                        </button>
                                        <button className={styles.btn} style={{backgroundColor:"#e8d300"}} onClick={() => archiveComplaint(complaint.id)}>
                                            Архівувати
                                        </button>
                                        <button className={styles.btn} style={{backgroundColor:"#6c6a68"}} onClick={() => togglePanel(null)}>
                                            Назад
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </section>
                )}

                {/* Питання */}
                {activeTab === 'questions' && (
                    <section className={styles.section}>
                        <header className={styles.header}>
                            <h1>Питання від користувачів</h1>
                            <button className={styles.refresh_btn} onClick={fetchQuestions}>
                                🔄 Оновити
                            </button>
                        </header>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Від кого</th>
                                    <th>Тема</th>
                                    <th>Статус</th>
                                    <th>Дата</th>
                                    <th>Дії</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((question) => (
                                    <tr key={question.id}>
                                        <td>{question.id}</td>
                                        <td>
                                            {question.fromUser.username}<br />
                                            <small>{question.fromUser.email}</small>
                                        </td>
                                        <td>{question.subject}</td>
                                        <td>{getStatusBadge(question.status)}</td>
                                        <td>{question.createdAt}</td>
                                        <td>
                                            <button className={styles.btn} onClick={() => viewQuestion(question.id)}>
                                                Переглянути
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Панель перегляду питання */}
                        {questions.map((question) => 
                            visiblePanel === `questionView-${question.id}` && (
                                <div className={styles.panel_view} key={`panel-${question.id}`}>
                                    <h3>Питання</h3>
                                    <p><strong>ID:</strong> {question.id}</p>
                                    <p><strong>Від:</strong> {question.fromUser.username}</p>
                                    <p><strong>Email:</strong> {question.fromUser.email}</p>
                                    <p><strong>Phone:</strong> {question.fromUser.phone}</p>
                                    <p><strong>Тема:</strong> {question.subject}</p>
                                    <p><strong>Повідомлення:</strong> {question.message}</p>
                                    <div className={styles.actions}>
                                        <button className={styles.btn} onClick={() => answerQuestion(question.id, 'Ваша відповідь...')}>
                                            Відповісти
                                        </button>
                                        <button className={styles.btn} style={{backgroundColor:"#e8d300"}} onClick={() => closeQuestion(question.id)}>
                                            Закрити
                                        </button>
                                        <button className={styles.btn} style={{backgroundColor:"#6c6a68"}} onClick={() => togglePanel(null)}>
                                            Назад
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </section>
                )}
            </div>
        </div>
    );
};

export default AdminHomePage;