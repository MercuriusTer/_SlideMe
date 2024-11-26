import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Profile.css";

function Profile({ username }) {
    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <div style={{ padding: "20px", textAlign: "center" }}>
                <label htmlFor="" className="profile-label"></label>
            </div>
            <div className="profile-input-container">
                <span className="title">{username}</span>
                <button className="profile-button" onClick={() => navigate("/profile/edit-profile")}>ตั้งค่าผู้ใช้</button>
                <button className="profile-button" onClick={() => navigate("/profile/payment")}>ตั้งค่าวิธีชำระเงิน</button>
                <button className="profile-button" onClick={() => navigate("/profile/save-location")}>จัดการสถานที่</button>
                <button className="profile-button" onClick={() => navigate("/profile/setting")}>ตั้งค่าแอพพิเคขั่น</button>
            </div>
        </div>
    );
}

export default Profile;