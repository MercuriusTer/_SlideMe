import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import './List.css'


function List({ ordersList, deleteOrders, setCurrentShowOrder }) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('current');
    // const [orderList, setOrderList] = useState([])

    const handleButtonClick = (tab) => {
        setActiveTab(tab);
    };

    const handleChooseOrder = (order) => {
        setCurrentShowOrder(order)

        navigate('/list/process-working');
    }

    // Filter orders based on the selected tab
    const filteredOrders = ordersList.filter(order => order.status === activeTab);

    return (
        <div className='list-container'>
            <div className="order-list">
                <div className="order-buttons">
                    <button
                        className={`order-button ${activeTab === 'scheduled' ? 'button-active' : ''}`}
                        onClick={() => handleButtonClick('scheduled')}
                    >
                        กำลังรอ
                    </button>
                    <button
                        className={`order-button ${activeTab === 'current' ? 'button-active' : ''}`}
                        onClick={() => handleButtonClick('current')}
                    >
                        ดำเนินการ
                    </button>
                    <button
                        className={`order-button ${activeTab === 'history' ? 'button-active' : ''}`}
                        onClick={() => handleButtonClick('history')}
                    >
                        ประวัติ
                    </button>
                </div>

                <div className="order-container">
                    {filteredOrders.map((order, index) => (
                        <div className="order-item" key={order.id}>
                            <div className="order-icon"></div>
                            <div className="order-details">
                                <p style={{ fontWeight: 'bold' }}>{order.driverName}</p>
                                <p>{order.date}</p>
                                {order.status === 'current' &&
                                    <p style={{ color: '#FFBF00', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleChooseOrder(order)}>กำลังดำเนินการ</p>}
                            </div>
                            {order.status !== 'current' &&
                                <div className='order-details2'>
                                    {order.status === 'history' &&
                                        <div className="order-amount">฿ {(order.amount).toLocaleString()}</div>}
                                    {order.status === 'scheduled' &&
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteOrders(order.id)} // Updated to use the hook method
                                        >
                                            Cancel
                                        </button>}
                                </div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default List;