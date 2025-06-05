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
import Button from '../atoms/Button'
import { advertisementService } from '../../api/advertisementService';


library.add(faHouse, faUser, faBox, faExclamationTriangle, faQuestion);

const AdminHomePage = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [activeTab, setActiveTab] = useState('home');
    const [visiblePanel, setVisiblePanel] = useState(null);
    
    // States для різних даних
    const [users, setUsers] = useState([]);
    const [ads, setAds] = useState([]);
    const [advertisementComplaints, setAdvertisementComplaints] = useState([]);
    const [userComplaints, setUserComplaints] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('ASC');
    const [complaintsSortField, setComplaintsSortField] = useState(null);
    const [complaintsSortDirection, setComplaintsSortDirection] = useState('ASC');
    const [userComplaintsSortField, setUserComplaintsSortField] = useState(null);
    const [userComplaintsSortDirection, setUserComplaintsSortDirection] = useState('ASC');
    
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

    const weeklyuserComplaintsData = [4, 6, 3, 7, 5, 8, 2];
    const weeklyLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

    // ============= КОРИСТУВАЧІ =============
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getAllUsers();
            const usersData = response.data.map(user => ({
                id: user.id,
                username: `${user.firstName} ${user.lastName}`, 
                email: user.email,
                phone: user.phone,
                createdAt: user.createdAt,
                status: user.status || 'Активний', // додайте статус, якщо є
            }));
            setUsers(usersData);
        } catch (error) {
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const viewUser = (userId) => {
        setVisiblePanel(`userView-${userId}`);
    };

    const blockUser = async (userId) => {
        try {
            // await api.post(`/admin/users/${userId}/block`);
            fetchUsers();
        } catch (error) {}
    };

    const unblockUser = async (userId) => {
        try {
            // await api.post(`/admin/users/${userId}/unblock`);
            fetchUsers();
        } catch (error) {}
    };

    // ============= ОГОЛОШЕННЯ =============
    
    const fetchAds = async (field) => {
    setLoading(true);
    try {
        let direction = 'ASC';

        if (field === sortField) {
        // Якщо клікаємо по тому ж полю, міняємо напрямок
        direction = sortDirection === 'ASC' ? 'DESC' : 'ASC';
        }

        setSortField(field);
        setSortDirection(direction);

        const params = {
        sortField: field,
        sortDirection: direction,
        };

        const adsData = await advertisementService.getAdvertisements(params);
        console.log(adsData)
        setAds(adsData);

    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
    };

    const viewAd = (adId) => {
        setVisiblePanel(`adView-${adId}`);
    };

    const approveAd = async (adId) => {
        try {
            // await api.post(`/admin/ads/${adId}/approve`);
            fetchAds();
            setVisiblePanel(null);
        } catch (error) {}
    };

    const rejectAd = async (adId) => {
        try {
            // await api.post(`/admin/ads/${adId}/reject`);
            fetchAds();
            setVisiblePanel(null);
        } catch (error) {}
    };

    const blockAd = async (adId) => {
        try {
            // await api.post(`/admin/ads/${adId}/block`);
            fetchAds();
            setVisiblePanel(null);
        } catch (error) {}
    };

    // ============= СКАРГИ НА ОГОЛОШЕННЯ =============

    const fetchAdvertisementComplaints = async (field) => {
    setLoading(true);
    try {
        let direction = 'ASC';

        if (field === complaintsSortField) {
        direction = complaintsSortDirection === 'ASC' ? 'DESC' : 'ASC';
        }

        setComplaintsSortField(field);
        setComplaintsSortDirection(direction);

        const params = {
        sortField: field,
        sortDirection: direction,
        };

        const response = advertisementService.getAllUsercomplaint();

        setAdvertisementComplaints(response.data);
    } catch (error) {
        console.error(error);
        setAdvertisementComplaints([]);
    } finally {
        setLoading(false);
    }
    };

    const viewAdvertisementComplaint = (complaintId) => {
        setVisiblePanel(`advertisementComplaintView-${complaintId}`);
    };

    const resolveAdvertisementComplaint = async (complaintId) => {
        try {
            // await api.post(`/admin/advertisement-complaints/${complaintId}/resolve`);
            fetchAdvertisementComplaints();
            setVisiblePanel(null);
        } catch (error) {}
    };

    const archiveAdvertisementComplaint = async (complaintId) => {
        try {
            // await api.post(`/admin/advertisement-complaints/${complaintId}/archive`);
            fetchAdvertisementComplaints();
            setVisiblePanel(null);
        } catch (error) {}
    };

    // ============= СКАРГИ НА КОРИСТУВАЧІВ =============

    const fetchUserComplaints = async (field) => {
    setLoading(true);
    try {
        let direction = 'ASC';

        if (field === userComplaintsSortField) {
        direction = userComplaintsSortDirection === 'ASC' ? 'DESC' : 'ASC';
        }

        setUserComplaintsSortField(field);
        setUserComplaintsSortDirection(direction);

        const params = {
        sortField: field,
        sortDirection: direction,
        };

        const response = advertisementService.getAllUsercomplaint();

        setUserComplaints(response.data);
    } catch (error) {
        console.error(error);
        setUserComplaints([]);
    } finally {
        setLoading(false);
    }
    };


    const viewUserComplaint = (complaintId) => {
        setVisiblePanel(`userComplaintView-${complaintId}`);
    };

    const resolveUserComplaint = async (complaintId) => {
        try {
            // await api.post(`/admin/user-complaints/${complaintId}/resolve`);
            fetchUserComplaints();
            setVisiblePanel(null);
        } catch (error) {}
    };

    const archiveUserComplaint = async (complaintId) => {
        try {
            // await api.post(`/admin/user-complaints/${complaintId}/archive`);
            fetchUserComplaints();
            setVisiblePanel(null);
        } catch (error) {}
    };

    // ============= ПИТАННЯ =============
    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const response = await getFormData();
            if (response.data && Array.isArray(response.data)) {
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
            setQuestions([]);
        } finally {
            setLoading(false);
        }
    };

    const viewQuestion = (questionId) => {
        setVisiblePanel(`questionView-${questionId}`);
    };

    const answerQuestion = async (questionId, answer) => {
        try {
            // await api.post(`/admin/questions/${questionId}/answer`, { answer });
            fetchQuestions();
            setVisiblePanel(null);
        } catch (error) {}
    };

    const closeQuestion = async (questionId) => {
        try {
            // await api.post(`/admin/questions/${questionId}/close`);
            fetchQuestions();
            setVisiblePanel(null);
        } catch (error) {}
    };

    // ============= СТАТИСТИКА =============
    const fetchStats = async () => {
        try {
            setStats(defaultStats);
        } catch (error) {
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
            case 'advertisementComplaints':
                fetchAdvertisementComplaints();
                break;
            case 'userComplaints':
                fetchUserComplaints();
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
                            data: weeklyuserComplaintsData,
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
            'Нове': `${styles.badge} ${styles.pending}`,
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
                {renderTabButton('Скарги на оголошення', 'advertisementComplaints', <FontAwesomeIcon icon="fa-solid fa-exclamation-triangle" />)}
                {renderTabButton('Скарги на користувачів', 'userComplaints', <FontAwesomeIcon icon="fa-solid fa-exclamation-triangle" />)}
                {renderTabButton('Питання', 'questions', <FontAwesomeIcon icon="fa-solid fa-question" />)}
                <Button
                    children={"Ukr"}
                    id={styles.ukrButton}
                />
                <Button
                    children={"Eng"}
                    id={styles.engButton}
                />
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
                        {/* Панель перегляду користувача */}
                        {users.map((user) =>
                            visiblePanel === `userView-${user.id}` && (
                                <div className={styles.panel_view} key={`panel-user-${user.id}`}>
                                    <h3>Користувач</h3>
                                    <p><strong>ID:</strong> {user.id}</p>
                                    <p><strong>Ім'я:</strong> {user.username}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Телефон:</strong> {user.phone}</p>
                                    <p><strong>Статус:</strong> {getStatusBadge(user.status)}</p>
                                    <p><strong>Дата реєстрації:</strong> {user.createdAt}</p>
                                    <div className={styles.actions}>
                                        {user.status === 'Активний' ? (
                                            <button className={styles.btn} style={{backgroundColor:"red"}} onClick={() => blockUser(user.id)}>
                                                Заблокувати
                                            </button>
                                        ) : (
                                            <button className={styles.btn} style={{backgroundColor:"green"}} onClick={() => unblockUser(user.id)}>
                                                Розблокувати
                                            </button>
                                        )}
                                        <button className={styles.btn} style={{backgroundColor:"#6c6a68"}} onClick={() => togglePanel(null)}>
                                            Назад
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </section>
                )}

                {/* Оголошення */}
                {activeTab === 'ads' && (
                    <section className={styles.section}>
                        <header className={styles.header}>
                            <h1>Оголошення</h1>
                            <button className={styles.refresh_btn} onClick={() => (fetchAds())}>
                                🔄 Оновити
                            </button>
                        </header>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th onClick={() => fetchAds('id')}>ID</th>
                                    <th onClick={() => fetchAds('productName')}>Назва</th>
                                    <th onClick={() => fetchAds('contactName')}>Користувач</th>
                                    <th onClick={() => fetchAds('status')}>Статус</th>
                                    <th onClick={() => fetchAds('createdAt')}>Дата</th>
                                    <th>Дії</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ads.map((ad) => (
                                    <tr key={ad.id}>
                                        <td>{ad.id}</td>
                                        <td>{ad.productName}</td>
                                        <td>{ad.contactName}</td>
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
                                <div className={styles.modal_overlay} key={`panel-adcomplaint-${ad.id}`}>
                                    <div className={styles.panel_view} key={`panel-${ad.id}`}>
                                        <h3>Оголошення</h3>
                                        <div className={styles.adImages}>
                                            {ad.images.map((ad_image) => 
                                                <img src={ad_image} className={styles.viewImage} />
                                            )}
                                        </div>
                                        <div className={styles.info}>
                                            <p><strong>ID:</strong> {ad.id}</p>
                                            <p><strong>Назва:</strong> {ad.productName}</p>
                                            <p><strong>Ціна:</strong> {ad.price+' '+ad.currency}</p>
                                            <p><strong>Категорія:</strong> {ad.category}</p>
                                            <p><strong>Користувач:</strong> {'id: '+ad.author.id+' '+ad.contactName}</p>
                                            <p><strong>Статус:</strong> {ad.status}</p>
                                            <p><strong>Опис:</strong> {ad.description}</p>
                                            <p><strong>Область:</strong> {ad.region}</p>
                                            <p><strong>Місто:</strong> {ad.city}</p>
                                        </div>
                                        <div className={styles.actions}>
                                        {/* PENDING_REVIEW: Схвалити/Відхилити */}
                                        {ad.status === 'pending_review' && (
                                            <>
                                                <button
                                                    className={styles.btn}
                                                    style={{ backgroundColor: "green" }}
                                                    // onClick={() => approveAd(ad.id)}
                                                >
                                                    Схвалити
                                                </button>
                                                <button
                                                    className={styles.btn}
                                                    style={{ backgroundColor: "#e8d300" }}
                                                    // onClick={() => rejectAd(ad.id)}
                                                >
                                                    Відхилити
                                                </button>
                                            </>
                                        )}

                                        {/* ACTIVE: Заблокувати, Архівувати, Позначити як продане */}
                                        {ad.status === 'active' && (
                                            <>
                                                <button
                                                    className={styles.btn}
                                                    style={{ backgroundColor: "red" }}
                                                    // onClick={() => blockAd(ad.id)}
                                                >
                                                    Заблокувати
                                                </button>
                                                <button
                                                    className={styles.btn}
                                                    style={{ backgroundColor: "#888" }}
                                                    // onClick={() => archiveAd(ad.id)}
                                                >
                                                    Архівувати
                                                </button>
                                                <button
                                                    className={styles.btn}
                                                    style={{ backgroundColor: "#007bff" }}
                                                    // onClick={() => markAsSold(ad.id)}
                                                >
                                                    Позначити як продане
                                                </button>
                                            </>
                                        )}

                                        {/* INACTIVE: Активувати, Архівувати */}
                                        {ad.status === 'inactive' && (
                                            <>
                                                <button
                                                    className={styles.btn}
                                                    style={{ backgroundColor: "green" }}
                                                    // onClick={() => activateAd(ad.id)}
                                                >
                                                    Активувати
                                                </button>
                                                <button
                                                    className={styles.btn}
                                                    style={{ backgroundColor: "#888" }}
                                                    // onClick={() => archiveAd(ad.id)}
                                                >
                                                    Архівувати
                                                </button>
                                            </>
                                        )}

                                        {/* SOLD: Архівувати */}
                                        {ad.status === 'sold' && (
                                            <button
                                                className={styles.btn}
                                                style={{ backgroundColor: "#888" }}
                                                // onClick={() => archiveAd(ad.id)}
                                            >
                                                Архівувати
                                            </button>
                                        )}

                                        {/* ARCHIVED: Активувати */}
                                        {ad.status === 'archived' && (
                                            <button
                                                className={styles.btn}
                                                style={{ backgroundColor: "green" }}
                                                // onClick={() => activateAd(ad.id)}
                                            >
                                                Активувати
                                            </button>
                                        )}

                                        <button
                                            className={styles.btn}
                                            style={{ backgroundColor: "#6c6a68" }}
                                            onClick={() => togglePanel(null)}
                                        >
                                            Назад
                                        </button>
                                    </div>
                                    </div>
                                </div>
                            )
                        )}
                    </section>
                )}

                {/* Скарги на оголошення */}
                {activeTab === 'advertisementComplaints' && (
                    <section className={styles.section}>
                        <header className={styles.header}>
                            <h1>Скарги на оголошення</h1>
                            <button className={styles.refresh_btn} onClick={fetchAdvertisementComplaints}>
                                🔄 Оновити
                            </button>
                        </header>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Від кого</th>
                                    <th>На оголошення</th>
                                    <th>Причина</th>
                                    <th>Статус</th>
                                    <th>Дії</th>
                                </tr>
                            </thead>
                            <tbody>
                                {advertisementComplaints.map((complaint) => (
                                    <tr key={complaint.id}>
                                        <td>{complaint.id}</td>
                                        <td>
                                            id:{complaint.fromUser.id}<br />
                                            {complaint.fromUser.username}
                                        </td>
                                        <td>
                                            id:{complaint.toAd.id}<br />
                                            {complaint.toAd.title}
                                        </td>
                                        <td>{complaint.reason}</td>
                                        <td>{getStatusBadge(complaint.status)}</td>
                                        <td>
                                            <button className={styles.btn} onClick={() => viewAdvertisementComplaint(complaint.id)}>
                                                Переглянути
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Панель перегляду скарги на оголошення */}
                        {advertisementComplaints.map((complaint) => 
                            visiblePanel === `advertisementComplaintView-${complaint.id}` && (
                                <div className={styles.modal_overlay} key={`panel-adcomplaint-${complaint.id}`}>
                                    <div className={styles.panel_view}>
                                        <h3>Скарга на оголошення</h3>
                                        <p><strong>ID:</strong> {complaint.id}</p>
                                        <p><strong>Від:</strong> {complaint.fromUser.username} (id:{complaint.fromUser.id})</p>
                                        <p><strong>На оголошення:</strong> {complaint.toAd.title} (id:{complaint.toAd.id})</p>
                                        <p><strong>Причина:</strong> {complaint.reason}</p>
                                        <p><strong>Опис:</strong> {complaint.description}</p>
                                        <div className={styles.actions}>
                                            <button className={styles.btn} onClick={() => resolveAdvertisementComplaint(complaint.id)}>
                                                Позначити як вирішене
                                            </button>
                                            <button className={styles.btn} style={{backgroundColor:"#e8d300"}} onClick={() => archiveAdvertisementComplaint(complaint.id)}>
                                                Архівувати
                                            </button>
                                            <button className={styles.btn} style={{backgroundColor:"#6c6a68"}} onClick={() => togglePanel(null)}>
                                                Назад
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </section>
                )}

                {/* Скарги на користувачів */}
                {activeTab === 'userComplaints' && (
                    <section className={styles.section}>
                        <header className={styles.header}>
                            <h1>Скарги на користувачів</h1>
                            <button className={styles.refresh_btn} onClick={fetchUserComplaints}>
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
                                {userComplaints.map((complaint) => (
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
                                            <button className={styles.btn} onClick={() => viewUserComplaint(complaint.id)}>
                                                Переглянути
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Панель перегляду скарги на користувача */}
                        {userComplaints.map((complaint) => 
                            visiblePanel === `userComplaintView-${complaint.id}` && (
                                <div className={styles.panel_view} key={`panel-usercomplaint-${complaint.id}`}>
                                    <h3>Скарга на користувача</h3>
                                    <p><strong>ID:</strong> {complaint.id}</p>
                                    <p><strong>Від:</strong> {complaint.fromUser.username} (id:{complaint.fromUser.id})</p>
                                    <p><strong>На:</strong> {complaint.toUser.username} (id:{complaint.toUser.id})</p>
                                    <p><strong>Причина:</strong> {complaint.reason}</p>
                                    <p><strong>Опис:</strong> {complaint.description}</p>
                                    <div className={styles.actions}>
                                        <button className={styles.btn} onClick={() => resolveUserComplaint(complaint.id)}>
                                            Позначити як вирішене
                                        </button>
                                        <button className={styles.btn} style={{backgroundColor:"#e8d300"}} onClick={() => archiveUserComplaint(complaint.id)}>
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