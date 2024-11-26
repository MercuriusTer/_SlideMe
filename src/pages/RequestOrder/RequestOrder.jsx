import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RequestOrder.css";

function RequestOrder({ selectPosition1, selectPosition2 }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { sentBackDetails } = location.state || {};

    // State to store all details in a single object
    const [newOfferDetails, setNewOfferDetails] = useState({
        address1: selectPosition1.address,
        address2: selectPosition2.address,
        carType: "",
        otherCarType: "",
        callType: "",
        bookingDate: new Date(),
        bookingTime: new Date(),
    });

    useEffect(() => {
        if (sentBackDetails) {
            setNewOfferDetails(sentBackDetails);
        }
    }, [sentBackDetails]);

    // Booking Time Function
    const [showModal, setShowModal] = useState(false);
    const [immediateSelected, setImmediateSelected] = useState(false);
    const [scheduleSelected, setScheduleSelected] = useState(false);

    const handleImmediateClick = () => {
        setImmediateSelected(true);
        setScheduleSelected(false);
        setNewOfferDetails((prevState) => ({
            ...prevState,
            callType: "เรียกทันที"
        }));
    };

    const handleScheduleClick = () => {
        setScheduleSelected(true);
        setImmediateSelected(false);
        setShowModal(true);
        setNewOfferDetails((prevState) => ({
            ...prevState,
            callType: "เรียกล่วงหน้า"
        }));
    };

    const handleCloseModal = () => setShowModal(false);

    const handleOptionClick = (option) => {
        setNewOfferDetails((prevState) => ({
            ...prevState,
            bookingDate: option.date, // Assuming you're passing a date from modal
            bookingTime: option.time // Assuming you're passing time from modal
        }));
        setShowModal(true); // Open Modal when option is clicked
    };

    // Car Selection Function
    const handleCarTypeChange = (event) => {
        const value = event.target.value;
        setNewOfferDetails((prevState) => ({
            ...prevState,
            carType: value,
            otherCarType: value === "other" ? prevState.otherCarType : ""
        }));
    };

    const handleOtherCarTypeChange = (event) => {
        setNewOfferDetails((prevState) => ({
            ...prevState,
            otherCarType: event.target.value
        }));
    };

    // Handle booking date change
    const handleDateChange = (date) => {
        setNewOfferDetails((prevState) => ({
            ...prevState,
            bookingDate: date
        }));
    };

    // Handle booking time change
    const handleTimeChange = (time) => {
        setNewOfferDetails((prevState) => ({
            ...prevState,
            bookingTime: time
        }));
    };

    // Check if the button should be disabled
    const isButtonDisabled = !newOfferDetails.carType || !newOfferDetails.callType;

    return (
        <div className="request-order-container">
            <div className="content-scrolling" style={{ padding: "15px" }}>
                <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px', marginBottom: '20px', marginLeft: '1.5rem' }}>
                    <Link to="/">
                        <Button variant="success" className='back-button d-flex'>
                            <span className='bi bi-caret-left-fill d-flex'></span>
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
                <div className="req-input-container">
                    <select className="req-input-bar" value={newOfferDetails.carType} onChange={handleCarTypeChange}>
                        <option value="">ประเภทรถ</option>
                        <option value="Muscle Car">Muscle Car</option>
                        <option value="Sport Car">Sport Car</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="SUV">SUV</option>
                        <option value="Convertible">Convertible</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Electric">Electric</option>
                        <option value="Pickup">Pickup</option>
                        <option value="other">อื่น ๆ</option>
                    </select>
                    {newOfferDetails.carType === 'other' && (
                        <input
                            className="req-input-bar"
                            type="text"
                            placeholder="ระบุประเภทอื่น ๆ"
                            value={newOfferDetails.otherCarType}
                            onChange={handleOtherCarTypeChange}
                        />
                    )}
                </div>

                <div className="req-input-container">
                    <Accordion className="accordion-container" defaultActiveKey="0">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header className="accordion-header">ประเภทการเรียก</Accordion.Header>
                            <Accordion.Body>
                                <div className="options-container">
                                    <div
                                        className={`option ${immediateSelected ? 'selected' : ''}`}
                                        onClick={handleImmediateClick}
                                    >
                                        เรียกรถทันที<br />
                                        <i className="bi bi-truck-front-fill truck-icon"></i>
                                    </div>
                                    <div
                                        className={`option ${scheduleSelected ? 'selected' : ''}`}
                                        onClick={handleScheduleClick}
                                    >
                                        เรียกรถล่วงหน้า<br />
                                        <i className="bi bi-truck-front-fill truck-icon"></i>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>

                {/* Modal */}
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>เลือกเวลา</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-options-container">
                            <div className="date-time-picker-container">
                                <div className="modal-option">
                                    <DatePicker
                                        selected={newOfferDetails.bookingDate}
                                        onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        className="date-picker"
                                    />
                                </div>
                                <div className="modal-option">
                                    <DatePicker
                                        selected={newOfferDetails.bookingTime}
                                        onChange={handleTimeChange}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        className="time-picker"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-save-button-container">
                            <button onClick={handleCloseModal} className="modal-save-button">
                                บันทึก
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>

                <div className="req-input-container">
                    <input
                        className="req-input-bar"
                        type="text"
                        placeholder="รายละเอียดเพิ่มเติม"
                        value={newOfferDetails.additionalDetails || ''}
                        onChange={(e) => setNewOfferDetails({ ...newOfferDetails, additionalDetails: e.target.value })}
                    />
                </div>

                <div className="search-button-container">
                    <Button
                        className={`btn rounded-pill ${isButtonDisabled ? 'btn-secondary' : 'btn-success'}`}
                        size="lg"
                        onClick={() => {
                            console.log(newOfferDetails);
                            navigate("/home/offer-choice", { state: { newOfferDetails } });
                        }}
                        disabled={isButtonDisabled}
                    >
                        <span className="bi bi-search"></span>&nbsp;ค้นหาผู้ให้บริการ
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default RequestOrder;
