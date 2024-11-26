import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import StarRating from "./StarRating/StarRating";

import "./ProcessDone.css";

function ProcessDone({ currentShowOrder, updateOrders, setCurrentShowOrder }) {
  const navigate = useNavigate();

  const handleSubmitReview = async () => {
    try {
      // Update the order status from 'current' to 'history'
      await updateOrders(currentShowOrder.id, { status: "history" });

      // Clear currentShowOrder
      setCurrentShowOrder([]);

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      console.error("Error updating orders:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };


  return (
    <div className="process-done-container">
      <div style={{ padding: "5px" }}></div>
      {/* Back button */}
      <div className="back-button-container">
        <Link to="/">
          <Button variant="success" className="back-button d-flex" onClick={handleSubmitReview}>
            <span className="bi bi-caret-left-fill d-flex"></span>
          </Button>
        </Link>
      </div>

      <div className="main-container">
        <div className="location-container">
          <div>
            <h5>
              <span className="icon badge bg-success rounded-pill">ต้นทาง</span>
            </h5>
            <span className="text">
              {currentShowOrder.address1}
            </span>
            <h5>
              <span className="icon badge bg-danger rounded-pill">ปลายทาง</span>
            </h5>
            <span className="text">
              {currentShowOrder.address2}
            </span>
          </div>
        </div>

        <div className="driver-container">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" className="driver-icon" />
          <span style={{ fontWeight: "bold" }} className="driver">รายละเอียดผู้ให้บริการ</span>
          <br />
          <span className="driver">ชื่อ : {currentShowOrder.driverName} </span>
          <br />
          <span className="driver">บริษัท : {currentShowOrder.name}</span>
          <br />
          <span className="driver">เลขทะเบียนรถ : {currentShowOrder.carLicense}</span>
          <br />
          <span className="driver">ค่าบริการ : {currentShowOrder.amount.toLocaleString()}฿</span>
        </div>

        <div className="review-container">
          <h4 style={{ fontWeight: "bold" }}>ให้คะแนนและรีวิว</h4>

          <StarRating
            totalStars={5}
            onRatingChange={(rating) => console.log("ให้คะแนน:", rating)}
          />
          <textarea
            placeholder="เขียนรีวิวของคุณ..."
            style={{
              width: "100%",
              height: "100px",
              marginTop: "10px",
              padding: "10px",
            }}
          ></textarea>
        </div>

        <div className="processdone-button-container" style={{ marginTop: "5px" }}>
          <Button variant="success" className="rounded-pill" size="lg" onClick={handleSubmitReview}>
            ส่งรีวิว
          </Button>
          <Button variant="success" className="rounded-pill" size="lg">
            ติดต่อทางร้าน
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProcessDone;
