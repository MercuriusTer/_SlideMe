const users = [
    {
        userID: 1, // Unique ID for this user
        user: 'Teejay', pass: 'pass', role: 'user', token: 'user',
        informProfile: {
            name: "ทีเจย์ เพชรงาม",
            email: "teejay.phet@gmail.com",
            birthdate: "1986-11-23",
            countryCode: "+66",
            phoneNumber: "0000000000",
        },
        paymentMethods: [
            { id: 1, type: "PromptPay", details: "", isDefault: true },
            { id: 2, type: "Visa", details: "6625402952345622", isDefault: false },
            { id: 3, type: "MasterCard", details: "2412751234123456", isDefault: false },
        ]
    },
    {
        userID: 2, // Unique ID for this user
        user: 'Apirak', pass: 'pass', role: 'user', token: 'user',
        informProfile: {
            name: "อภิรักษ์ เจตสมมาตร",
            email: "apirak.jet@gmail.com",
            birthdate: "1978-11-23",
            countryCode: "+66",
            phoneNumber: "0812345678",
        },
        paymentMethods: [
            { id: 1, type: "PromptPay", details: "", isDefault: true },
            { id: 2, type: "Visa", details: "63245629523455555", isDefault: false },
        ]
    },
    // Add more users as needed
];

export default users;
