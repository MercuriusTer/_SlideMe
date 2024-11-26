import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./Payment.css";

function Payment({ paymentMethods, setPaymentMethods }) {
  const navigate = useNavigate();

  const [newCard, setNewCard] = useState({ type: "Visa", details: "", ccv: "", expiryDate: "" });
  const [cardError, setCardError] = useState("");

  const handleAddCard = () => {
    if (!validateCardNumber(newCard.details)) {
      setCardError("กรุณากรอกหมายเลขบัตรให้ถูกต้อง");
      return;
    }

    if (newCard.ccv.trim() === "") {
      setCardError("กรุณากรอกรหัส CCV ให้ครบถ้วน");
      return;
    }

    if (newCard.expiryDate.trim() === "") {
      setCardError("กรุณากรอกวันหมดอายุของบัตร");
      return;
    }

    if (newCard.details.trim() === "" || newCard.ccv.trim() === "" || newCard.expiryDate.trim() === "") {
      alert("Please fill all fields.");
      return;
    }

    const newPayment = {
      id: paymentMethods.length + 1,
      type: newCard.type,
      details: newCard.details,
      isDefault: false,
    };

    setPaymentMethods([...paymentMethods, newPayment]);
    setNewCard({ type: "Visa", details: "", ccv: "", expiryDate: "" });
    setCardError("");
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  // Luhn Algorithm to validate the card number
  const validateCardNumber = (number) => {
    // Remove any non-numeric characters (e.g., spaces, dashes)
    const sanitizedNumber = number.replace(/\D/g, "");

    // Check if the length of the number is exactly 16 digits
    return sanitizedNumber.length === 16;
  };

  // Handle the expiration date formatting automatically
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

    // Automatically format as MM/YY
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }

    // Set the formatted value to the state
    setNewCard({ ...newCard, expiryDate: value });
  };

  return (
    <div className="Payment-container">
      <div style={{ paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}>
        <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px', marginLeft: '1.5rem' }}>
          <Button variant="success" className='back-button d-flex' onClick={() => navigate("/profile/")}>
            <span className='bi bi-caret-left-fill d-flex'></span>
          </Button>
        </div>
      </div>

      <div className="payment-methods">
        <h2 style={{ marginTop: "20px" }}>Payment</h2>

        {paymentMethods.map((method) => (
          <div key={method.id} className="payment-label" onClick={() => handleSetDefault(method.id)}>
            <div>
              <strong>{method.type}</strong><br></br>
              {method.details ? `**** **** **** ${method.details.slice(-4)}` : ""}
            </div>
            {method.isDefault &&
              <span
                style={{
                  backgroundColor: "#01C063",
                  textAlign: "center",
                  padding: "0.2rem",
                  color: "white",
                  border: "none",
                  borderRadius: "40px",
                  width: "65px",
                  height: "25px",
                }}
                onClick={() => handleSetDefault(method.id)}
              >
                Default
              </span>}
          </div>
        ))}



        <h2 style={{ marginTop: "20px" }}>Add Card</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <select
            value={newCard.type}
            onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
            className="payment-input-bar"

          >
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="Amex">Amex</option>
          </select>
          <input
            type="text"
            placeholder="Card Number"
            value={newCard.details}
            onChange={(e) => setNewCard({ ...newCard, details: e.target.value })}
            className="payment-input-bar"
            maxLength={16} // Visa/MasterCard limit
          />
          <input
            type="text"
            placeholder="CCV"
            value={newCard.ccv}
            onChange={(e) => setNewCard({ ...newCard, ccv: e.target.value })}
            className="payment-input-bar"
            maxLength={3} // CCV limit
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={newCard.expiryDate}
            onChange={handleExpiryDateChange} // Custom change handler
            className="payment-input-bar"
            maxLength={5} // Expiry Date limit (MM/YY format)
          />
          {cardError && <div style={{ color: "red" }}>{cardError}</div>}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={handleAddCard}
              className="payment-start-button"
            >
              เพิ่มบัตร
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Payment;
