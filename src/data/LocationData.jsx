import { useState } from 'react';

const useLocationData = (userID) => {
    const [locations, setLocations] = useState([
        // Example data for userID 1
        {
            userID: 1,
            id: 1,
            name: 'บ้าน',
            address: '79 1 ซอย พหลโยธิน 49 แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900',
            contactName: 'สมชาย',
            contactNumber: '0812345678',
            notes: 'บ้านของฉัน'
        },
        {
            userID: 1,
            id: 2,
            name: 'หอพัก',
            address: 'Singurai Apartment and Hotel, 126, ซอยสุขุมวิท 1/1, แขวงคลองเตยเหนือ, วัฒนา, กรุงเทพมหานคร, 10330, ประเทศไทย',
            contactName: 'สมศรี',
            contactNumber: '0898765432',
            notes: 'หอพักใกล้มหาวิทยาลัย'
        },
        {
            userID: 1,
            id: 3,
            name: 'มหาลัย',
            address: 'มหาวิทยาลัยศรีปทุม',
            contactName: 'ส้มโอ',
            contactNumber: '0865432198',
            notes: 'มหาวิทยาลัย'
        }

    ]);

    const userLocations = locations.filter(loc => loc.userID === userID);

    const updateLocation = (id, newLocationData) => {
        setLocations(locations.map(loc => loc.userID === userID && loc.id === id ? { ...loc, ...newLocationData } : loc));
    };

    const addLocation = (newLocation) => {
        if (userLocations.length < 5) { // Limit per user
            setLocations([...locations, { ...newLocation, userID, id: locations.length + 1 }]);
        } else {
            alert(`คุณเพิ่มตำแหน่งได้สูงสุดเพียง 5 ตำแหน่ง`);
        }
    };

    const deleteLocation = (id) => {
        const updatedLocations = locations.filter(loc => !(loc.userID === userID && loc.id === id));
        setLocations(updatedLocations);
    };

    return { locations: userLocations, updateLocation, addLocation, deleteLocation };
};

export default useLocationData;
