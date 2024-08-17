import React, { useState } from 'react';

const Buy = () => {
    const [showForm, setShowForm] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        sellerId: '',
        buyerName: '',
        price: '',
        area: ''
    });

    const handleUPIClick = () => {
        setShowForm('UPI');
        setFormSubmitted(false);
        resetFormData();
    };

    const handleEthereumClick = () => {
        setShowForm('Ethereum');
        setFormSubmitted(false);
        resetFormData();
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
    };

    const resetFormData = () => {
        setFormData({
            sellerId: '',
            buyerName: '',
            price: '',
            area: ''
        });
    };

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <h1 style={titleStyle}>Buy Page</h1>
                <div style={buttonContainerStyle}>
                    <h2 style={subtitleStyle}>Select a Payment Method:</h2>
                    <button onClick={handleUPIClick} style={buttonStyle}>
                        UPI Transaction
                    </button>
                    <button onClick={handleEthereumClick} style={buttonStyle}>
                        Ethereum Transaction
                    </button>
                </div>

                {showForm && !formSubmitted && (
                    <form onSubmit={handleFormSubmit} style={formStyle}>
                        <h3 style={formTitleStyle}>{showForm} Payment Details</h3>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Seller ID:</label>
                            <input
                                type="text"
                                name="sellerId"
                                value={formData.sellerId}
                                onChange={handleFormChange}
                                style={inputStyle}
                                required
                            />
                        </div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Buyer Name:</label>
                            <input
                                type="text"
                                name="buyerName"
                                value={formData.buyerName}
                                onChange={handleFormChange}
                                style={inputStyle}
                                required
                            />
                        </div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleFormChange}
                                style={inputStyle}
                                required
                            />
                        </div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Area:</label>
                            <input
                                type="text"
                                name="area"
                                value={formData.area}
                                onChange={handleFormChange}
                                style={inputStyle}
                                required
                            />
                        </div>
                        <button type="submit" style={submitButtonStyle}>
                            Submit
                        </button>
                    </form>
                )}

                {formSubmitted && (
                    <div style={successMessageStyle}>
                        <h3>Thank you! {showForm} Payment Successful!</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

const pageStyle = {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
};

const containerStyle = {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    width: '100%',
    maxWidth: '400px',
};

const titleStyle = {
    color: '#333',
    marginBottom: '20px',
};

const buttonContainerStyle = {
    marginBottom: '30px',
};

const subtitleStyle = {
    color: '#555',
    marginBottom: '20px',
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    margin: '10px',
    width: '100%',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const formTitleStyle = {
    color: '#333',
    marginBottom: '20px',
};

const inputGroupStyle = {
    marginBottom: '15px',
    width: '100%',
};

const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    textAlign: 'left',
    color: '#555',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const submitButtonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    width: '100%',
};

const successMessageStyle = {
    marginTop: '20px',
    color: '#4CAF50',
};

export default Buy;
