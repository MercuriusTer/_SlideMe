import React, { useState } from "react";
import { Button } from "react-bootstrap";

import "./Chat.css";

function Chat({ setIsChatOpen, paymentStatus }) {
  return (
    <div className="chat-container">
      <div className="top-bar">
        <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px', marginBottom: '10px', marginLeft: '1.5rem' }}>
          <Button variant="success" className='back-button d-flex' onClick={() => setIsChatOpen(false)}>
            <span className='bi bi-caret-left-fill d-flex'></span>
          </Button>
          <h2 className='d-flex' style={{ textAlign: 'center', fontWeight: 'bold', marginLeft: '1.5rem' }}>แชท</h2>
        </div>
      </div>

      <div className="chat-main-container">
        <div className="outgoing-message">
          <div className="bubble outgoing">สวัสดีครับ ราคาตามที่แจ้งเลยใช่มั้ยครับ</div>
        </div>

        <div className="incoming-message">
          <div className="avatar">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="User Avatar"
              className="avatar-image"
            />
          </div>
          <div className="bubble incoming">ใช่ครับ</div>
        </div>

        <div className="outgoing-message">
          <div className="bubble outgoing">โอเคครับ กำลังชำระเงิน</div>
        </div>

        {paymentStatus === 'ชำระเงินแล้ว' && (
          <div className="outgoing-message">
            <div className="bubble outgoing">ชำระแล้วครับ ตำแหน่งของรถตามหมุดเลยครับ</div>
          </div>
        )}

        {paymentStatus === 'ชำระเงินแล้ว' && (
          <div className="incoming-message">
            <div className="avatar">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="User Avatar"
                className="avatar-image"
              />
            </div>
            <div className="bubble incoming">โอเครครับ ผมกำลังไป</div>
          </div>
        )}

      </div>

      <div className="chat-input-container">
        <input type="text" className="chat-input-text" placeholder="Aa" />
        <button className="chat-send-button"><span className="bi bi-send"></span></button>
      </div>
    </div >
  );
}

export default Chat;
