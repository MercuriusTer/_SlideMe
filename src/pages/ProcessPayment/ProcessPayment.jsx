import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

import Chat from "./Chat/Chat";

import "./ProcessPayment.css";

function ProcessPayment({ selectedOffer, addOrders, defaultPaymentMethod, setCurrentShowOrder }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { newOfferDetails } = location.state || {};

    const [paymentStatus, setPaymentStatus] = useState('รอชำระเงิน');
    const [isChatOpen, setIsChatOpen] = useState(false); // State to track if chat is open

    // if defaultPaymentMethod.type === 'PromptPay' then 'พร้อมเพย์' else then 'บัตรเครดิต'
    const paymentType = defaultPaymentMethod.type === 'PromptPay' ? 'พร้อมเพย์' : 'บัตรเครดิต';

    const handlePayment = () => {
        setPaymentStatus('ชำระเงินแล้ว');

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }) +
            ' - ' +
            currentDate.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false, // Use 24-hour time format
            });

        const newOrder = {
            name: selectedOffer.name,
            driverName: selectedOffer.driverName,
            carLicense: selectedOffer.carLicense,
            date: formattedDate, // Store formatted date
            amount: selectedOffer.price,
            status: 'current',
            address1: newOfferDetails.address1,
            address2: newOfferDetails.address2,
            payment: paymentType
        };
        addOrders(newOrder);

        setCurrentShowOrder(newOrder);
    };

    const handleCancel = () => {
        setPaymentStatus('รอชำระเงิน');
    };

    // Set up the useEffect to navigate after payment is made
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isChatOpen && paymentStatus === 'ชำระเงินแล้ว') {
                navigate('/list/process-working');
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [isChatOpen, paymentStatus, navigate]);

    // If chat is open, render Chat component; otherwise render the payment process UI
    if (isChatOpen) {
        return <Chat setIsChatOpen={setIsChatOpen} paymentStatus={paymentStatus} />;
    }

    return (
        <div className="propayment-container">
            <div style={{ padding: "20px" }}></div>
            <div className="back-button-container">
                <Link to="/">
                    <Button variant="success" className="back-button d-flex">
                        <span className="bi bi-caret-left-fill d-flex"></span>
                    </Button>
                </Link>
            </div>
            <div className="location-container">
                <div>
                    <h5>
                        <span className="icon badge bg-success rounded-pill">ต้นทาง</span>
                    </h5>
                    <span className="text">
                        {newOfferDetails.address1}
                    </span>
                    <h5>
                        <span className="icon badge bg-danger rounded-pill">ปลายทาง</span>
                    </h5>
                    <span className="text">
                        {newOfferDetails.address2}
                    </span>
                </div>
            </div>

            <div className="driver-container">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" className="driver-icon"/>
                <span style={{ fontWeight: "bold" }} className="driver">รายละเอียดผู้ให้บริการ</span><br />
                <span className="driver">ชื่อ : {selectedOffer.driverName} </span><br />
                <span className="driver">บริษัท : {selectedOffer.name}</span><br />
                <span className="driver">เลขทะเบียนรถ : {selectedOffer.carLicense}</span>
            </div>
            <div className="button-container">
                <button className="save-button">
                    ติดต่อทางร้าน
                </button>
                <button
                    className="save-button"
                    onClick={() => setIsChatOpen(true)} // Set chat open when clicked
                >
                    แชทติดต่อ
                </button>
            </div>

            <div className="price-container">
                <span>ค่าบริการ</span>
                <span className="price-thai" style={{ fontWeight: "bold" }}>{selectedOffer.price.toLocaleString()}฿</span>
                <span>การชำระเงิน</span>
                <span className="payment" style={{ fontWeight: "bold" }}>{paymentType}</span>
                <span>สถานะ : <span className="status" >{paymentStatus}</span></span>
            </div>

            <div className="button-container">
                <Button onClick={handlePayment} disabled={paymentStatus === 'ชำระเงินแล้ว'} variant="success" className="rounded-pill" size="lg" >
                    ชำระเงิน
                </Button>
                <Button onClick={handleCancel} variant="danger" className="rounded-pill" size="lg">
                    ยกเลิก
                </Button>
            </div>
        </div>
    );
}

export default ProcessPayment;
