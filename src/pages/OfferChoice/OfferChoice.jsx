import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./OfferChoice.css";

function OfferChoice({ selectedOffer, setSelectedOffer }) {
    const [activeTab, setActiveTab] = useState("details");

    const location = useLocation();
    const navigate = useNavigate();
    const { newOfferDetails } = location.state || {};

    const [locationDetails, setLocationDetails] = useState([]);
    const [sentBackDetails, setsentBackDetails] = useState([]);

    const [driverOffers, setDriverOffers] = useState([
        { id: 1, name: "เจ & โจ้ Slide On", driverName: "จิรพนธ์ เรืองฤทธิ์", carLicense: "กข 4567", price: 1000 },
        { id: 2, name: "ตุ๋ยรถยกรถสไลด์", driverName: "ชาญวิทย์ เจริญทิพย์", carLicense: "กข 4567", price: 1500 },
        { id: 3, name: "บอลสไลด์ออน", driverName: "ภูริพัฒน์ พงษ์พัฒนโยธิน", carLicense: "กข 4567", price: 1300 },
    ]);

    useEffect(() => {
        if (newOfferDetails) {
            setLocationDetails(newOfferDetails);
            setsentBackDetails(newOfferDetails);
        }
    }, [newOfferDetails]);

    // Function to handle selecting an offer
    const handleSelectOffer = async (offer) => {

        // Use an async function to wait for the state to be set
        await new Promise((resolve) => {
            setSelectedOffer(offer); // Update the state
            resolve(); // Signal that the action is done
        });

        // Navigate after the state has been set
        navigate("/list/process-payment", { state: { newOfferDetails } });
    };

    const [map, setMap] = useState(null);

    // Fetch location by address using Nominatim API
    const fetchLocationByAddress = async (address) => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.length > 0) {
            const { lat, lon } = data[0]; // Get the first match
            return { lat: parseFloat(lat), lng: parseFloat(lon) };
        }
        return null; // Return null if no result found
    };

    // Initialize the map and search for the location
    useEffect(() => {
        const initMap = async () => {
            if (!locationDetails.address1) {
                console.warn("No address provided for location fetch");
                return;
            }

            const location = await fetchLocationByAddress(locationDetails.address1);
            if (location) {
                if (map) {
                    map.remove(); // Remove the old map instance
                }

                const newMap = L.map("map", {
                    center: [location.lat, location.lng],
                    zoom: 14,
                    dragging: false, // Make map undraggable
                    scrollWheelZoom: false, // Disable scroll zoom
                    zoomControl: false, // Disable zoom buttons
                });

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                }).addTo(newMap);

                // Add marker at the location
                L.marker([location.lat, location.lng]).addTo(newMap);

                // Add a circle with a 200m radius around the marker (scanning area)
                L.circle([location.lat, location.lng], {
                    color: "transparent",  // No border
                    fillColor: "yellow",  // Circle fill color
                    fillOpacity: 0.2,     // Circle fill opacity
                    radius: 1000,          // 1000 meters radius
                }).addTo(newMap);

                setMap(newMap); // Save the map instance for future updates
            } else {
                console.error("Location not found for the given address");
            }
        };

        initMap();

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [locationDetails.address1]);

    return (
        <div className="offer-container">
            <div style={{ padding: "10px" }}>
                {/* Back Button */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "left",
                        justifyContent: "left",
                        gap: "10px",
                        marginBottom: "20px",
                        marginLeft: "1.5rem",
                    }}
                >
                    <Button variant="success" className="back-button d-flex" onClick={() => navigate("/home/request-order", { state: { sentBackDetails } })}>
                        <span className="bi bi-caret-left-fill d-flex"></span>
                    </Button>
                </div>

                {/* Map Section */}
                <div id="map" style={{ height: "350px", width: "100%" }}></div>

            </div>

            <div className="tab-container">
                {/* Tab Buttons */}
                <div className="tab-buttons">
                    <button
                        className={activeTab === "details" ? "active" : "unactive"}
                        onClick={() => setActiveTab("details")}
                    >
                        รายละเอียด
                    </button>
                    <button
                        className={activeTab === "offer" ? "active" : "unactive"}
                        onClick={() => setActiveTab("offer")}
                    >
                        Offer
                    </button>
                </div>

                {/* Content Section */}
                <div className="content-section">
                    {activeTab === "details" ? (
                        <div className="details-container">
                            <h3 style={{ display: 'flex', }}>
                                <span className="bi bi-geo-alt-fill" style={{ color: "red", marginRight: '8px' }}></span>
                                <span>{locationDetails.address1}</span>
                            </h3>
                            <h3 style={{ display: 'flex', }}>
                                <span className="bi bi-geo-alt-fill" style={{ color: "#01c063", marginRight: '8px' }}></span>
                                <span>{locationDetails.address2}</span>
                            </h3>
                            <h3>
                                <b>ประเภทรถ:</b> &nbsp;
                                {locationDetails.carType}
                            </h3>
                            <h3>
                                <b>ประเภทการเรียกรถ:</b> &nbsp;
                                {locationDetails.callType}
                            </h3>
                        </div>
                    ) : (
                        <div>
                            {driverOffers.map((offer) => (
                                <div className="offer-item" key={offer.id}>
                                    <div className="offer-title">
                                        <h3>{offer.name}</h3>
                                    </div>
                                    <div className="offer-detail">
                                        <h3 className="offer-price">{offer.price.toLocaleString()} บาท</h3>
                                        <button
                                            className="click-button"
                                            onClick={() => {
                                                handleSelectOffer(offer)
                                            }}
                                        >
                                            เลือก
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export default OfferChoice;
